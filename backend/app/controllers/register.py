from werkzeug.security import generate_password_hash
from app import db
from flask import request, jsonify
from app.models.users import Users, user_schema, users_schema


def post_user():
    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    email = request.json['email']
    pass_hash = generate_password_hash(password)
    user = Users(username, pass_hash, name, email)


    try:
        db.session.add(user)
        db.session.commit()
        result = user_schema.dump(user)
        return jsonify({'message': 'registrado com sucesso!', 'data': result}), 201
    except:
        return jsonify({'message': 'erro ao cadastrar', 'data': {}}), 500