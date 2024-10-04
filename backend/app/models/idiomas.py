from app import db, ma

class Idiomas(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String, nullable=False)

    def __init__ (self, nome):
        self.nome = nome


class IdiomasSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nome')


idiomas_schema = IdiomasSchema()
idiomas_schema = IdiomasSchema(many=True)