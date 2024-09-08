from app import app
from app.views import helper
from app.views import update_info_user


@app.route("/update_user/<id>", methods=['PUT'])
@helper.token_required
def cadastro_update(current_user, id):
    return update_info_user.update_user(id)