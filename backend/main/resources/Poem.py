from flask_restful import Resource
from flask import request, jsonify

from .. import db
from main.models import UserModel
from main.models import PoemModel
from main.models import ReviewModel
from sqlalchemy import func
from datetime import datetime


class Poem(Resource):
    def get(self, id):
        poem = db.session.query(PoemModel).get_or_404(id)
        return poem.to_json()

    def delete(self, id):
        poem = db.session.query(PoemModel).get_or_404(id)
        db.session.delete(poem)
        db.session.commit()
        return 'Poem deleted correctly.', 204

    def put(self, id):
        poem = db.session.query(PoemModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(poem, key, value)
        db.session.add(poem)
        db.session.commit()
        return poem.to_json() , 201

class Poems(Resource):
    def get(self):
        page = 1
        per_page = 5

        poems = db.session.query(PoemModel)
        if request.get_json():
            filters = request.get_json().items()
            
            for key, value in filters:
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
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

        
        poems = poems.paginate(page, per_page, True, 20)
        return jsonify({"poems":[poem.to_json_short() for poem in poems.items],
                        'total': poems.total, 
                        'pages': poems.pages, 
                        'page': page})

    def post(self):
        poem = PoemModel.from_json(request.get_json())
        db.session.add(poem)
        db.session.commit()
        return poem.to_json_short(), 201
