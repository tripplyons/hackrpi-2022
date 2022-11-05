from flask import Flask
from flask import request
import json
import os
from whisper_functions import transcribe, download

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/t_url", methods=['GET'])
def do_transcription():
    args = request.args
    url = args.get('url')

    unique = hash(url)

    path = 'tmp/' + str(unique) + '.wav'

    download(url, path)
    text = transcribe(path)

    os.remove(path)

    return text, 200, {'Content-Type': 'text/plain; charset=utf-8'}


# @app.route("/t_file", methods=['POST'])
# def do_transcription():
#     d = request.data
#     d['file'] =
