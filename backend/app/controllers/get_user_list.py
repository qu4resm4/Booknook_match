from werkzeug.security import generate_password_hash
from app import db
from flask import request, jsonify
from app.models.users import Users, user_schema, users_schema


def get_users():

    users = Users.query.all()
    if users:
        result = users_schema.dump(users)
        return jsonify({'message': 'requisição bem sucedida', 'data': result})
    
    return jsonify({'message': 'nenhum usuário encontrado', 'data': {}})