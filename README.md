<div align="center">

# 🧠 HireSight-AI

**AI-Powered Recruitment Intelligence Platform**  
Automate resume screening, extract candidate insights, and rank applicants instantly using AI.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-FF6B35?style=flat-square)](https://groq.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://hire-sight-ai-sigma.vercel.app/)

<br>

[🌐 Live Demo](https://hire-sight-ai-sigma.vercel.app/) &nbsp;•&nbsp; [🐛 Report Bug](https://github.com/farhankhan0986/HireSight-AI/issues) &nbsp;•&nbsp; [✨ Request Feature](https://github.com/farhankhan0986/HireSight-AI/issues)

</div>

---

## 📖 About

**HireSight-AI** is an AI-powered recruitment intelligence platform that automates the early stages of candidate screening.  
Recruiters typically spend hours reviewing hundreds of resumes manually. HireSight eliminates this bottleneck by using Groq LLMs (LLaMA models) to analyze uploaded resumes, extract structured candidate information, and generate objective match scores against job requirements.

Instead of manually filtering candidates, recruiters instantly receive an AI-ranked pipeline highlighting the most relevant candidates.  
Both recruiters and applicants get dedicated dashboards for a seamless hiring workflow.

---

## 🚩 Why HireSight-AI?

- 🤖 **AI Resume Parsing** — Extract skills, tools, education, and experience automatically
- 📊 **Candidate Match Scoring** — AI ranks candidates based on job relevance
- ⚡ **Faster Hiring Decisions** — Reduce hours of manual screening
- 👥 **Dual User System** — Separate recruiter & candidate dashboards
- 🔒 **Secure Authentication** — Role-based access with JWT / NextAuth

---

## ✨ Features

| Feature                    | Description                                                      |
|----------------------------|------------------------------------------------------------------|
| 🤖 AI Resume Parsing       | Upload PDF resumes and extract structured candidate data         |
| 📊 Match Scoring           | AI compares extracted skills with job requirements               |
| 📂 Recruiter Dashboard     | View and filter applicants, ranked by AI match percentage        |
| 🧑‍💼 Candidate Portal      | Browse & apply to jobs instantly                                 |
| 📄 Resume Upload           | Supports PDF parsing and skill extraction                        |
| 🔐 Authentication          | Secure login & role-based access (Recruiter/Candidate)           |
| 📱 Responsive Interface    | Modern dashboard UI, optimized for mobile and desktop            |

---

## 🛠️ Tech Stack

### Frontend
| Technology     | Purpose                        |
|----------------|-------------------------------|
| **Next.js 15** | Full-stack React framework     |
| **React**      | Component-based UI library     |
| **Tailwind CSS** | Utility-first styling        |
| **Framer Motion** | UI animations              |
| **Lucide Icons** | Iconography                  |

### Backend
| Technology         | Purpose                            |
|--------------------|------------------------------------|
| **Next.js API Routes** | Backend logic                  |
| **Node.js**        | Runtime environment                |
| **MongoDB Atlas**  | NoSQL database                     |
| **Mongoose**       | MongoDB ODM                        |
| **Groq API**       | AI resume analysis (LLaMA 3.3)     |
| **NextAuth / JWT** | Authentication & session handling  |

---

## 📁 Project Structure

```
hiresight-ai/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── jobs/
│   │   ├── applications/
│   │   └── ai/
│   ├── dashboard/
│   ├── jobs/
│   ├── login/
│   ├── register/
│   └── page.jsx
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── CandidateCard.jsx
│   └── DashboardLayout.jsx
├── lib/
│   ├── db.js
│   ├── groq.js
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Job.js
│   └── Application.js
├── public/
├── styles/
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Groq API Key](https://console.groq.com) _(get your API key here)_

### 1️⃣ Clone the repository

```bash
git clone https://github.com/farhankhan0986/HireSight-AI.git
cd HireSight-AI
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
GROQ_API_KEY=your_groq_api_key
```

### 4️⃣ Run the development server

```bash
npm run dev
```
Go to [http://localhost:3000](http://localhost:3000) and explore!

---

## 🔌 API Overview

### Authentication

| Method | Endpoint           | Description        |
|--------|--------------------|-------------------|
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | User login         |
| GET    | `/api/auth/session`  | Get session        |

### Jobs

| Method | Endpoint       | Description         |
|--------|----------------|--------------------|
| POST   | `/api/jobs`      | Create job posting  |
| GET    | `/api/jobs`      | Fetch all jobs      |
| GET    | `/api/jobs/:id`  | Job details         |

### Applications

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/apply`           | Apply to job              |
| GET    | `/api/applications`    | View applicants           |

### AI Resume Processing

| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| POST   | `/api/ai/analyze`      | Extract resume data           |
| POST   | `/api/ai/match`        | Generate candidate match score|

---

## 🌐 Deployment

**Frontend:** Vercel (Recommended)
- Connect your GitHub repo to Vercel
- Framework: Next.js
- Add environment variables in Vercel Dashboard

**Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [Railway](https://railway.app), or [Render](https://render.com)

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** this repository
2. **Create Feature Branch**: `git checkout -b feature/feature-name`
3. **Commit** your changes: `git commit -m 'Add awesome feature'`
4. **Push** to branch: `git push origin feature/feature-name`
5. **Open Pull Request**

---

## 📄 License

ISC License

---

## 👤 Author

**Farhan Abid**  
- 📧 Email: [farhankhan080304@gmail.com](mailto:farhankhan080304@gmail.com)  
- 🐙 [GitHub: @farhankhan0986](https://github.com/farhankhan0986)

---

<div align="center">

**If you found this project helpful, please consider giving it a ⭐**

_Built with ❤️ by Farhan Abid_

</div>
