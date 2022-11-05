from flask import Flask
from flask import request
import json 

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/t_url", methods=['POST'])
def do_transcription():
    d = request.data
    d['url'] = 
    
@app.route("/t_file", methods=['POST'])
def do_transcription():
    d = request.data
    d['file'] = 