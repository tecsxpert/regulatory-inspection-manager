import re
from flask import request, jsonify
import bleach

# Prompt injection keywords
PROMPT_INJECTION_PATTERNS = [
    "ignore previous instructions",
    "reveal secrets",
    "system prompt",
    "bypass security",
    "pretend to be",
]

# SQL injection patterns
SQL_INJECTION_PATTERNS = [
    "drop table",
    "select * from",
    "' or 1=1",
    "--",
    ";"
]


def validate_input():
    data = request.get_json()

    if not data or "input" not in data:
        return jsonify({
            "success": False,
            "error": "Input field required"
        }), 400

    user_input = data["input"]

    # Empty input check
    if not user_input.strip():
        return jsonify({
            "success": False,
            "error": "Input cannot be empty"
        }), 400

    # Length check
    if len(user_input) > 5000:
        return jsonify({
            "success": False,
            "error": "Input exceeds 5000 characters"
        }), 400

    # Strip HTML tags
    cleaned_input = bleach.clean(user_input, tags=[], strip=True)

    lower_input = cleaned_input.lower()

    # Prompt injection detection
    for pattern in PROMPT_INJECTION_PATTERNS:
        if pattern in lower_input:
            return jsonify({
                "success": False,
                "error": "Prompt injection detected"
            }), 400

    # SQL injection detection
    for pattern in SQL_INJECTION_PATTERNS:
        if pattern in lower_input:
            return jsonify({
                "success": False,
                "error": "SQL injection detected"
            }), 400

    request.cleaned_input = cleaned_input
