import flask
from flask import Flask, flash, request, redirect, url_for, request
from werkzeug.utils import secure_filename
import json
import os
from summarize import summarize

app = Flask(__name__)


@app.route("/")
def hello_world():
    return app.send_static_file('index.html')


@app.route("/t_url", methods=['GET'])
def do_link_transcription():
    args = request.args
    url = args.get('url')

    unique = hash(url)

    path = 'tmp/' + str(unique) + '.wav'

    text = 'bruh'
    summary = summarize(text)

    os.remove(path)

    return summary, 200, {'Content-Type': 'text/plain; charset=utf-8'}


@app.route("/upload_file", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        path = "tmp/" + str(hash(file.filename))
        file.save(path)

        text = 'bruh'
        summary = summarize(text)

        os.remove(path)

        return summary, 200, {'Content-Type': 'text/plain; charset=utf-8'}
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="http://localhost:5000/upload_file" method=POST enctype = "multipart/form-data">
      <input type=file name=file>
      <input type=submit>
    </form>
    '''
