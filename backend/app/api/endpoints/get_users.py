from app import app
from app.views import helper
from app.views import get_user_list

@app.route("/usuarios", methods=['GET'])
@helper.token_required
def get_users(current_user):
    return get_user_list.get_users()