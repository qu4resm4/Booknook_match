from app import app, db

if __name__ == "__main__":
    db.create_all() # apagar depois da primeira execução
    app.run()