from flask import Blueprint, jsonify
from datetime import datetime, timezone
from services.groq_client import (
    get_average_response_time,
    REDIS_AVAILABLE,
    response_times
)

health_bp = Blueprint('health', __name__)

START_TIME = datetime.now(timezone.utc)

@health_bp.route('/health', methods=['GET'])
def health():
    now = datetime.now(timezone.utc)
    uptime_seconds = (now - START_TIME).total_seconds()

    return jsonify({
        "status": "ok",
        "model": "llama-3.3-70b-versatile",
        "uptime_seconds": round(uptime_seconds, 2),
        "avg_response_time_seconds": get_average_response_time(),
        "total_requests_served": len(response_times),
        "cache_enabled": REDIS_AVAILABLE,
        "timestamp": now.isoformat()
    }), 200