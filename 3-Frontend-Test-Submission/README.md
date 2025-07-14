# 🎯 3. Frontend Test Submission – AffordMed Full Stack Evaluation

This folder contains the **React + TypeScript frontend** built as part of the Full Stack Evaluation for **Afford Medical Technologies Private Limited**.

The interface allows users to:
- Enter a long URL
- Submit to backend to generate a shortened URL
- View generated short URLs and copy/share them

---

## 🧑‍💻 Tech Stack

| Tech           | Purpose                          |
|----------------|----------------------------------|
| React          | Frontend framework               |
| TypeScript     | Static typing                    |
| Vite           | Fast build tool for React        |
| Tailwind CSS   | Styling and layout               |
| Axios          | API communication with backend   |

---

## 📁 Folder Structure

3-Frontend-Test-Submission/
├── components/ # Reusable UI components
│ ├── CreateURL.tsx # Input form for URL shortening
│ ├── Dashboard.tsx # Displays the shortened URLs
│ ├── Header.tsx # Page header
│ └── StatisticsModal.tsx # Optional analytics modal
├── services/
│ └── api.ts # Axios instance and API helpers
├── App.tsx # Root component
├── main.tsx # React entry point
├── index.html # HTML template
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.ts # Vite project setup
└── README.md # You're here!

yaml
Copy
Edit

---

## 🚀 How to Run the Frontend Locally

1. Navigate to the frontend directory:

```bash
cd 3-Frontend-Test-Submission
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Open your browser at:
http://localhost:5173

🔗 Make sure the backend server (localhost:3001) is running before testing API calls.

📸 Screenshot
<img width="100%" alt="UI Preview" src="https://github.com/user-attachments/assets/a7c56325-dc1a-4064-a3b1-72710d46df98" />
🔗 API Integration
The frontend interacts with backend endpoints like:

Method	Endpoint	Purpose
POST	/api/shorten	Submit long URL
GET	/api/:shortId	Redirect to full URL

Axios is used for sending and handling requests.
