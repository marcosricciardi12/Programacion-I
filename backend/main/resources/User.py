from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UserModel
from main.models import PoemModel
from main.models import ReviewModel
from sqlalchemy import func
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import admin_required

#Recurso usuario
class User(Resource):
    
    #obtener recurso
    @jwt_required(optional=True)
    def get(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        token_id = get_jwt_identity()
        claims = get_jwt()
        if not claims:
            claims = {'admin': False}
        if token_id == user.id or claims['admin']:
            return user.to_json()
        else:
            return user.to_json_short()

    #eliminar recurso
    @admin_required
    def delete(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        if not user.admin:
            db.session.delete(user)
            db.session.commit()
            return 'User deleted', 204
        else:
            return 'Admin User can not be deleted', 403
    
    #modificar recurso
    @jwt_required()
    def put(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        data = request.get_json().items()
        token_id = get_jwt_identity()
        claims = get_jwt()
        if not claims:
            claims = {'admin': False}
        if token_id == user.id or claims['admin']:
            for key,value in data:
                if str(key) == 'admin':
                    if claims['admin']:
                        setattr(user,key,value)
                    else:
                        print("Only admin can modify admin permisions")
                else:
                    setattr(user,key,value)
            db.session.add(user)
            db.session.commit()
            return user.to_json(), 201
        else:
            return 'Not allowed, only owner or admin can modify', 403

class Users(Resource):

    @admin_required
    def get(self):
        page = 1
        per_page = 20
        users = db.session.query(UserModel)
        keys = [
            'page',
            'per_page',
            'user',
            'poem_count',
            'review_count',
            'review_count',
            'order_by'
        ]
        filters = {}
        for key in keys:
            arg = request.args.get(key)
            if arg != None:
                filters.update({key: arg})

        if filters:
            #Traigo todos los items del body del insomnia
            for key, value in filters.items():
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
                if key == "user":
                    users = users.filter(UserModel.user.like("%" +  value + "%"))
                if key == "poem_count":
                    users = users.outerjoin(UserModel.poems).group_by(UserModel.id).having(func.count(PoemModel.id) >= int(value))
                if key == "review_count":
                    users = users.outerjoin(UserModel.reviews).group_by(UserModel.id).having(func.count(ReviewModel.id) >= int(value))
                if key == "order_by":
                    if value == 'user[desc]':
                        users = users.order_by(UserModel.user.desc())
                    if value == 'user':
                        users = users.order_by(UserModel.user)
                    if value == 'cant_poem[desc]':
                        users = users.outerjoin(UserModel.poems).group_by(UserModel.id).order_by(func.count(UserModel.poems).desc())
                    if value == 'cant_poem':
                        users = users.outerjoin(UserModel.poems).group_by(UserModel.id).order_by(func.count(UserModel.poems))

        #Ahora pagino, guarde la consulta parcial en users
        users = users.paginate(page, per_page, True, 20) #Ahora no es una lista de lementos, es una paginacion
        return jsonify({"users":[user.to_json_short_mail() for user in users.items],
                        'total': users.total, 
                        'pages': users.pages, 
                        'page': page})

    @admin_required    
    def post(self):
        user = UserModel.from_json(request.get_json())
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201