from modules.query import correct_legal_text
from modules.generate import get_most_relevant_doc_id, get_cleaned_document_by_id
from modules.summarize import summarize_legal_text
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    if not query:
        return jsonify({'error': 'Query is required'}), 400

    try:
        response = run_legal_chatbot(query)
        if not response or "Error" in response:
            return jsonify({'error': 'Unable to process the query. Please try again later.'}), 500

        return jsonify({'response': response})

    except Exception as e:
        print(f"Error in chatbot processing: {e}")
        return jsonify({'error': 'An unexpected error occurred. Please try again later.'}), 500

if __name__ == '__main__':
    app.run(debug=True)

def run_legal_chatbot(query):
    clean_query = correct_legal_text(query)

    doc_id = get_most_relevant_doc_id(clean_query)
    if doc_id:
        content = get_cleaned_document_by_id(doc_id)
        if not content:
            # if content is empty
            return "No relevant content found in the document."
    else:
        # if you don't get doc_id
        return "No relevant document found for the query."

    answer = summarize_legal_text(content)

    if answer:
        return answer
    else:
        # if you don't get answer
        return "Unable to generate a summary for the document."
