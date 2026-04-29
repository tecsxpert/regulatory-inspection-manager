# Prompt Testing Results — Day 2
Tool-69 | AI Developer 1 | Sprint: 14 April – 9 May 2026

## Objective
Test all 3 prompt templates with 5 real inspection scenarios each.
Target: All outputs scoring 7/10 or higher before proceeding.

---

## Primary Prompt: POST /describe

### Test 1: Food Safety Inspection
**Input:**
Food safety inspection at downtown restaurant. Found expired dairy 
products in walk-in cooler. Kitchen staff not wearing hairnets. 
Handwashing sink blocked by boxes. Temperature logs missing for 2 weeks.

**Output:**
- description: Professional 2-3 sentence description of food safety violations
- risk_level: Critical
- category: Food Safety Inspection
- compliance_status: Non-Compliant

**Score: 9/10** ✅

---

### Test 2: Fire Safety Inspection
**Input:**
Fire safety inspection at 10-story office building. Fire extinguishers 
on floors 3 and 5 are expired. Emergency exit on floor 2 locked from 
inside. Fire alarm last tested 18 months ago.

**Output:**
- description: Clear description of fire safety violations found
- risk_level: High
- category: Fire Safety
- compliance_status: Non-Compliant

**Score: 9/10** ✅

---

### Test 3: Environmental Inspection
**Input:**
Environmental inspection at manufacturing plant. Chemical waste stored 
near storm drains. No secondary containment for fuel tanks. Air 
filtration system not maintained for 6 months.

**Output:**
- description: Detailed environmental compliance issues identified
- risk_level: High
- category: Environmental Compliance
- compliance_status: Non-Compliant

**Score: 8/10** ✅

---

### Test 4: Building Safety Inspection
**Input:**
Building safety inspection at apartment complex. Structural cracks in 
load-bearing walls on floors 4 and 5. Elevator last inspected 3 years 
ago. Balcony railings on units 201-210 are loose.

**Output:**
- description: Serious structural and safety deficiencies identified
- risk_level: Critical
- category: Building Safety
- compliance_status: Non-Compliant

**Score: 9/10** ✅

---

### Test 5: Health and Safety Inspection
**Input:**
Health and safety inspection at construction site. Workers not wearing 
hard hats or safety boots. Scaffolding on north side missing guardrails. 
First aid kit empty. No safety briefing records found.

**Output:**
- description: Multiple health and safety violations identified
- risk_level: High
- category: Health & Safety
- compliance_status: Non-Compliant

**Score: 8/10** ✅

---

## Primary Prompt: POST /recommend

### Test 1: Food Safety
**Input:** School cafeteria with cockroach infestation, refrigerator 
at wrong temperature, staff missing certifications.

**Output:** 3 recommendations with action_type, description, priority, timeline
**Score: 9/10** ✅

### Test 2: Fire Safety
**Input:** Hospital with no fire suppression in oxygen room, 
emergency lighting not working, fire doors propped open.

**Output:** 3 specific actionable recommendations
**Score: 8/10** ✅

### Test 3: Environmental
**Input:** Factory with waste water exceeding permitted levels, 
no spill containment plan, missing safety labels.

**Output:** 3 prioritized recommendations with timelines
**Score: 8/10** ✅

### Test 4: Building Safety
**Input:** Shopping mall with ventilation issues, structural concerns, 
broken fire exits, generator not tested.

**Output:** 3 detailed recommendations
**Score: 9/10** ✅

### Test 5: Health & Safety
**Input:** Pharmaceutical warehouse with temperature issues, 
expired forklift certificates, improper chemical storage.

**Output:** 3 clear actionable recommendations
**Score: 8/10** ✅

---

## Primary Prompt: POST /generate-report

### Test 1: Environmental Report
**Input:** Chemical factory with waste water violations, 
missing containment plan, untrained workers.

**Output:** Full structured report with title, summary, overview, 
key_items (5), recommendations (5), compliance_status, urgency_level
**Score: 9/10** ✅

### Test 2: Building Safety Report
**Input:** Shopping mall with ventilation, structural, 
fire exit, and generator issues.

**Output:** Comprehensive professional report
**Score: 8/10** ✅

### Test 3: Health & Safety Report
**Input:** Pharmaceutical warehouse with multiple violations.

**Output:** Detailed report with all required fields
**Score: 9/10** ✅

### Test 4: Food Safety Report
**Input:** Restaurant with expired food, missing temperature logs,
staff hygiene violations.

**Output:** Professional inspection report
**Score: 8/10** ✅

### Test 5: Fire Safety Report
**Input:** Office building with expired extinguishers,
locked exits, untested alarm system.

**Output:** Comprehensive fire safety report
**Score: 9/10** ✅

---

## Summary

| Endpoint | Tests Run | Avg Score | Pass? |
|----------|-----------|-----------|-------|
| POST /describe | 5 | 8.6/10 | ✅ |
| POST /recommend | 5 | 8.4/10 | ✅ |
| POST /generate-report | 5 | 8.6/10 | ✅ |

**All prompts scoring above 7/10 threshold — ready for production** ✅