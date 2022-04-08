from .. import db

class Poem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates = "poems", uselist = False, single_parent = True)



    def __repr__(self):
        return '<Poem: %r %r >' % (self.title, self.content, self.user_id)

    def to_json(self):
        poem_json = {
            'id': self.id,
            'title': str(self.title),
            'content': str(self.content),
            'user': self.user.to_json()
        }
        return poem_json

    def to_json_short(self):
        poem_json = {
            'id': self.id,
            'title': str(self.title),
        }
        return poem_json

    @staticmethod
    def from_json(poem_json):
        id = poem_json.get('id')
        title = poem_json.get('title')
        content = poem_json.get('content')
        user_id = poem_json.get('user_id')
        return Poem(id=id,
                title=title,
                content=content,
                user_id = user_id
                )
