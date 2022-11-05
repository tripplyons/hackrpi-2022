import flask
from flask import Flask, flash, request, redirect, url_for, request
from werkzeug.utils import secure_filename
import json 
import os

app = Flask(__name__)
UPLOAD_FOLDER = './upload_temp/'
ALLOWED_EXTENSIONS = {'mov', 'mp4','webm', 'mkv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/t_url", methods=['POST'])
def do_transcription():
    d = request.data
    d['url'] = {''}

@app.route("/upload_file", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('download_file', name=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route("/t_file", methods=['POST'])
def do_transcription():
    d = request.data
    d['file'] = {''}