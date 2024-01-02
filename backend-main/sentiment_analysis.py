#installed transformers library
#installed scipy
#installed torch

from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import csv
import urllib.request


def preprocess(text):
    new_text = []

    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

task='sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

tokenizer = AutoTokenizer.from_pretrained(MODEL)

labels=[]
mapping_link = f"https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/{task}/mapping.txt"
with urllib.request.urlopen(mapping_link) as f:
    html = f.read().decode('utf-8').split("\n")
    csvreader = csv.reader(html, delimiter='\t')
labels = [row[1] for row in csvreader if len(row) > 1]

model = AutoModelForSequenceClassification.from_pretrained(MODEL)
model.save_pretrained(MODEL)

# text = "i hate you"
# text = preprocess(text)
# encoded_input = tokenizer(text, return_tensors='pt')
# output = model(**encoded_input)
# scores = output[0][0].detach().numpy()
# scores = softmax(scores)
#
# ranking = np.argsort(scores)
# ranking = ranking[::-1]
# max_pair = ('',0)
# for i in range(scores.shape[0]):
#     if scores[ranking[i]] > max_pair[1]:
#         max_pair = (labels[ranking[i]],scores[ranking[i]])
# print(max_pair[0])
###################

def analyze_sentiment(text):
    # Preprocess the text
    text = preprocess(text)

    # Encode the text
    encoded_input = tokenizer(text, return_tensors='pt')

    # Get the model output
    output = model(**encoded_input)

    # Compute the softmax scores
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    # Rank the scores
    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    max_pair = ('', 0)
    # Print out the ranking
    for i in range(scores.shape[0]):
        max_pair = (labels[ranking[i]], scores[ranking[i]])
        l = labels[ranking[i]]
        s = scores[ranking[i]]
    return (max_pair[0])

if __name__ == "__main__":
    text = "i hate you"
    analyze_sentiment(text)
    print("the sentiment of " + text + " is: " + analyze_sentiment(text))
    text2 = "i love you"
    print("the sentiment of " + text2 + " is: " + analyze_sentiment(text2))
