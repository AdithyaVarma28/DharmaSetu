from modules.query import correct_legal_text
from modules.generate import get_most_relevant_doc_id, get_cleaned_document_by_id
from modules.summarize import summarize_legal_text
from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

def run_legal_chatbot(query, module="legal-assistant"):
    clean_query = correct_legal_text(query)

    content=""

    if module == "case-predictor":
        doc_id = get_most_relevant_doc_id(clean_query)
        if doc_id:
            content = get_cleaned_document_by_id(doc_id)
            if not content:
                content = ""
        else:
            content = ""

        if content:
            query += f"\n\nRelevant Case:\n{content}"

    query+=". Can you also give me a relavent case"
    
    answer = summarize_legal_text(query,content)

    if answer:
        return answer
    else:
        return "Sorry, I couldn't find an answer to your question."

@app.route('/api/correct_query', methods=['POST'])
def api_correct_query():
    data = request.json
    query = data.get('query', '')
    if not query:
        return jsonify({'error': 'Query is required'}), 400

    corrected_query = correct_legal_text(query)
    return jsonify({'corrected_query': corrected_query})

@app.route('/api/summarize', methods=['POST'])
def api_summarize():
    data = request.json
    content = data.get('content', '')
    if not content:
        return jsonify({'error': 'Content is required'}), 400

    summary = summarize_legal_text(content)
    return jsonify({'summary': summary})

@app.route('/api/run_chatbot', methods=['POST'])
def api_run_chatbot():
    data = request.json
    query = data.get('query', '')
    module = data.get('module', 'legal-assistant')

    if not query:
        return jsonify({'error': 'Query is required'}), 400

    response = run_legal_chatbot(query, module)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)


