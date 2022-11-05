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


def summarize_single(text):
    response = co.generate(
        model='xlarge',
        prompt="""Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn't the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to "the dusty section of the dictionary" to find its latest words.

TLDR: Wordle has not gotten more difficult to solve.
--
Passage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.

TLDR: ArtificialIvan has raised $190 million in Series C funding.
--
Passage: """ + text + "\n\nTLDR:",
        max_tokens=200,
        temperature=0,
        stop_sequences=["\n"])

    summary = response.generations[0].text
    # remove space and stop sequence
    return summary[:-2].strip()


def summarize(text):
    sentences = text.split(".")
    summary = ""

    step = 10
    for i in range(0, len(sentences), step):
        summary += summarize_single(".".join(sentences[i:i+step]))
        summary += ' '

    return summary.strip()


if __name__ == '__main__':
    with open('example-transcripts/vector.txt', 'r') as f:
        print(summarize(f.read()))
