from os import environ

class Config(object):
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REMEMBER_COOKIE_DURATION = 2592000
    REMEMBER_COOKIE_HTTPONLY = True
    API_TITLE = 'marmoraria'
    API_VERSION = 'V1'

class ProductionConfig(Config):
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False

def set_production_config(app):
    app.config.from_object("app.ext.config.ProductionConfig")

def set_development_config(app):
    app.config.from_object("app.ext.config.DevelopmentConfig")
    