# TLDW

Too Long, Didn't Watch - AI Video Summarizer

## Installation

```bash
conda env create -f environment.yml
```

Add your cohere API key to the `API_KEY.txt` file.

## Usage

```bash
flask --app app.py run
```

## Inspiration
As more educational content becomes available freely online, we wanted to provide an alternative mode of access. We were inspired by the effectiveness of OpenAI's Whisper, and noticed that Cohere provides a model for summarization. This lead us to combine them in a feature rich web app

## What it does
TLDW accepts a video file or a link to a video on a major website, and creates a transcript of it. It then splits up the transcript into paragraphs and then summarizes them using the Cohere API, outputting a bulleted list of summarized points from the video.

## How we built it
We use OpenAI's whisper model to generate transcripts of videos. Then, we compute dot product similarity between sentences using vectors from the Cohere Embed API. We insert paragraph breaks between sentences that are less similar. Then, we use Cohere's Generate API to generate a short summary of each paragraph. 

## Challenges we ran into
One of the main issues that we ran into was Cohere not summarizing the text correctly. We mitigated this in many ways, including finding more effective prompts for Cohere. Another issue we ran into was splitting the dialog up into smaller portions of text to summarize. Cohere would not be able to summarize a enormous wall of text, so we wrote a program that used Cohere Embed to detect breaking points.

## Accomplishments that we're proud of
We are proud of our unique use of Cohere Embedding to detect where to split paragraphs. Additionally, we are proud of how it looks and its practical applications.

## What we learned
This is our first Hackathon, so it was a new experience for our whole team. One of the main takeaways was the importance of generating ideas. We spent the first three hours trying to come up with something  before we finally nailed it down. Additionally we learned how to use various APIs during this Hackathon, and practiced plenty of git. 

## What's next for TLDW
Even with our improvements, Cohere still struggles with some things, particularity metaphors. We would definitely further refine the prompts, and add more based on metaphors. Additionally, we would like to experiment with using the back end in order to summarize live events for those unable to attend or attending remotely.
