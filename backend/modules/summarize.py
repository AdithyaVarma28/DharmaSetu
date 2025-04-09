import requests
from modules.config import API_KEY,API_URL

HEADERS={
    "Authorization":f"Bearer {API_KEY}",
    "Content-Type":"application/json"
}

def summarize_legal_text(raw_text: str) -> str:
    prompt=f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
            You are a legal assistant. Summarize the following legal text concisely and clearly for a general audience.
            <|start_header_id|>user<|end_header_id|>
            {raw_text}
            <|start_header_id|>assistant<|end_header_id|>"""

    payload={
        "inputs":prompt,
        "parameters":{
            "max_new_tokens":300,
            "temperature":0.5,
            "top_p":0.9,
            "return_full_text":False
        }
    }

    try:
        response=requests.post(API_URL,headers=HEADERS,json=payload)
        response.raise_for_status()
        return response.json()[0]["generated_text"].strip()
    except requests.exceptions.RequestException as err:
        return f"Error: {err}"