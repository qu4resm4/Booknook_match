from app import app
from app.controllers.cadastro import register

@app.route("/cadastro", methods=['POST'])
def cadastro_index():
    return register.post_user()