from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config.from_object('app.config')
db = SQLAlchemy(app)
ma = Marshmallow(app)

"""
# Configurações do CORS
cors = CORS(app, resources={
    r"/api/*": {  # Ajuste isso conforme suas rotas de API
        "origins": ["https://seusite.com", "http://localhost:8100"],  # Adicione suas origens permitidas
        "methods": ["GET", "POST", "OPTIONS"],  # Métodos permitidos
        "allow_headers": ["Content-Type", "Authorization"],  # Cabeçalhos permitidos
        "supports_credentials": True  # Permite cookies e autenticação com credenciais
    }
})
"""

from app.models import users
from app.api.endpoints import index
from app.api.endpoints.cadastro import signup
from app.api.endpoints import update_info
from app.api.endpoints.match import get_users
from app.api.endpoints.autenticacao import login