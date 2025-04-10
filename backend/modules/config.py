import os

API_KEY = os.getenv("HUGGINGFACE_API_KEY", "default_placeholder")
API_URL = os.getenv("HUGGINGFACE_API_URL", "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct")

KANOON_AUTH_TOKEN = os.getenv("KANOON_AUTH_TOKEN", "default_placeholder")
KANOON_BASE_URL = os.getenv("KANOON_BASE_URL", "https://api.indiankanoon.org/")

GROQ_KEY = os.getenv("GROQ_API_KEY", "default_placeholder")
GROQ_API_URL = os.getenv("GROQ_API_URL", "https://api.groq.com/openai/v1/chat/completions")