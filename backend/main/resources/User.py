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

    #Eliminar recurso
    def delete(self, id):
        if int(id) in USERS:
            del USERS[int(id)]
            return 'User has been successfully deleted', 204
        return 'User to remove not exist', 404

    #Modificar recurso
    def put(self, id):
        if int(id) in USERS:
            user = USERS[int(id)]
            #Obtengo los datos de la solicitud
            data = request.get_json()
            user.update(data)
            return user, 201
        return 'Resource not found', 404

#Recurso USERS
class Users(Resource):
    #Obtener lista de recursos
    def get(self):
        return USERS
    #Insertar recurso
    def post(self):
        #Obtener datos de la solicitud
        user = request.get_json()
        id = int(max(USERS.keys())) + 1
        USERS[id] = user
        return USERS[id], 201