from app import app
from app.views import register

@app.route("/cadastro", methods=['POST'])
def cadastro_index():
    return register.post_user()