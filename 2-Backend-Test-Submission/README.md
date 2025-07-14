# ⚙️ 2. Backend Test Submission – AffordMed Full Stack Evaluation

This folder contains the **Node.js + Express.js backend** developed as part of the Full Stack Evaluation for **Afford Medical Technologies Private Limited**.

It handles:
- URL shortening logic
- Routing and API endpoints
- Request logging using custom middleware

---

## 📁 Project Structure
2-Backend-Test-Submission/
├── middleware/
│ └── logger.js # Custom logging middleware
├── models/
│ └── urlModel.js # URL schema/model (if using a database)
├── routes/
│ └── urlRoutes.js # API routes for URL operations
├── server.js # Main backend server entry point
└── README.md # Project documentation


---

## 🔧 Technologies Used

| Technology     | Purpose                             |
|----------------|-------------------------------------|
| Node.js        | Backend runtime                     |
| Express.js     | Server framework                    |
| CORS           | Cross-origin request handling       |
| Custom Middleware | Logs all incoming HTTP requests |

---

## 🛠️ Setup & Run Instructions

1. **Navigate to the backend folder:**

```bash
cd 2-Backend-Test-Submission

Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
node server.js
Server runs at: http://localhost:3001
 API Endpoints
Method	Route	Description
POST	/api/shorten	Create a shortened URL
GET	/api/:shortId	Redirect to original URL

💡 These endpoints are designed to be consumed by the frontend or tested via Postman.
🛡️ Logging Middleware
This project integrates a custom Express middleware from the 1-Logging-Middleware folder to log every incoming request:

js
Copy
Edit
const logger = require('./middleware/logger');
app.use(logger);
It logs:

HTTP Method (GET, POST, etc.)

Request Path (/api/shorten)

Timestamp

🧪 Test with Postman
Here’s a sample POST request to test the URL shortener:

bash
Copy
Edit
curl -X POST http://localhost:3001/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com"}'








