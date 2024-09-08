from app import app
from app.views import helper


@app.route("/login", methods=['POST'])
def authenticate():
    return helper.auth()