import flask
from flask import Flask, flash, request, redirect, url_for, request
from werkzeug.utils import secure_filename
import json 
import os
from whisper_functions import download, transcribe

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/t_url", methods=['GET'])
def do_link_transcription():
    args = request.args
    url = args.get('url')

    unique = hash(url)

    path = 'tmp/' + str(unique) + '.wav'

    download(url, path)
    text = transcribe(path)

    os.remove(path)

    return text, 200, {'Content-Type': 'text/plain; charset=utf-8'}


@app.route("/upload_file", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        path = "tmp/" + str(hash(file.filename))
        file.save(path)
        text = transcribe(path)
        os.remove(path)
        return text
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="http://localhost:5000/upload_file" method=POST enctype = "multipart/form-data">
      <input type=file name=file>
      <input type=submit>
    </form>
    '''

@app.route("/t_file", methods=['POST'])
def do_file_transcription():
    d = request.data
    d['file'] = {''}