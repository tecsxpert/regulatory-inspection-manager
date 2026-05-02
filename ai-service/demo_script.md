# AI Developer 1 — Demo Script
Tool-69 Regulatory Inspection Manager
Demo Day: 9 May 2026

---

## My Speaking Part (approximately 2.5 minutes)

### Opening — Problem Statement (30 seconds)
"Regulatory inspections generate massive amounts of data.
Inspectors struggle to quickly describe findings, get 
recommendations, and produce reports. Our AI service 
solves this by analyzing inspection data instantly and 
returning professional descriptions, recommendations, 
and full reports in under 2 seconds."

---

### Architecture Explanation (30 seconds)
"Our AI microservice runs on Flask at port 5000.
It connects to Groq's LLaMA-3.3-70b model for 
AI processing. The Java Spring Boot backend calls 
our service through AiServiceClient.java. We use 
Redis for caching and ChromaDB for domain knowledge."

---

### Live AI Demo (1.5 minutes)

#### Step 1 — Show /describe
"Watch what happens when I submit an inspection record.
The AI immediately generates a professional description."

curl command to run live:
curl -X POST http://localhost:5000/describe \
-H "Content-Type: application/json" \
-d '{"input_data": "Fire safety inspection at office building. 
Extinguishers expired on floors 3 and 5. 
Emergency exit locked from inside."}'

Expected output to point out:
- description field
- risk_level: High
- category: Fire Safety
- is_fallback: false

---

#### Step 2 — Show /recommend
"Now watch the AI generate 3 specific recommendations
with priorities and timelines."

curl command to run live:
curl -X POST http://localhost:5000/recommend \
-H "Content-Type: application/json" \
-d '{"input_data": "Fire safety inspection at office building. 
Extinguishers expired on floors 3 and 5. 
Emergency exit locked from inside."}'

Expected output to point out:
- 3 recommendations
- action_type: Immediate/Short-term/Long-term
- priority: High/Medium/Low
- timeline field

---

#### Step 3 — Show /generate-report
"Finally, a complete professional inspection report
generated in under 2 seconds."

curl command to run live:
curl -X POST http://localhost:5000/generate-report \
-H "Content-Type: application/json" \
-d '{"input_data": "Fire safety inspection at office building. 
Extinguishers expired on floors 3 and 5. 
Emergency exit locked from inside."}'

Expected output to point out:
- title
- summary
- overview
- key_items (5 findings)
- recommendations (5 actions)
- compliance_status: Non-Compliant
- urgency_level: High

---

#### Step 4 — Show /health
"Our health endpoint shows the service is running,
average response time, and cache status."

curl -I http://localhost:5000/health

---

## Q&A Answers (memorize these)

Q: What AI model does it use?
A: Groq's LLaMA-3.3-70b-versatile — free tier, no credit card needed.

Q: What security measures are in place?
A: Rate limiting 30 req/min, prompt injection detection, SQL injection 
blocking, 6 OWASP security headers, input validation.

Q: What happens if the AI is unavailable?
A: Every endpoint has a fallback template that returns is_fallback: true 
so the app keeps working even without AI.

Q: How fast is it?
A: Under 2 seconds average. With Redis cache, repeated requests 
return instantly.

Q: What is ChromaDB used for?
A: It stores 10 domain knowledge documents about inspection categories 
that provide context for better AI responses.