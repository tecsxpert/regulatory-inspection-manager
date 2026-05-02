# Regulatory Inspection Manager

## 📌 Overview
The Regulatory Inspection Manager is a full-stack web application built using Spring Boot.  
It allows users to manage inspection records securely with authentication, database integration, and REST APIs.

The system supports creating and viewing inspections with proper validation, exception handling, and testing.

---

## 🏗️ Architecture

Frontend (HTML UI)  
↓  
Spring Boot (Controller Layer)  
↓  
Service Layer (Business Logic)  
↓  
Repository Layer (JPA)  
↓  
PostgreSQL Database  

---

## 🚀 Features

- JWT Authentication & Authorization  
- CRUD Operations (Create, Read Inspections)  
- Pagination Support  
- Global Exception Handling (404, 400, 500)  
- Email Notification Integration  
- Unit Testing (JUnit 5 + Mockito)  
- Data Seeder (30 records auto-generated)  
- Basic UI Integration (HTML + Fetch API)  

---

## 🛠️ Tech Stack

- Backend: Spring Boot (Java)  
- Database: PostgreSQL  
- Security: Spring Security + JWT  
- Testing: JUnit 5, Mockito  
- Build Tool: Maven  
- Frontend: HTML, CSS, JavaScript  

---

## ⚙️ Prerequisites

- Java 17 or above  
- Maven  
- PostgreSQL  
- Git  

---

## ▶️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/regulatory-inspection-manager.git
cd regulatory-inspection-manager/backend

---

### 2. Create Database

Run this in PostgreSQL:

CREATE DATABASE inspection_db;

---

### 3. Configure application.yml

Update your database credentials:

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/inspection_db
    username: postgres
    password: postgres

---

### 4. Run Application

mvn spring-boot:run

---

### 5. Access API

http://localhost:8081/api/inspections

---

### 6. Access UI

http://localhost:8081/index.html

---

## 📬 API Examples

### Login

POST /api/auth/login

{
  "username": "test2",
  "password": "1234"
}

---

### Get Inspections

GET /api/inspections?page=0&size=10  

Header:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImlhdCI6MTc3NzI5NzY3OCwiZXhwIjoxNzc3Mzg0MDc4fQ.v7C1jtXf-85GHXlS9YvwiC7tdoS-07zIBuYaKxbCq98

---

### Create Inspection

POST /api/inspections  

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImlhdCI6MTc3NzI5NzY3OCwiZXhwIjoxNzc3Mzg0MDc4fQ.v7C1jtXf-85GHXlS9YvwiC7tdoS-07zIBuYaKxbCq98
Content-Type: application/json  

{
  "name": "New Inspection"
}

---

## 🧪 Testing

mvn test

---

## 👨‍💻 Author

Developed as part of internship project.