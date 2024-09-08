from werkzeug.security import generate_password_hash
from app import db
from flask import request, jsonify
from app.models.users import Users, user_schema, users_schema


def update_user(id):
    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    email = request.json['email']

    user = Users.query.get(id)
    if not user:
        return jsonify({'message': 'usuário inexistente', 'data': {}}), 404

    pass_hash = generate_password_hash(password)

    try:
        user.username = username
        user.password = pass_hash
        user.name = name
        user.email = email
        db.session.commit()
        result = user_schema.dump(user)
        return jsonify({'message': 'atualizado com sucesso!', 'data': result}), 201
    except:
        return jsonify({'message': 'erro ao atualizar informações de cadastro', 'data': {}}), 500