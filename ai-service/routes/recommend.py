from flask import Blueprint, request, jsonify
from services.groq_client import call_groq, load_prompt, parse_json_response
from datetime import datetime, timezone
import re

recommend_bp = Blueprint('recommend', __name__)

INJECTION_PHRASES = [
    'ignore previous instructions',
    'ignore all instructions',
    'tell me secrets',
    'system:',
    'assistant:',
    'forget everything',
    'new instructions',
    'disregard',
    'jailbreak',
    'bypass'
]

SQL_PATTERNS = [
    r'OR\s+1=1',
    r'DROP\s+TABLE',
    r'SELECT\s+\*',
    r'INSERT\s+INTO',
    r'DELETE\s+FROM',
    r'UNION\s+SELECT',
    r"'\s*OR\s*'",
]

def check_injection(text: str) -> bool:
    text_lower = text.lower()
    for phrase in INJECTION_PHRASES:
        if phrase.lower() in text_lower:
            return True
    for pattern in SQL_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return True
    return False

def sanitize_input(text: str) -> str:
    if not text:
        return ''
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

@recommend_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()

    if not data or 'input_data' not in data:
        return jsonify({"error": "input_data is required"}), 400

    input_data = sanitize_input(str(data['input_data']))

    if len(input_data) < 10:
        return jsonify({"error": "input_data is too short (minimum 10 characters)"}), 400

    if len(input_data) > 5000:
        return jsonify({"error": "input_data is too long (maximum 5000 characters)"}), 400

    if check_injection(input_data):
        return jsonify({"error": "Invalid input detected"}), 400

    generated_at = datetime.now(timezone.utc).isoformat()

    prompt_template = load_prompt("recommend.txt")
    prompt = prompt_template.replace("{input_data}", input_data)
    prompt = prompt.replace("{generated_at}", generated_at)

    raw_response = call_groq(prompt, temperature=0.3)

    if raw_response is None:
        return jsonify({
            "recommendations": [],
            "generated_at": generated_at,
            "is_fallback": True
        }), 200

    result = parse_json_response(raw_response)

    if result is None:
        return jsonify({
            "recommendations": [],
            "generated_at": generated_at,
            "is_fallback": True
        }), 200

    result["generated_at"] = generated_at
    result["is_fallback"] = False
    return jsonify(result), 200