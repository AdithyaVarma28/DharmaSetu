import os
import logging
from werkzeug.utils import secure_filename
from modules.query import correct_legal_text
from modules.generate import get_most_relevant_doc_id, get_cleaned_document_by_id
from modules.summarize import summarize_legal_text
from flask import Flask, request, jsonify
from flask_cors import CORS 
from modules.ocr import analyze_document
from modules.petition import generate_petition
from modules.config import GROQ_KEY, GROQ_API_URL

app = Flask(__name__)
CORS(app) 

# Configure logging
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

# Create uploads directory if it doesn't exist
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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

@app.route('/api/upload_file', methods=['POST'])
def api_upload_file():
    if 'file' not in request.files or 'mode' not in request.form:
        return jsonify({'error': 'File and mode are required'}), 400

    file = request.files['file']
    mode = request.form['mode']

    if mode not in ['ls', 'cr']:
        return jsonify({'error': 'Invalid mode. Use "ls" or "cr".'}), 400

    if file and file.filename:
        # Save file locally
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        try:
            # Determine file type and extract text accordingly
            file_ext = os.path.splitext(filename)[1].lower()
            
            if file_ext == '.pdf':
                from modules.ocr import extract_text_from_pdf
                file_content = extract_text_from_pdf(file_path)
            else:
                # Assume it's a text file
                from modules.ocr import extract_text_from_text_file
                file_content = extract_text_from_text_file(file_path)
            
            # Process the file content
            result = analyze_document(file_content, mode)
            
            return jsonify({
                'result': result,
                'file_path': file_path
            })
        except Exception as e:
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500
    else:
        return jsonify({'error': 'File upload failed'}), 400

@app.route('/api/petitions', methods=['POST'])
def create_petition():
    try:
        data = request.json
        print("Incoming petition details:", data)  # Log the incoming petition details

        required_fields = ["full_name", "parent_info", "state", "issue"]
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Use the create_petition function from petition.py
        from modules.petition import create_petition as generate_petition_obj
        created_petition = generate_petition_obj(data)
        
        # Log the formatted petition that will be sent to frontend
        print("Formatted petition for frontend:", created_petition)

        return jsonify(created_petition), 201
    except Exception as e:
        return jsonify({'error': f'Error creating petition: {str(e)}'}), 500

@app.errorhandler(Exception)
def handle_exception(e):
    """Handle unexpected errors and return a JSON response."""
    logging.error(f"An unexpected error occurred: {str(e)}", exc_info=True)
    return jsonify({'error': 'An unexpected error occurred. Please try again later.'}), 500

if __name__ == '__main__':
    app.run(debug=True)