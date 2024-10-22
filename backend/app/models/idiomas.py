from app import db, ma

class Idiomas(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idioma = db.Column(db.String(20), nullable=False)

    def __init__ (self, idioma):
        self.idioma = idioma


class IdiomasSchema(ma.Schema):
    class Meta:
        fields = ('id', 'idioma')


idioma_schema = IdiomasSchema()
idiomas_schema = IdiomasSchema(many=True)