from flask_restful import Resource
from flask import request

POEMS = {
    1: {'title': 'Hola', 'date': '10/12/2020'},
    2: {'title': 'Chau', 'date': '11/10/2021'},
}

class Poem(Resource):
    
    def get(self, id):
        if int(id) in POEMS:
            return POEMS[int(id)]
        return 'Poem not exist', 404

    def delete(self, id):
        if int(id) in POEMS:
            del POEMS[int(id)]
            return 'Poem has been deleted', 204
        return 'Poem not exist', 404

    def put(self, id):
        if int(id) in POEMS:
            poem = POEMS[int(id)]
            data = request.get_json()
            poem.update(data)
            return poem, 201
        return 'Poem to edit does not exist', 404

class Poems(Resource):

    def get(self):
        return POEMS

    def post(self):
        poem = request.get_json()
        id = int(max(POEMS.keys())) + 1
        POEMS[id] = poem
        return POEMS[id], 201

