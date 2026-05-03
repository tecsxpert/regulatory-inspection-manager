import re

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
    r'(\bOR\b|\bAND\b)\s+\d+=\d+',
    r'DROP\s+TABLE',
    r'SELECT\s+\*',
    r'INSERT\s+INTO',
    r'DELETE\s+FROM',
    r'UNION\s+SELECT',
    r"'\s*OR\s*'",
    r'1=1',
]

def sanitize_input(text: str) -> str:
    if not text:
        return ''
    # Strip HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def check_injection(text: str) -> bool:
    """Returns True if injection detected"""
    text_lower = text.lower()
    # Check prompt injection
    for phrase in INJECTION_PHRASES:
        if phrase.lower() in text_lower:
            return True
    # Check SQL injection
    for pattern in SQL_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return True
    return False