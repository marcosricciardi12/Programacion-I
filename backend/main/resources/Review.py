from flask_restful import Resource
from flask import request

REVIEWS = {
    1: {'review': 'Good', 'mark': '3'},
    2: {'review': 'Excelent', 'mark': '5'},
}

class Review(Resource):
    def get(self, id):
        if int(id) in REVIEWS:
            return REVIEWS[int(id)]
        return 'review not exist', 404

    def delete(self, id):
        if int(id) in REVIEWS:
            del REVIEWS[int(id)]
            return 'review has been successfully deleted', 204
        return 'review to remove not exist', 404

class Reviews(Resource):
    def get(self):
        return REVIEWS

    def post(self):
        review = request.get_json()
        id = int(max(REVIEWS.keys())) + 1
        REVIEWS[id] = review
        return REVIEWS[id], 201