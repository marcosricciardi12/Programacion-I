from flask_restful import Resource
from flask import request, jsonify

from .. import db
from main.models import UserModel
from main.models import PoemModel
from main.models import ReviewModel
from sqlalchemy import func
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

class Poem(Resource):
    def get(self, id):
        poem = db.session.query(PoemModel).get_or_404(id)
        return poem.to_json()

    @jwt_required()#Tengo que verificar si el usuario es el dueño del poema
    def delete(self, id):
        user_id = get_jwt_identity()#extrae el id del usuario que esta en el token
        poem = db.session.query(PoemModel).get_or_404(id)
        claims = get_jwt()
        if not claims:
            print("No hay claims")
            claims = {'admin': False}
        if poem.user_id == user_id or claims['admin']: 
            db.session.delete(poem)
            db.session.commit()
            return 'Poem deleted correctly.', 204
        else:
            return 'Not allowed.', 403
        
    @jwt_required()
    def put(self, id):
        user_id = get_jwt_identity()
        poem = db.session.query(PoemModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(poem, key, value)
        if poem.user_id == user_id:
            db.session.add(poem)
            db.session.commit()
            return poem.to_json() , 201
        else:
            return 'Only owner can modify the poem', 403

class Poems(Resource):

    @jwt_required(optional=True)
    def get(self):
        page = 1
        per_page = 5
        user_id = get_jwt_identity()
        claims = get_jwt()
        poems = db.session.query(PoemModel)
        keys = [
            'page',
            'per_page',
            'title',
            'user_writer',
            'date[gte]',
            'date[lte]',
            'mark[gte]',
            'mark[lte]',
            'order_by',
            'own_poems'
        ]
        filters = {}
        for key in keys:
            arg = request.args.get(key)
            if arg != None:
                filters.update({key: arg})

        if filters:
            for key, value in filters.items():
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
                if not user_id:
                    if key == "title":
                        poems = poems.filter(PoemModel.title.like("%" +  value + "%")) #funciona
                    if key == "user_writer":
                        poems = poems.filter(PoemModel.user).filter(UserModel.user.like("%" +  value + "%")) #funciona
                    if key == "date[gte]":
                        poems = poems.filter(PoemModel.post_date >= datetime.strptime(value, '%d/%m/%Y'))
                    if key == "date[lte]":
                        poems = poems.filter(PoemModel.post_date <= datetime.strptime(value, '%d/%m/%Y'))
                    if key == "mark[gte]":
                        poems = poems.outerjoin(PoemModel.reviews).group_by(PoemModel.id).having(func.avg(ReviewModel.mark)>= value)
                    if key == "mark[lte]":
                        poems = poems.outerjoin(PoemModel.reviews).group_by(PoemModel.id).having(func.avg(ReviewModel.mark)<= value)
                    if key == "order_by":
                        if value == 'avg_mark':
                            poems = poems.outerjoin(PoemModel.reviews).group_by(PoemModel.id).order_by(func.avg(ReviewModel.mark))
                        if value == 'avg_mark[desc]':
                            poems = poems.outerjoin(PoemModel.reviews).group_by(PoemModel.id).order_by(func.avg(ReviewModel.mark).desc())
                        if value == 'date[desc]':
                            poems = poems.order_by(PoemModel.post_date.desc())
                        if value == 'date':
                            poems = poems.order_by(PoemModel.post_date)
                        if value == "title":
                            poems = poems.order_by(PoemModel.title)
                        if value == "title[desc]":
                            poems = poems.order_by(PoemModel.title.desc())
                else:
                    if key == "own_poems":
                        poems = poems.filter(PoemModel.user).filter(UserModel.id.like(str(user_id))) #funciona
                    else:
                        poems = poems.outerjoin(PoemModel.reviews).group_by(PoemModel.id).order_by(func.count(ReviewModel.mark),PoemModel.post_date)

        
        poems = poems.paginate(page, per_page, True, 20)
        return jsonify({"poems":[poem.to_json_short() for poem in poems.items],
                        'total': poems.total, 
                        'pages': poems.pages, 
                        'page': page})

    @jwt_required()
    def post(self):
        poem = PoemModel.from_json(request.get_json())
        user_id = get_jwt_identity()
        poem.user_id = user_id #El dueño del token va a ser el creador del poema
        user = db.session.query(UserModel).get_or_404(user_id)
        poem_count = len(user.poems)
        reviews_count = len(user.reviews)
        div = 0
        if poem_count != 0:
            div = reviews_count/poem_count
            rest = 3-reviews_count%3
        if poem_count == 0 or div >=3 :
            db.session.add(poem)
            db.session.commit()
            return poem.to_json_short(), 201
        else:
            return 'Not allowed, you need %d reviews more' % (rest), 405
