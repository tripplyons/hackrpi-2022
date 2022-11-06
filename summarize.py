import numpy as np
from tqdm import tqdm
import cohere
co = cohere.Client('Rwi47oVJlWOajOUfjnaLuqLcGwZpPMhciWAmcZiu')


# if __name__ == '__main__':
# prompt = """Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn't the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to "the dusty section of the dictionary" to find its latest words.

#     TLDR: Wordle has not gotten more difficult to solve.
#     --
#     Passage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.

#     TLDR: ArtificialIvan has raised $190 million in Series C funding.
#     --
#     Passage: The National Weather Service announced Tuesday that a freeze warning is in effect for the Bay Area, with freezing temperatures expected in these areas overnight. Temperatures could fall into the mid-20s to low 30s in some areas. In anticipation of the hard freeze, the weather service warns people to take action now.

#     TLDR:"""

# response = co.generate(
#     model='xlarge',
#     prompt=prompt,
#     max_tokens=40,
#     temperature=0.8,
#     stop_sequences=["--"])

# summary = response.generations[0].text


def summarize_single(text, temperature=0.0):
    try:
        response = co.generate(
            model='xlarge',
            prompt="""Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn't the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to "the dusty section of the dictionary" to find its latest words.

    In Summary: Wordle has not gotten more difficult to solve.
    --
    Passage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.

    In Summary: ArtificialIvan has raised $190 million in Series C funding.
    --
    Passage: """ + text + "\n\nIn Summary:",
            max_tokens=300,
            temperature=temperature,
            stop_sequences=["\n"])

        summary = response.generations[0].text
        # remove space and stop sequence
        summary = summary[:-2].strip()

        if len(summary) > 500:
            print('RETRYING BECAUSE OF ' + str(len(summary)) +
                  ' LENGTH' + ' ' + str(temperature))
            return summarize_single(text, temperature=temperature + 0.1)
        return summary
    except:
        pass
    return summarize_single(text, temperature=temperature)


def group_sentences(text):
    sentences = text.split(". ")

    sentences_per_paragraph = 5

    if len(sentences) < sentences_per_paragraph:
        return [text]

    response = co.embed(texts=sentences)
    embeddings = np.array(response.embeddings)

    dot_products = np.dot(embeddings, embeddings.T)

    pairwise = []
    for i in range(len(dot_products) - 1):
        pairwise.append(dot_products[i][i+1])

    breaks = np.argsort(np.diff(np.diff(pairwise)), axis=None)

    num_breaks = len(sentences) // sentences_per_paragraph
    breaks = breaks[:num_breaks]
    breaks = np.sort(breaks)

    groups = [
        sentences[breaks[i]:breaks[i+1]]
        for i in range(len(breaks) - 1)
    ]
    groups.append(sentences[breaks[-1]:])

    return ['. '.join(group) for group in groups]


def summarize(text):
    summary = ""

    groups = group_sentences(text)

    for group in tqdm(groups):
        summary += summarize_single(group)
        if len(summary) != 0 and summary[-1] != '.':
            summary += '.'
        summary += ' '

    return summary.strip()


if __name__ == '__main__':
    with open('example-transcripts/vector.txt', 'r') as f:
        text = f.read()
        print(summarize(text))
