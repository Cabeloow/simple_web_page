from flask import Blueprint

root_routes = Blueprint('root_routes', __name__)

from . import route