import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources
api = Api()

def create_app():
	app = Flask(__name__)
	load_dotenv()
	api.add_resource(resources.PoemsResource, '/poems')
	api.add_resource(resources.PoemResource, '/poem/<id>')
	api.add_resource(resources.UsersResource, '/users')
	api.add_resource(resources.UserResource, '/user/<id>')
	api.add_resource(resources.ReviewsResource, '/reviews')
	api.add_resource(resources.ReviewResource, '/review/<id>')
	api.init_app(app)
	return app
