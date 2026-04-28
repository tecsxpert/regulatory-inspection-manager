# AI Service — Tool-69 Regulatory Inspection Manager
Tool-69 | AI Developer 1 | Sprint: 14 April – 9 May 2026

## Overview
This is the AI microservice for the Regulatory Inspection Manager. 
It uses Flask and Groq (LLaMA-3.3-70b) to provide AI-powered 
inspection descriptions, recommendations, and reports.

## Tech Stack
- Python 3.11
- Flask 3.0.3
- Groq API (LLaMA-3.3-70b-versatile)
- Redis (optional cache)
- flask-limiter (rate limiting)

## Prerequisites
- Python 3.11+
- pip
- Groq API key (free at console.groq.com)

## Setup

### 1. Clone the repository
git clone [repository URL]
cd regulatory-inspection-manager/ai-service

### 2. Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

### 3. Install dependencies
pip install -r requirements.txt

### 4. Create .env file
Copy .env.example to .env and fill in your values:
GROQ_API_KEY=your_groq_api_key_here
REDIS_HOST=localhost
REDIS_PORT=6379

### 5. Run the service
python app.py

The service will start on http://localhost:5000

---

## API Reference

### GET /health
Returns service status, uptime, and average response time.

**Response:**
{
  "status": "ok",
  "model": "llama-3.3-70b-versatile",
  "uptime_seconds": 120.5,
  "avg_response_time_seconds": 1.8,
  "total_requests_served": 10,
  "cache_enabled": false,
  "timestamp": "2026-04-28T..."
}

---

### POST /describe
Returns an AI-generated description of an inspection.

**Request:**
{
  "input_data": "Food safety inspection at restaurant. 
  Expired items found in fridge."
}

**Response:**
{
  "description": "A food safety inspection was conducted...",
  "risk_level": "High",
  "category": "Food Safety Inspection",
  "compliance_status": "Non-Compliant",
  "generated_at": "2026-04-28T...",
  "is_fallback": false
}

---

### POST /recommend
Returns 3 AI-generated recommendations for an inspection.

**Request:**
{
  "input_data": "Fire safety inspection. Missing extinguishers. 
  Exits blocked."
}

**Response:**
{
  "recommendations": [
    {
      "action_type": "Immediate",
      "description": "Install fire extinguishers on all floors",
      "priority": "High",
      "timeline": "Within 24 hours"
    }
  ],
  "generated_at": "2026-04-28T...",
  "is_fallback": false
}

---

### POST /generate-report
Returns a full structured AI inspection report.

**Request:**
{
  "input_data": "Environmental inspection at factory. 
  Waste water exceeding limits."
}

**Response:**
{
  "title": "Environmental Compliance Inspection Report",
  "summary": "Executive summary...",
  "overview": "Detailed overview...",
  "key_items": ["Finding 1", "Finding 2", "Finding 3"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "compliance_status": "Non-Compliant",
  "urgency_level": "High",
  "generated_at": "2026-04-28T...",
  "is_fallback": false
}

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| GROQ_API_KEY | Groq API key from console.groq.com | Required |
| REDIS_HOST | Redis server hostname | localhost |
| REDIS_PORT | Redis server port | 6379 |

---

## Security
- Rate limiting: 30 requests/minute per IP
- Input validation: min 10, max 5000 characters
- Prompt injection detection
- SQL injection detection
- XSS protection
- Security headers on all responses

See SECURITY.md for full security documentation.

---

## Project Structure
ai-service/
├── routes/
│   ├── describe.py
│   ├── recommend.py
│   ├── report.py
│   ├── health.py
│   └── middleware.py
├── services/
│   └── groq_client.py
├── prompts/
│   ├── describe.txt
│   ├── recommend.txt
│   └── report.txt
├── tests/
│   └── test_endpoints.py
├── app.py
├── requirements.txt
├── SECURITY.md
├── prompt_testing.md
└── .env.example