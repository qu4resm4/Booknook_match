import datetime
from app import db, ma


"""definição da classe/tabela dos usuários e seus campos"""
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.now)
    email_confirmed = db.Column(db.Boolean, default=False)
    confirmation_code = db.Column(db.String(50), nullable=True)

    def __init__ (self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

"""Definindo o Schema do Marshmallow para facilitar a utilização de JSON"""
class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id','username', 'email', 'password', 'created_on')


user_schema = UsersSchema()
users_schema = UsersSchema(many=True)