import requests
from datetime import datetime
from modules.config import GROQ_KEY, GROQ_API_URL

headers={
    "Authorization": f"Bearer {GROQ_KEY}",
    "Content-Type": "application/json"
}

def correct_legal_text(user_input):
    print(user_input)
    system_prompt = """
                You are a legal language expert. The user will provide a brief, informal, and sometimes vague description of a legal problem.

                Your job is to:
                1. Correct all grammar, spelling, and punctuation errors.
                2. Interpret the issue and **expand it** into a detailed and formal legal grievance suitable for a court petition.
                3. Use a professional legal tone and vocabulary.
                4. Include **possible legal context, consequences, or relevant legal provisions** if obvious or implied.
                5. Avoid abbreviations. Expand all references (e.g., write "Section 138 of the Negotiable Instruments Act, 1881").
                6. Return **only the formal, structured, and expanded grievance text**. Do not include any explanations or formatting tags.

                Example:
                Input: ration card rejectd becuse name spelling mistake
                Output: The Petitioner's application for a ration card was unfairly rejected by the local authority due to a typographical error in the spelling of the name. Despite submitting valid supporting documents, including an Aadhaar card and previous records that confirm the identity of the Petitioner, the authorities failed to rectify the discrepancy or provide a reasonable resolution. This has resulted in denial of essential public distribution system benefits, violating the Petitioner’s right to food and livelihood.
                """


    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Input: {user_input}\nOutput:"}
    ]

    payload = {
        "model": "llama3-8b-8192", 
        "messages": messages,
        "temperature": 0.3,
        "max_tokens": 150
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        generated = result["choices"][0]["message"]["content"]
        return generated.strip().split('\n')[0].strip(' "\'')

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        return user_input 
    
def generate_petition(full_name, parent_info, state, issue):
    today = datetime.today().strftime('%d-%m-%Y')
    structured_issue = correct_legal_text(issue)

    petition = f"""
        IN THE HON'BLE COURT OF {state}

        PETITION NO. ___ OF {datetime.today().year}

        IN THE MATTER OF:

        {full_name}
        {parent_info}
        Resident of {state}
        ...Petitioner

        PETITION

        MOST RESPECTFULLY SHOWETH:

        1. That the Petitioner is a law-abiding citizen of India and is currently residing in the State of {state}.

        2. That the Petitioner is filing this Petition in respect of the following matter:

        "{structured_issue}"

        3. That the grievance faced by the Petitioner is genuine and deserves kind attention and relief from this Hon’ble Court.

        4. That this Hon'ble Court has jurisdiction to entertain this Petition.

        PRAYER

        In view of the above, the Petitioner most respectfully prays that this Hon'ble Court may be pleased to:

        a) Take cognizance of the matter and pass necessary directions;  
        b) Grant any other relief as deemed just and proper in the interest of justice.

        AND FOR THIS ACT OF KINDNESS, THE PETITIONER AS IN DUTY BOUND SHALL EVER PRAY.

        Place: {state}  
        Date: {today}


        {full_name}  
        (Signature of Petitioner)

        VERIFICATION

        I, {full_name}, the Petitioner above named, do hereby verify that the contents of this Petition are true and correct to my knowledge and belief.

        Verified at {state} on this {today}.
        

        {full_name}  
        (Signature)
        """
    
    return petition.strip()

def create_petition(petition_data):
    # Extract required fields from petition_data
    full_name = petition_data.get('full_name', '')
    parent_info = petition_data.get('parent_info', '')
    state = petition_data.get('state', '')
    issue = petition_data.get('issue', '')
    title = petition_data.get('title', 'Untitled Petition')
    category = petition_data.get('category', 'General')
    target = petition_data.get('target', 1000)
    deadline = petition_data.get('deadline', '30 days left')
    
    # Generate the petition text
    petition_text = generate_petition(full_name, parent_info, state, issue)
    
    # Create a result dictionary that matches frontend expected format
    result = {
        "id": int(datetime.now().timestamp()),  # Simple ID generation as integer
        "title": title,
        "description": issue,
        "category": category,
        "target": target,
        "signatures": 0,
        "deadline": deadline,
        "createdBy": full_name,
        "createdAt": "Just now",
        "status": "Active",
        "signed": False,
        "petition_text": petition_text  # Include full petition text for reference
    }
    
    print(f"Petition created in petition.py module:")
    print(f"Title: {title}")
    print(f"Category: {category}")
    print(f"Created by: {full_name}")
    print(f"State: {state}")
    
    return result
