from app import db, ma

class IdioUser(db.Model):
    id_user = db.Column(db.Integer, foreign_key=True, nullable=False)
    id_idioma = db.Column(db.Integer, db.ForeignKey('idiomas.id'), nullable=False)
    
    def __init__ (self, id_user, id_idioma):
        self.id_user = id_user
        self.id_idioma = id_idioma


class IdioUserSchema(ma.Schema):
    class Meta:
        fields = ('id_user', 'id_idioma')


idioiser_schema = IdioUserSchema()
idioiser_schema = IdioUserSchema(many=True)