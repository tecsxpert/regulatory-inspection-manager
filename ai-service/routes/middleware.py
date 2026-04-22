import re

def sanitize_input(text: str) -> tuple[bool, str]:
    """
    Cleans and validates input text.
    Returns (is_safe, cleaned_text)
    - is_safe = False means REJECT this input
    - cleaned_text = the cleaned version
    """

    if not text:
        return False, "Input cannot be empty"

    # Convert to string just in case
    text = str(text)

    # Check minimum length
    if len(text.strip()) < 10:
        return False, "Input is too short (minimum 10 characters)"

    # Check maximum length
    if len(text) > 5000:
        return False, "Input is too long (maximum 5000 characters)"

    # --- SECURITY CHECK 1: Remove HTML tags ---
    # Example attack: <script>alert('hack')</script>
    text = re.sub(r'<[^>]+>', '', text)

    # --- SECURITY CHECK 2: Detect prompt injection ---
    # These are phrases attackers use to hijack the AI
    injection_patterns = [
        'ignore previous instructions',
        'ignore all instructions',
        'ignore your instructions',
        'disregard previous',
        'forget your instructions',
        'you are now',
        'act as',
        'pretend you are',
        'system:',
        'assistant:',
        'user:',
        '###instruction',
        '[system]',
        '<system>',
    ]

    text_lower = text.lower()
    for pattern in injection_patterns:
        if pattern in text_lower:
            return False, f"Potentially unsafe input detected"

    # --- SECURITY CHECK 3: Detect SQL injection ---
    # Example attack: ' OR 1=1; DROP TABLE users;
    sql_patterns = [
        "' or ",
        "' and ",
        "1=1",
        "drop table",
        "delete from",
        "insert into",
        "select * from",
        "union select",
        "--",
        ";--",
    ]

    for pattern in sql_patterns:
        if pattern in text_lower:
            return False, "Potentially unsafe input detected"

    # All checks passed — return cleaned text
    return True, text.strip()