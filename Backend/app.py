# app.py
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Initialize the Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
load_dotenv()

# Simple health-check endpoint
@app.route("/")
def index():
    return "it's working"

# Import controller to register RAG and voice routes

from controller import *
# noqa: F401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
