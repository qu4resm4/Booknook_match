from app import app
from app.controllers import helper


@app.route("/login", methods=['POST'])
def authenticate():
    return helper.auth()