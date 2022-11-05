import whisper
from yt_dlp import YoutubeDL
from tqdm import tqdm


model = whisper.load_model("base.en")


def get_letters(text):
    chars = list(text)
    letters = []
    for char in chars:
        if char.isalpha():
            letters.append(char.lower())
    return letters


def transcribe(audio):
    # load audio and pad/trim it to fit 30 seconds
    audio = whisper.load_audio(audio)
    options = whisper.DecodingOptions(language="en")

    text = ""
    window_size = 480000
    step_size = window_size // 10
    skip_size = window_size - step_size

    for end in tqdm(range(window_size, len(audio) + skip_size, skip_size)):
        start = end - window_size
        chunk = audio[start:end]
        chunk = whisper.pad_or_trim(chunk)

        mel = whisper.log_mel_spectrogram(chunk).to(model.device)

        result = whisper.decode(model, mel, options)
        result_text = result.text

        overlap_index = -1

        for i in range(len(result_text)):
            if get_letters(text[-i:]) == get_letters(result_text[:i]):
                overlap_index = i
        if overlap_index == -1:
            overlap_index = 0

        if len(text) != 0:
            text += " "
        text += result_text[overlap_index:]

    return text


def download(url, path='tmp/tmp.wav'):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': path,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }]
    }

    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


id = 'HbY51mVKrcE'
url = 'https://www.youtube.com/watch?v='+id
download(url, path='tmp/'+id+'.wav')
print(transcribe('tmp/'+id+'.wav'))