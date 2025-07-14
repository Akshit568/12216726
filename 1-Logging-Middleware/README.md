# 🛡️ 1. Logging Middleware – AffordMed Full Stack Evaluation

This folder contains a **custom Express middleware** designed for logging all incoming HTTP requests. It is developed as part of the Full Stack assignment for **Afford Medical Technologies Private Limited**.

---
## 🔍 Functionality

The logging middleware automatically logs the following details for each incoming request:

- **HTTP Method** (e.g. `GET`, `POST`)
- **Request URL** (e.g. `/api/shorten`, `/dashboard`)
- **Timestamp** (in ISO 8601 format)

This helps track API usage and debug backend behavior easily.

---

### 📦 Example Log Output

[2025-07-14T13:24:05.456Z] GET /api/url
[2025-07-14T13:24:06.812Z] POST /api/shorten
[2025-07-14T13:24:07.139Z] GET /dashboard


