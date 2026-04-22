from groq import Groq
from dotenv import load_dotenv
import os
import json
import time
import logging

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_groq(prompt: str, temperature: float = 0.3, max_tokens: int = 1000) -> str:
    """
    Calls the Groq AI with a prompt.
    Retries up to 3 times if it fails.
    """
    retries = 3

    for attempt in range(retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content

        except Exception as e:
            logger.error(f"Groq call failed on attempt {attempt + 1}: {e}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                return None


def load_prompt(filename: str) -> str:
    """Loads a prompt template from the prompts/ folder."""
    prompt_path = os.path.join("prompts", filename)
    with open(prompt_path, "r") as f:
        return f.read()


def parse_json_response(text: str) -> dict:
    """Safely parses JSON from the AI response."""
    try:
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        return json.loads(text.strip())
    except Exception as e:
        logger.error(f"JSON parse failed: {e}")
        return None