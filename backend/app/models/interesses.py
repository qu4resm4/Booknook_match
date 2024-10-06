from app import db, ma

class Inte(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    classficacao = db.Column(db.String, nullable=False)
    valor = db.Column(db.String, nullable=False)

    def __init__ (self, classficacao, valor):
        self.classficacao = classficacao
        self.valor = valor


class InteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'classificacao', 'valor')


inte_schema = InteSchema()
intes_schema = InteSchema(many=True)