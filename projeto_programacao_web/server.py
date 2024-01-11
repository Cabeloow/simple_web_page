from flask import Flask, sessions
from app.ext.routes import init_app
from flask_login import LoginManager

def create_miniamal_app():
    app = Flask(__name__)
    return app

def init_auth(app, login):
    from app.ext.auth import User

    login.init_app(app)

    @login.unauthorized_handler
    def unauthorized_callback():
        from flask import flash, request, redirect, url_for
        flash('Acesso Restrito, Você Precisa se Logar!')
        return redirect(url_for('root_routes.home', next=request.url))

    @login.user_loader
    def load_user(usuario):
        return User(usuario)


def create_app():
    app = create_miniamal_app()
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    init_app(app)
    login = LoginManager(app)
    init_auth(app, login)
    return app