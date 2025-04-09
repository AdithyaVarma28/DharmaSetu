import requests
from config import GROQ_KEY,GROQ_API_URL

HEADERS = {
    "Authorization": f"Bearer {GROQ_KEY}",
    "Content-Type": "application/json"
}

def summarize_legal_text(user_text: str, raw_text: str = "") -> str:
    system_prompt = (
        "You are a legal assistant. Answer the user's legal query clearly and concisely. "
        "Use the background legal text only if it helps clarify or support the answer."
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"User Question: {user_text}"},
    ]

    if raw_text.strip():
        messages.append({
            "role": "user",
            "content": f"Background Legal Text (optional): {raw_text}"
        })

    payload = {
        "model": "llama3-70b-8192",
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 300,
        "top_p": 0.9,
    }

    try:
        response = requests.post(GROQ_API_URL, headers=HEADERS, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"].strip()
    except requests.exceptions.RequestException as err:
        return f"Error: {err}"