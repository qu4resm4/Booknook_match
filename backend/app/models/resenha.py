import datetime
from app import db, ma


class Resenhas(db.Model):
    __tablename__ = 'resenhas'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    id_book = db.Column(db.String(12), nullable=False)
    descricao = db.Column(db.String(600), nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.now)
    last_update = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)


    def __init__ (self, id_user, id_book, descricao, created_on, last_update):
        self.id_user = id_user
        self.id_book = id_book
        self.descricao = descricao
        self.created_on = created_on
        self.last_update = last_update

class ResenhasSchema(ma.Schema):
    class Meta:
        fields = ('id','id_user','id_book', 'descricao', 'created_on', 'last_update')


resenha_schema = ResenhasSchema()
resenhas_schema = ResenhasSchema(many=True)