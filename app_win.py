import flask
from flask import Flask, flash, request, redirect, url_for, request
from werkzeug.utils import secure_filename
import json
import os
from summarize import summarize, group_sentences, summarize_single

app = Flask(__name__)


@app.route("/")
def hello_world():
    return app.send_static_file('index.html')


@app.route("/g_url", methods=['GET'])
def do_link_transcription():
    args = request.args
    url = args.get('url')

    unique = hash(url)

    path = 'tmp/' + str(unique) + '.wav'

    text = open('example-transcripts/vector.txt').read()
    groups = '\n'.join(group_sentences(text))

    os.remove(path)

    return groups, 200, {'Content-Type': 'text/plain; charset=utf-8'}


@app.route("/upload_file", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        path = "tmp/" + str(hash(file.filename))
        file.save(path)

        text = open('example-transcripts/vector.txt').read()
        groups = '\n'.join(group_sentences(text))

        os.remove(path)

        return groups, 200, {'Content-Type': 'text/plain; charset=utf-8'}
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="http://localhost:5000/upload_file" method=POST enctype = "multipart/form-data">
      <input type=file name=file>
      <input type=submit>
    </form>
    '''


@app.route("/s_text", methods=['POST'])
def do_text_summarization():
    text = request.data.decode('utf-8')

    summary = summarize_single(text)

    return summary, 200, {'Content-Type': 'text/plain; charset=utf-8'}
