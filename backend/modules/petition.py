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
You are a legal language expert. The user will provide a brief or informal description of a legal problem, which may contain spelling errors, grammatical issues, or be poorly structured.

Your job is to:
1. Correct all grammar, spelling, and punctuation errors.
2. Convert the informal issue into a formal, structured legal grievance suitable for a court petition.
3. Avoid abbreviations. Expand all references (e.g., write "Section 138 of the Negotiable Instruments Act, 1881").
4. Return only the structured and corrected issue in formal legal tone.
5. Do not include any explanation, comments, or formatting tags.

Example:
Input: ration card rejectd becuse name spelling mistake
Output: The Petitioner's application for a ration card was unjustly rejected due to a typographical error in the name, despite providing valid identification documents.
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

def search_petitions(query):
    """
    Placeholder function for search functionality.
    Replace with actual implementation to query petitions.
    """
    print(f"Searching for petitions with query: {query}")
    # Implement search logic here
    return []

if __name__ == "__main__":
    # Prompt user for petition details
    full_name = input("Enter your full name: ")
    parent_info = input("Enter parent/guardian information: ")
    state = input("Enter your state: ")
    issue = input("Describe your issue: ")

    # Generate and display the petition
    petition_text = generate_petition(full_name, parent_info, state, issue)
    print("\nGenerated Petition:\n")
    print(petition_text)

    # Example usage of search functionality
    search_query = input("\nEnter a search query for petitions: ")
    search_results = search_petitions(search_query)
    print(f"Search Results: {search_results}")
