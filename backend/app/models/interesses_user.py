from app import db, ma

class InteUser(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    id_preference = db.Column(db.Integer, db.ForeignKey('inte.id'), nullable=False)
    
    def __init__ (self, id_user, id_preference):
        self.id_user = id_user
        self.id_preference = id_preference


class InteUserSchema(ma.Schema):
    class Meta:
        fields = ('id_user', 'id_preference')


inteuser_schema = InteUserSchema()
intesuser_schema = InteUserSchema(many=True)