from flask_restful import Resource
from flask import request

USERS = {
    1: {'user': 'stars2021', 'email': 'peter.amstrong@mail.com'},
    2: {'user': 'sky1998', 'email': 'anna.tesla@mail.com'},
}

#Recurso User
class User(Resource):
    #Obtener recurso
    def get(self, id):
        if int(id) in USERS:
            return USERS[int(id)]
        return 'User not exist', 404

    def delete(self, id):
        if int(id) in USERS:
            del USERS[int(id)]
            return 'User has been successfully deleted', 204
        return 'User to remove not exist', 404

    def put(self, id):
        if int(id) in USERS:
            user = USERS[int(id)]
            data = request.get_json()
            user.update(data)
            return user, 201
        return 'User not found', 404

class Users(Resource):

    def get(self):
        return USERS
        
    def post(self):
        user = request.get_json()
        id = int(max(USERS.keys())) + 1
        USERS[id] = user
        return USERS[id], 201