from modules.query import correct_legal_text
from modules.generate import get_most_relevant_doc_id, get_cleaned_document_by_id
from modules.summarize import summarize_legal_text

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
