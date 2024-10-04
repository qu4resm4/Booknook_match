import string
import random


random_str = string.ascii_letters + string.digits + string.ascii_uppercase
key = ''.join(random.choice(random_str) for i in range(12))
DEBUG = True
SENHA = '' # ponha a senha da conexão, deixe vazio se não precisar de senha

SQLALCHEMY_DATABASE_URI = 'mysql://root:@localhost:3307/booknook'

SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = key