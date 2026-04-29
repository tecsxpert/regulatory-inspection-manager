from flask import Blueprint, request, jsonify
from services.groq_client import call_groq, load_prompt, parse_json_response
from datetime import datetime, timezone
import re

describe_bp = Blueprint('describe', __name__)

def sanitize_input(text: str) -> str:
    """Remove dangerous characters to prevent prompt injection."""
    if not text:
        return ""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove common injection patterns
    dangerous = ['ignore previous', 'ignore all', 'system:', 'assistant:']
    for d in dangerous:
        text = text.lower().replace(d, '')
    return text.strip()

@describe_bp.route('/describe', methods=['POST'])
def describe():
    # Get the JSON data sent to this endpoint
    data = request.get_json()

    # Check if data exists
    if not data or 'input_data' not in data:
        return jsonify({"error": "input_data is required"}), 400

    # Clean the input
    input_data = sanitize_input(str(data['input_data']))

    # Check length
    if len(input_data) < 10:
        return jsonify({"error": "input_data is too short (minimum 10 characters)"}), 400

    if len(input_data) > 5000:
        return jsonify({"error": "input_data is too long (maximum 5000 characters)"}), 400

    # Get current time
    generated_at = datetime.now(timezone.utc).isoformat()

    # Load the prompt template and fill it in
    prompt_template = load_prompt("describe.txt")
    prompt = prompt_template.replace("{input_data}", input_data)
    prompt = prompt.replace("{generated_at}", generated_at)

    # Call the Groq AI
    raw_response = call_groq(prompt, temperature=0.3)

    # If AI failed, return a fallback response
    if raw_response is None:
        return jsonify({
            "description": "AI service temporarily unavailable.",
            "risk_level": "Unknown",
            "category": "Unknown",
            "generated_at": generated_at,
            "is_fallback": True
        }), 200

    # Parse the JSON from AI response
    result = parse_json_response(raw_response)

    # If parsing failed, return fallback
    if result is None:
        return jsonify({
            "description": "Could not parse AI response.",
            "risk_level": "Unknown",
            "category": "Unknown",
            "generated_at": generated_at,
            "is_fallback": True
        }), 200

    # Add extra fields and return
    result["generated_at"] = generated_at
    result["is_fallback"] = False
    return jsonify(result), 200