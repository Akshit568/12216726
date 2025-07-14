# Short URL Microservice 
Live Demo: https://12216726.vercel.app/
## 📸 Screenshots

### Dashboard View


<img width="1918" height="917" alt="Screenshot 2025-07-14 125512" src="https://github.com/user-attachments/assets/a7c56325-dc1a-4064-a3b1-72710d46df98" />


---

## 📁 Folder Breakdown

### 1️⃣ `1-Logging-Middleware/`

> Contains the custom Express middleware for request logging.

- Logs HTTP method, URL, and timestamp
- Helps monitor API calls in real-time
- Simple and reusable for any Node.js app

📄 Includes a usage demo and documentation in the README inside the folder.

---

### 2️⃣ `2-Backend-Test-Submission/`

> Backend built with **Node.js** and **Express.js**

- Exposes RESTful endpoints
- Handles URL shortening (or test logic as per challenge)
- Implements the logging middleware
- Follows modular code structure with routes, services, and middleware

📦 Includes `server.js`, `routes/`, and `services/` folders.

🔧 Use `npm install` and `node server.js` to start the backend on port **3001**.

---

### 3️⃣ `3-Frontend-Test-Submission/`

> Frontend built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**

- Clean and modern UI for interacting with the backend
- Components like `Dashboard`, `Header`, `StatisticsModal`, and `CreateURL`
- Fully responsive and styled using Tailwind
- Axios used for API communication

🖥️ Run using:
```bash
npm install
npm run dev


| Area     | Stack                                 |
| -------- | ------------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend  | Node.js, Express.js, CORS             |
| Tools    | Git, GitHub, Postman                  |










