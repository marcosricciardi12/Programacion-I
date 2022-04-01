import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
api = Api()
db = SQLAlchemy()


def create_app():
	app = Flask(__name__)
	load_dotenv()

	if not os.path.exists(os.getenv('DATABASE_PATH') + os.getenv('DATABASE_NAME')):
		os.mknod(os.getenv('DATABASE_PATH') + os.getenv('DATABASE_NAME'))
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
	db.init_app(app)
	import main.resources as resources
	api.add_resource(resources.PoemsResource, '/poems')
	api.add_resource(resources.PoemResource, '/poem/<id>')
	api.add_resource(resources.UsersResource, '/users')
	api.add_resource(resources.UserResource, '/user/<id>')
	api.add_resource(resources.ReviewsResource, '/reviews')
	api.add_resource(resources.ReviewResource, '/review/<id>')
	api.init_app(app)
	return app
