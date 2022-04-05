from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UserModel


#Recurso usuario
class User(Resource):
    
    #obtener recurso
    def get(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        return user.to_json()

    #eliminar recurso
    def delete(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return 'User deleted', 204
    
    
    def put(self, id):
        user = db.session.query(UserModel).get_or_404(id)
        data = request.get_json().items()
        for key,value in data:
            setattr(user,key,value)
        db.session.add(user)
        db.session.commit()
        return 'User modified',user.to_json(), 201

class Users(Resource):
    def get(self):
        users = db.session.query(UserModel).all()
        return jsonify([user.to_json_short() for user in users])
        
    def post(self):
        user = UserModel.from_json(request.get_json())
        db.session.add(user)
        db.session.commit()
        return user.to_json(), 201