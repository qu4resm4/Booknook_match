from app import app
from app.controllers import helper
from app.controllers import get_user_list

@app.route("/usuarios", methods=['GET'])
@helper.token_required
def get_users(current_user):
    return get_user_list.get_users()