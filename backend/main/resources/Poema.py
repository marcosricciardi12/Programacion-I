from flask_restful import Resource
from flask import request

#Diccionario de prueba
PROFESSORS = {
    1: {'firstname': 'Pedro', 'lastname': 'Marco'},
    2: {'firstname': 'María', 'lastname': 'Sosa'},
}

POEMAS = {
    1: {'title': 'Hola', 'date': '10/12/2020'},
    2: {'title': 'Chau', 'date': '11/10/2021'},
}

#Recurso Poema
class Poema(Resource):
    #Obtener recurso
    def get(self, id):
        if int(id) in POEMAS:
            return POEMAS[int(id)]
        return '', 404

    #Eliminar recurso
    def delete(self, id):
        #Verificar que exista un Profesor con ese Id en diccionario
        if int(id) in POEMAS:
            #Eliminar professor del diccionario
            del POEMAS[int(id)]
            return '', 204
        return '', 404
    #Modificar recurso
    def put(self, id):
        if int(id) in POEMAS:
            professor = POEMAS[int(id)]
            #Obtengo los datos de la solicitud
            data = request.get_json()
            professor.update(data)
            return professor, 201
        return '', 404

#Recurso Profesores
class Poemas(Resource):
    #Obtener lista de recursos
    def get(self):
        return POEMAS
    #Insertar recurso
    def post(self):
        #Obtener datos de la solicitud
        professor = request.get_json()
        id = int(max(POEMAS.keys())) + 1
        POEMAS[id] = professor
        return POEMAS[id], 201

