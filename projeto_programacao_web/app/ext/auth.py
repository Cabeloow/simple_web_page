from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, usuario) -> None:
        self.usuario = usuario

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.usuario)

    def __repr__(self) -> str:
        return str(self.usuario)

