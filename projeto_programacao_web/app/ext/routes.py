from app.routes.root import root_routes

def init_app(app):
    app.register_blueprint(root_routes)