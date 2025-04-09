<<<<<<< Updated upstream
from modules.query import correct_legal_text
from modules.generate import get_most_relevant_doc_id, get_cleaned_document_by_id
from modules.summarize import summarize_legal_text

def run_legal_chatbot():
    while True:
        query=input("Enter your legal query (or 'exit' to quit): ")
        clean_query=correct_legal_text(query)
        if clean_query:
            print(clean_query)
        if query.lower()=='exit':
            break

        doc_id=get_most_relevant_doc_id(query)
        if doc_id:
            content=get_cleaned_document_by_id(doc_id)
            if content:
                print(content[:3000]) 
            else:
                print("Could not extract document content.")
        else:
            print("No relevant document found.")

        print("Answer: ",summarize_legal_text(content[:3000]))

if __name__=="__main__":
    run_legal_chatbot()
=======
# main.py

from modules.query import correct_legal_text
from modules.generate import IndianKanoon

def main():
    user_input = input("📥 Enter your legal query: ")
    corrected_query = correct_legal_text(user_input)

    if corrected_query:
        print("\n✅ Corrected Query:")
        print(corrected_query)

        kanoon = IndianKanoon()
        try:
            results = kanoon.search(formInput=corrected_query)
            docs = results.get("results", [])[:3]

            if not docs:
                print("🔍 No results found.")
                return

            print("\n📄 Top 3 Search Results:")
            for i, doc in enumerate(docs, 1):
                print(f"\n{i}. Title: {doc.get('title')}")
                print(f"   URL: https://indiankanoon.org{doc.get('url')}")
                print(f"   Court: {doc.get('court')}")
                print(f"   Date: {doc.get('date')}")

        except Exception as e:
            print("❌ Error fetching from Indian Kanoon:", e)
    else:
        print("❌ Could not correct the query.")

if __name__ == "__main__":
    main()
>>>>>>> Stashed changes
