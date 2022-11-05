from flask import Flask
from flask import request
import json
from whisper_functions import transcribe, download

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/t_url", methods=['GET'])
def do_transcription():
    args = request.args
    url = args.get('url')

    download(url, 'tmp/tmp.wav')
    text = transcribe('tmp/tmp.wav')

    return text


# @app.route("/t_file", methods=['POST'])
# def do_transcription():
#     d = request.data
#     d['file'] =
