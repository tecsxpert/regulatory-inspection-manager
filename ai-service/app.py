from flask import Flask, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from middleware import validate_input

app = Flask(__name__)

# Rate limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["30 per minute"]
)

# Middleware
@app.before_request
def security_middleware():
    if app.request_class.method == "POST":
        response = validate_input()
        if response:
            return response


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


@app.route("/")
def home():
    return jsonify({
        "message": "AI Service Running"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
