from .. import db

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    poem_id = db.Column(db.Integer, db.ForeignKey('poem.id'), nullable=False)
    mark = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(280), nullable=False)
    poem = db.relationship('Poem', back_populates = "reviews", uselist = False, single_parent = True) # Una review tiene Un Poema
    user = db.relationship('User', back_populates = "reviews", uselist = False, single_parent = True) #Una review corresponde a UN Usuario
    
    def __repr__(self):
        return '<Review: %r %r >' % (self.user_id, self.poem_id, self.mark, self.comment)
    #Convertir objeto en JSON
    def to_json(self):
        review_json = {
            'id': self.id,
            'user_id': self.user_id,
            'poem_id': self.poem_id,
            'mark': self.mark,
            'comment': str(self.comment),
        }
        return review_json

    def to_json_short(self):
        review_json = {
            'id': self.id,
            'comment': str(self.comment),
            'mark': self.mark,
        }
        return review_json
    
    def to_json_reviewpoem(self):
        review_json = {
            'user_id': self.user_id,
            'comment': str(self.comment),
            'mark': self.mark,
        }
        return review_json
    
    def to_json_reviewuser(self):
        review_json = {
            'poem_id': self.poem_id,
            'comment': str(self.comment),
            'mark': self.mark,
        }
        return review_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(review_json):
        id = review_json.get('id')
        user_id = review_json.get('user_id')
        poem_id = review_json.get('poem_id')
        mark = review_json.get('mark')
        comment = review_json.get('comment')
        return Review(id=id,
                    user_id=user_id,
                    poem_id=poem_id,
                    mark=mark,
                    comment=comment,
                    )
