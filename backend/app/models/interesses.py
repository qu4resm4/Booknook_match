from app import db, ma

class Preference(db.Model):
    __tablename__ = 'inte'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tipo = db.Column(db.Integer, nullable=False)
    preferencia = db.Column(db.String(40), nullable=False)

    __table_args__ = (
        db.CheckConstraint('tipo BETWEEN 1 AND 17', name='tipo_check'),
    )

    def __init__ (self, tipo, preferencia):
        self.tipo = tipo
        self.preferencia = preferencia


class InteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'tipo', 'preferencia')


inte_schema = InteSchema()
intes_schema = InteSchema(many=True)