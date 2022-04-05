from .. import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user = db.Column(db.String(100), nullable= False)
    email = db.Column(db.String(100), nullable= False)
    password = db.Column(db.String(100), nullable= False)
    
    def __repr__(self):
        return f'User: {self.user} , {self.email}'
    
    def to_json(self):
        user_json = {
            'id': self.id,
            'user': str(self.user),
            'email': str(self.email),
        }
        return user_json
    
    def to_json_short(self):
        user_json = {
            'id': self.id,
            'user': str(self.user),
            
        }
        return user_json
    
    @staticmethod
    #Convert JSON to Object
    def from_json(user_json):
        id = user_json.get('id')
        user = user_json.get('user')
        email = user_json.get('email')
        password = user_json.get('password')
        return User(id = id,
                    user = user,
                    email = email,
                    password = password,
                    )