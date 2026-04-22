from flask import Blueprint, jsonify
from datetime import datetime, timezone

health_bp = Blueprint('health', __name__)

# Records when the service started
START_TIME = datetime.now(timezone.utc)

@health_bp.route('/health', methods=['GET'])
def health():
    now = datetime.now(timezone.utc)
    uptime_seconds = (now - START_TIME).total_seconds()

    return jsonify({
        "status": "ok",
        "model": "llama-3.3-70b-versatile",
        "uptime_seconds": round(uptime_seconds, 2),
        "timestamp": now.isoformat()
    }), 200
