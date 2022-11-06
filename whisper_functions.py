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
    window_size = 480000  # 30 seconds
    step_size = window_size // 10  # 3 seconds
    skip_size = window_size - step_size

    for end in tqdm(range(window_size, len(audio) + skip_size, skip_size)):
        start = end - window_size
        chunk = audio[start:end]
        chunk = whisper.pad_or_trim(chunk)

        mel = whisper.log_mel_spectrogram(chunk).to(model.device)

        result = whisper.decode(model, mel, options)
        result_text = result.text

        letters_overlap_index = -1

        letters = get_letters(text)
        result_letters = get_letters(result_text)

        for i in range(1, len(result_letters)):
            if letters[-i:] == result_letters[:i]:
                letters_overlap_index = i

        if letters_overlap_index == -1:
            letters_overlap_index = 0

        overlap_index = -1

        if letters_overlap_index != 0:
            for i in range(len(result_text)):
                if get_letters(result_text[:i]) == result_letters[:letters_overlap_index]:
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


if __name__ == '__main__':
    download("https://www.youtube.com/watch?v=XxCha4Kez9c")
    print(transcribe("tmp/tmp.wav"))
