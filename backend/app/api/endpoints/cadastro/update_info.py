from app import app
from app.controllers.autenticacao import helper
from app.controllers.cadastro import update_info_user


@app.route("/update_user/<id>", methods=['PUT'])
@helper.token_required
def cadastro_update(current_user, id):
    return update_info_user.update_user(id)