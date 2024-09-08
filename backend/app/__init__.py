from flask import Flask
from flask_marshmallow import Marshmallow 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('app.config')
db = SQLAlchemy(app)
ma = Marshmallow(app)

from app.models import users
from app.api.endpoints import index
from app.api.endpoints import signup
from app.api.endpoints import update_info
from app.api.endpoints import get_users
from app.api.endpoints import login