import requests
from bs4 import BeautifulSoup
import re
from modules.config import KANOON_AUTH_TOKEN

HEADERS={'authorization': f"Token {KANOON_AUTH_TOKEN}"}

def remove_text(input_string,start_constant,end_constant):
    pattern=re.escape(start_constant)+r".*?"+re.escape(end_constant)
    output_string=re.sub(pattern,'',input_string,flags=re.DOTALL)
    return output_string

def get_most_relevant_doc_id(searchquery):
    url=f'https://api.indiankanoon.org/search/?formInput={searchquery}&pagenum=0'
    try:
        response=requests.post(url,headers=HEADERS)
        response.raise_for_status()
        res=response.json()
        docs=res.get('docs',[])
        if not docs:
            print("No documents found.")
            return None

        most_relevant_doc=docs[0]
        title=most_relevant_doc.get('title','Unknown Title')
        tid=most_relevant_doc.get('tid')
        print(f"Most Relevant Document: {title} (ID: {tid})")
        return tid

    except requests.exceptions.RequestException as err:
        print(" Error while searching:",err)
        return None

def get_cleaned_document_by_id(doc_id):
    if not doc_id:
        return None

    url=f'https://api.indiankanoon.org/doc/{doc_id}/'
    try:
        response=requests.post(url,headers=HEADERS)
        response.raise_for_status()

        res=response.json()
        documenttext=res['doc']
        html_string=str(documenttext)
        escaped_string=bytes(html_string,'utf-8').decode('unicode-escape')
        soup=BeautifulSoup(escaped_string,"html.parser")
        text=soup.get_text()

        text=remove_text(text,start_constant="{'tid",end_constant="'doc': '")
        text=remove_text(text,start_constant="'numcites': ",end_constant="'courtcopy': ")
        return text.strip()

    except requests.exceptions.RequestException as err:
        print("Error fetching document:",err)
        return None

if __name__=="__main__":
    search_query="Article 360 of the Constitution of India"
    doc_id=get_most_relevant_doc_id(search_query)

    if doc_id:
        content=get_cleaned_document_by_id(doc_id)
        if content:
            print("\n Most Relevant Document Content (preview):\n")
            print(content[:3000]) 
        if not content:
            print("Could not extract document content.")
    else:
        print("No relevant document found.")
