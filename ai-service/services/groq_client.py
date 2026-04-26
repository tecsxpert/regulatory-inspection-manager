from groq import Groq
from dotenv import load_dotenv
import os
import json
import time
import logging
import hashlib
import redis

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Connect to Groq AI
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Connect to Redis cache
# If Redis is not running, cache is disabled — app still works
try:
    redis_client = redis.Redis(
        host=os.getenv("REDIS_HOST", "localhost"),
        port=int(os.getenv("REDIS_PORT", 6379)),
        db=0,
        decode_responses=True,
        socket_connect_timeout=2
    )
    redis_client.ping()
    REDIS_AVAILABLE = True
    logger.info("Redis cache connected successfully")
except Exception:
    redis_client = None
    REDIS_AVAILABLE = False
    logger.warning("Redis not available — caching disabled, app still works")

# Track response times for /health endpoint
response_times = []

def get_cache_key(prompt: str) -> str:
    """Creates a unique cache key from the prompt using SHA256."""
    return "ai_cache:" + hashlib.sha256(prompt.encode()).hexdigest()

def get_average_response_time() -> float:
    """Returns average AI response time in seconds."""
    if not response_times:
        return 0.0
    return round(sum(response_times) / len(response_times), 3)

def call_groq(prompt: str, temperature: float = 0.3, max_tokens: int = 1000) -> str:
    """
    Calls the Groq AI with a prompt.
    Checks Redis cache first — if found returns instantly.
    Retries up to 3 times if AI call fails.
    """
    # --- STEP 1: Check cache first ---
    if REDIS_AVAILABLE:
        try:
            cache_key = get_cache_key(prompt)
            cached = redis_client.get(cache_key)
            if cached:
                logger.info("Cache HIT — returning cached response")
                return cached
        except Exception as e:
            logger.warning(f"Cache read failed: {e}")

    # --- STEP 2: Call Groq AI ---
    retries = 3
    start_time = time.time()

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

            result = response.choices[0].message.content

            # Track response time
            elapsed = time.time() - start_time
            response_times.append(elapsed)
            # Keep only last 100 response times
            if len(response_times) > 100:
                response_times.pop(0)

            logger.info(f"Groq responded in {elapsed:.2f}s")

            # --- STEP 3: Save to cache for 15 minutes ---
            if REDIS_AVAILABLE:
                try:
                    cache_key = get_cache_key(prompt)
                    redis_client.setex(cache_key, 900, result)  # 900 seconds = 15 min
                    logger.info("Response saved to cache")
                except Exception as e:
                    logger.warning(f"Cache write failed: {e}")

            return result

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