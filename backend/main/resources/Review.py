from flask_restful import Resource
from flask import request

REVIEWS = {
    1: {'review': 'Good', 'mark': '3'},
    2: {'review': 'Excelent', 'mark': '5'},
}

#Recurso review
class Review(Resource):
    #Obtener recurso
    def get(self, id):
        if int(id) in REVIEWS:
            return REVIEWS[int(id)]
        return 'review not exist', 404

    #Eliminar recurso
    def delete(self, id):
        if int(id) in REVIEWS:
            del REVIEWS[int(id)]
            return 'review has been successfully deleted', 204
        return 'review to remove not exist', 404

#Recurso REVIEWS
class Reviews(Resource):
    #Obtener lista de recursos
    def get(self):
        return REVIEWS
    #Insertar recurso
    def post(self):
        #Obtener datos de la solicitud
        review = request.get_json()
        id = int(max(REVIEWS.keys())) + 1
        REVIEWS[id] = review
        return REVIEWS[id], 201