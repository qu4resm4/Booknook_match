from app import app
import datetime
from app.views.user_by_username import user_by_username
import jwt
from werkzeug.security import check_password_hash
from flask import request, jsonify
from functools import wraps


def auth():
    auth = request.authorization
    print(auth)
    print("--------------")
    print(type(auth))
    print("--------------------")
    print(auth.username)
    print("----------")
    print(auth.password)
    if not auth or not auth.username or not auth.password:
        return jsonify({'message': 'não foi possível verificar', 'WWW-Authenticate': 'Basic auth="Necessário estar logado"'}), 401

    user = user_by_username(auth.username)
    if not user:
        return jsonify({'message': 'usuário não encontrado', 'data': {}}), 401
    
    if user and check_password_hash(user.password, auth.password):
        token = jwt.encode({'username': user.username, 'exp': datetime.datetime.now() + datetime.timedelta(hours=12)}, app.config['SECRET_KEY'])

        return jsonify({'message': 'validado com sucesso', 'toke': token, 'exp': datetime.datetime.now() + datetime.timedelta(hours=12)})

    return jsonify({'message': 'não foi possível verificar', 'WWW-Authenticate': 'Basic auth="Necessário estar logado"'}), 401
    

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'está faltando o token', 'data': {}}), 401
        
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        current_user = user_by_username(username=data['username'])

        return f(current_user, *args, **kwargs)
    return decorated