from flask import Blueprint, request, jsonify
from services.groq_client import call_groq, load_prompt, parse_json_response
from datetime import datetime, timezone
import re

report_bp = Blueprint('report', __name__)

def sanitize_input(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'<[^>]+>', '', text)
    dangerous = ['ignore previous', 'ignore all', 'system:', 'assistant:']
    for d in dangerous:
        text = text.lower().replace(d, '')
    return text.strip()

@report_bp.route('/generate-report', methods=['POST'])
def generate_report():
    data = request.get_json()

    if not data or 'input_data' not in data:
        return jsonify({"error": "input_data is required"}), 400

    input_data = sanitize_input(str(data['input_data']))

    if len(input_data) < 10:
        return jsonify({"error": "input_data is too short (minimum 10 characters)"}), 400

    if len(input_data) > 5000:
        return jsonify({"error": "input_data is too long (maximum 5000 characters)"}), 400

    generated_at = datetime.now(timezone.utc).isoformat()

    prompt_template = load_prompt("report.txt")
    prompt = prompt_template.replace("{input_data}", input_data)
    prompt = prompt.replace("{generated_at}", generated_at)

    raw_response = call_groq(prompt, temperature=0.4, max_tokens=2000)

    if raw_response is None:
        return jsonify({
            "title": "Report Unavailable",
            "summary": "AI service temporarily unavailable.",
            "overview": "",
            "key_items": [],
            "recommendations": [],
            "generated_at": generated_at,
            "is_fallback": True
        }), 200

    result = parse_json_response(raw_response)

    if result is None:
        return jsonify({
            "title": "Parse Error",
            "summary": "Could not parse AI response.",
            "overview": "",
            "key_items": [],
            "recommendations": [],
            "generated_at": generated_at,
            "is_fallback": True
        }), 200

    result["generated_at"] = generated_at
    result["is_fallback"] = False
    return jsonify(result), 200