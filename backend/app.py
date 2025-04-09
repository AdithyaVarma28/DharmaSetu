from modules.query import correct_legal_text
from modules.generate import get_most_relevant_doc_id, get_cleaned_document_by_id
from modules.summarize import summarize_legal_text

def run_legal_chatbot():
    while True:
        query=input("Enter your legal query (or 'exit' to quit): ")
        clean_query=correct_legal_text(query)
        if query.lower()=='exit':
            break

        doc_id=get_most_relevant_doc_id(clean_query)
        if doc_id:
            content=get_cleaned_document_by_id(doc_id)
            if not content:
                print("Could not extract document content.")
        else:
            print("No relevant document found.")

        print("Answer: ",summarize_legal_text(content))

if __name__=="__main__":
    run_legal_chatbot()
