from flask import Flask, request, jsonify
import pinecone
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
import db_managment
from flask_cors import CORS
import json

OPENAI_KEY = "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"
PINECONE_KEY = "44fe7ea6-5f0f-456e-8430-71a33fa678b3"

app = Flask(__name__)
CORS(app)
pinecone.init(api_key=PINECONE_KEY, environment="us-west4-gcp-free")
index_name = "hackathon"
index = pinecone.Index(index_name)
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_KEY)
llm = OpenAI(temperature=0, openai_api_key=OPENAI_KEY)


@app.route('/', methods=['GET'])
def get_data():
    query = request.values["query"]
    text_key = request.values["key"]
    vec_store = Pinecone(index, embeddings.embed_query, text_key=text_key)

    code = 200
    try:
        answer = db_managment.query(vec_store, query, llm)
        response = {
            'message': answer,
            "error": ""
        }
    except Exception as e:
        code = 500
        response = {
            "message": "Something went wrong.",
            "error": str(e)
        }
    return jsonify(response), code


@app.route('/', methods=['POST'])
def add_vectors():
    request_data = json.loads(request.data)
    message = request_data["message"]
    text_key = request_data["key"]
    code = 201
    try:
        db_managment.insert(message, embeddings, index_name, text_key)
        response = {
            'message': 'added successfully',
            "error": ""
        }
    except Exception as e:
        code = 500
        response = {
            "message": "Something went wrong.",
            "error": str(e)
        }
    return jsonify(response), code


if __name__ == '__main__':
    app.run()
