from .. import db
from datetime import datetime

class Poem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_date = db.Column(db.DateTime, nullable = False, default = datetime.now())
    user = db.relationship('User', back_populates = "poems", uselist = False, single_parent = True) # Un Poema tiene un Usuario
    reviews = db.relationship('Review', back_populates = "poem", cascade = 'all, delete-orphan') # Un Poema tiene n reviews


    def __repr__(self):
        return '<Poem: %r %r >' % (self.title, self.content, self.user_id)

    def to_json(self):
        reviews = [review.to_json_reviewpoem() for review in self.reviews]
        poem_json = {
            'id': self.id,
            'title': str(self.title),
            'content': str(self.content),
            'user': self.user.to_json_onlyname(),
            'post_date': self.post_date.strftime("%Y-%m-%d  %H:%M:%S"),
            'reviews': reviews
        }
        return poem_json

    def to_json_short(self):
        reviews = [review.to_json_reviewpoem() for review in self.reviews]
        suma = 0
        for review in reviews:
            suma = suma + int(review['mark'])
        if(len(reviews) == 0):
            average = 0
        else:
                average = suma/len(reviews)
        print(average)
        poem_json = {
            'id': self.id,
            'title': str(self.title),
            'user': self.user.to_json_onlyname(),
            'post_date': self.post_date.strftime("%Y-%m-%d  %H:%M:%S"),
            'reviews': len(self.reviews),
            'average': round(average,2),
            'int_average': int(round(average))  
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
