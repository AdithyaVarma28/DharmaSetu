import fitz 
import pytesseract
from PIL import Image
import io
import requests
from config import GROQ_API_URL,GROQ_KEY

pytesseract.pytesseract.tesseract_cmd=r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_pdf(pdf_path):
    doc=fitz.open(pdf_path)
    full_text=""
    for i,page in enumerate(doc):
        pix=page.get_pixmap(dpi=200)
        img=Image.open(io.BytesIO(pix.tobytes("png")))
        text=pytesseract.image_to_string(img)
        full_text+=f"\n\n--- Page {i+1} ---\n{text}"
    return full_text

def analyze_document(text,mode='cr'):
    if mode=='cr':
        prompt=f"""
                You are a legal document analysis assistant.
                Analyze the following patent certificate for:
                1. Potential legal risks.
                2. Missing important clauses.
                3. Regulatory mismatches or compliance issues.

                Return the results clearly under three headings: Risks, Missing Clauses, Regulatory Mismatches.

                --- Document Start ---
                {text}
                --- Document End ---
                """
    elif mode=='ls':
        prompt=f"""
                You are a language simplifier AI assistant.
                Simplify the following legal document text so that a layperson can understand it.
                Avoid legal jargon and use plain English.

                --- Document Start ---
                {text}
                --- Document End ---
                """
    else:
        return "Sorry, I couldn't process the provided document."

    headers={
        "Authorization":f"Bearer {GROQ_KEY}",
        "Content-Type":"application/json"
    }

    payload={
        "model":"llama3-8b-8192",
        "messages":[
            {"role": "user", "content": prompt}
        ]
    }

    response=requests.post(GROQ_API_URL,headers=headers,json=payload)

    if response.status_code==200:
        result=response.json()
        return result['choices'][0]['message']['content']
    else:
        return f"Error: {response.text}"