from flask import Flask
app = Flask(__name__)
import os
from dotenv import load_dotenv
load_dotenv()
if __name__ == '__main__':
	app.run(port = os.getenv("PORT"), debug = True)
#Cambios
