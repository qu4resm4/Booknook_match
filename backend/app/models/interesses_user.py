from app import db, ma

class InteUser(db.Model):
    id_user = db.Column(db.Integer, foreign_key=True, nullable=False)
    id_interesse = db.Column(db.Integer, db.ForeignKey('inte.id'), nullable=False)
    
    def __init__ (self, id_user, id_interesse):
        self.id_user = id_user
        self.id_interesse = id_interesse


class InteUserSchema(ma.Schema):
    class Meta:
        fields = ('id_user', 'id_interesse')


inteuser_schema = InteUserSchema()
inteuser_schema = InteUserSchema(many=True)