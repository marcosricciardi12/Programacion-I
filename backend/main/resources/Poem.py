from flask_restful import Resource
from flask import request

#Diccionario de prueba

POEMS = {
    1: {'title': 'Hola', 'date': '10/12/2020'},
    2: {'title': 'Chau', 'date': '11/10/2021'},
}

#Recurso Poem
class Poem(Resource):
    #Obtener recurso
    def get(self, id):
        if int(id) in POEMS:
            return POEMS[int(id)]
        return '', 404

    #Eliminar recurso
    def delete(self, id):
        #Verificar que exista un Profesor con ese Id en diccionario
        if int(id) in POEMS:
            #Eliminar professor del diccionario
            del POEMS[int(id)]
            return '', 204
        return '', 404
    #Modificar recurso
    def put(self, id):
        if int(id) in POEMS:
            professor = POEMS[int(id)]
            #Obtengo los datos de la solicitud
            data = request.get_json()
            professor.update(data)
            return professor, 201
        return '', 404

#Recurso Poems
class Poems(Resource):
    #Obtener lista de recursos
    def get(self):
        return POEMS
    #Insertar recurso
    def post(self):
        #Obtener datos de la solicitud
        professor = request.get_json()
        id = int(max(POEMS.keys())) + 1
        POEMS[id] = professor
        return POEMS[id], 201

