import re
from urllib import response
from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ReviewModel
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.models import UserModel
from main.models import PoemModel
from main.models import ReviewModel
from main.mail.functions import sendmail

class Review(Resource):

    
    def get(self, id):

        review = db.session.query(ReviewModel).get_or_404(id)
        return review.to_json()

    @jwt_required()
    def delete(self, id):
        token_id = get_jwt_identity()
        claims = get_jwt()
        review = db.session.query(ReviewModel).get_or_404(id)
        if not claims:
            claims = {'admin': False}
        if token_id == review.user_id or claims['admin']:
            db.session.delete(review)
            db.session.commit()
            return 'Review deleted', 204    
        else:
            return "You don't have permission to delete this review", 403


class Reviews(Resource):

    def get(self):
        reviews = db.session.query(ReviewModel).all()
        return jsonify([review.to_json() for review in reviews])

    @jwt_required()
    def post(self):
        review_user_id = get_jwt_identity()
        reviews = db.session.query(ReviewModel).all()
        has_review_from_this_user = False
        
        #Necesito el id del usuario que hizo el poema que se va a calificar
        #Necesito los id de los usuarios que ya calificaron al poema
        #El dueño del token va a ser el creador del poema
        review = ReviewModel.from_json(request.get_json())
        review.user_id = review_user_id
        for rew in reviews:
            if rew.user_id == review_user_id and rew.poem_id == review.poem_id:
                has_review_from_this_user = True
                break
        poem = db.session.query(PoemModel).get_or_404(review.poem_id)
        user_poem_id = poem.user_id
        if review_user_id != user_poem_id and not has_review_from_this_user:
            try:
                db.session.add(review)
                db.session.commit()
                result = sendmail([review.poem.user.email], 'Nueva reseña!!', 'new_review', review = review)
                return review.to_json(), 201
            except Exception as error:
                # db.session.rollback()
                return str(error), 409
        else:
            return 'You cannot auto evaluate or make more of one review in this poem', 403
