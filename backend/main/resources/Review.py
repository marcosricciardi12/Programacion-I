from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ReviewModel



class Review(Resource):
    def get(self, id):

        review = db.session.query(ReviewModel).get_or_404(id)
        return review.to_json()


    def delete(self, id):

        review = db.session.query(ReviewModel).get_or_404(id)
        db.session.delete(review)
        db.session.commit()
        return 'Review deleted', 204


class Reviews(Resource):
    def get(self):
        reviews = db.session.query(ReviewModel).all()
        return jsonify([review.to_json() for review in reviews])


    def post(self):
        review = ReviewModel.from_json(request.get_json())
        db.session.add(review)
        db.session.commit()
        return review.to_json(), 201
