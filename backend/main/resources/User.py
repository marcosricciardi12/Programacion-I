from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UserModel
from main.models import PoemModel
from main.models import ReviewModel
from sqlalchemy import func

#Recurso usuario
class User(Resource):
    
    #obtener recurso
    def get(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        return user.to_json()

    #eliminar recurso
    def delete(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return 'User deleted', 204
    
    
    def put(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        data = request.get_json().items()
        for key,value in data:
            setattr(user,key,value)
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201

class Users(Resource):
    def get(self):
        page = 1
        per_page = 5

        users = db.session.query(UserModel)
        if request.get_json():
            filters = request.get_json().items()
            #Traigo todos los items del body del insomnia
            for key, value in filters:
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
                if key == "user":
                    users = users.filter(UserModel.user.like("%" +  value + "%"))
                if key == "poem_count":
                    users = users.outerjoin(UserModel.poems).group_by(UserModel.id).having(func.count(PoemModel.id) >= value)
                if key == "review_count":
                    users = users.outerjoin(UserModel.reviews).group_by(UserModel.id).having(func.count(ReviewModel.id) >= int(value))
                if key == "order_by":
                    if value == 'user[desc]':
                        users = users.order_by(UserModel.user.desc())
                    if value == 'user':
                        users = users.order_by(UserModel.user)
                    if value == 'cant_poem[desc]':
                        users = users.outerjoin(UserModel.reviews).group_by(UserModel.id).order_by(func.count(ReviewModel.id).desc())
                    if value == 'cant_poem':
                        users = users.outerjoin(UserModel.reviews).group_by(UserModel.id).order_by(func.count(ReviewModel.id))

                        # professors=professors.outerjoin(ProfessorModel.projects).group_by(ProfessorModel.id).order_by(func.count(ProjectModel.id).desc())
        #Ahora pagino, guarde la consulta parcial en users
        users = users.paginate(page, per_page, True, 20) #Ahora no es una lista de lementos, es una paginacion
        return jsonify({"users":[user.to_json_short() for user in users.items],
                        'total': users.total, 
                        'pages': users.pages, 
                        'page': page})
        
    def post(self):
        user = UserModel.from_json(request.get_json())
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201