import requests
from modules.config import API_KEY,API_URL

headers={
    "Authorization":f"Bearer {API_KEY}",
    "Content-Type":"application/json"
}

def correct_legal_text(user_input):
    prompt=f"""
            You are a legal assistant. The user may provide a noisy or misspelled legal query.
            Your job is to:
            1. Correct grammar, spelling and spacing.
            2. Expand abbreviated legal references 
            3. Return only the corrected and expanded legal **title**, such as "Section 138 of the Negotiable Instruments Act, 1881".
            Do not include any explanation, background, or comments—return **only** the title.

            Query: {user_input}
            Corrected:
            """

    payload={
        "inputs":prompt,
        "parameters":{
            "temperature":0.3,
            "max_new_tokens":20,
            "return_full_text":False
        }
    }

    try:
        response=requests.post(API_URL,headers=headers,json=payload)
        response.raise_for_status()
        result=response.json()
        generated=result[0]["generated_text"]

        corrected_line=generated.strip().split('\n')[0].strip(' "\'')
        corrected_line=corrected_line.split('.')[0].strip()

        return corrected_line

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        return None