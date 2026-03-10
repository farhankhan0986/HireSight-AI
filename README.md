<div align="center">
🧠 HireSight-AI

AI-Powered Recruitment Intelligence Platform

Automate resume screening, extract candidate insights, and rank applicants instantly using AI.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-FF6B35?style=flat-square)](https://groq.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://promptforge-blush.vercel.app)

[Live Demo](https://hire-sight-ai-sigma.vercel.app/) · [Report Bug](https://github.com/farhankhan0986/HireSight-AI/issues) · [Request Feature](https://github.com/farhankhan0986/HireSight-AI/issues)

</div>

📖 About

HireSight-AI is an AI-powered recruitment intelligence platform that automates the early stages of candidate screening.

Recruiters typically spend hours reviewing hundreds of resumes manually. HireSight eliminates this bottleneck by using Groq LLMs (LLaMA models) to analyze uploaded resumes, extract structured candidate information, and generate objective match scores against job requirements.

Instead of manually filtering candidates, recruiters receive an AI-ranked applicant pipeline that highlights the most relevant candidates instantly.

The platform also provides dedicated dashboards for recruiters and candidates, creating a seamless application and hiring workflow.

Why HireSight-AI?

🤖 AI Resume Parsing — Extract skills, tools, education, and experience automatically

📊 Candidate Match Scoring — AI ranks candidates based on job relevance

⚡ Faster Hiring Decisions — Reduce hours of manual screening

👥 Dual User System — Separate recruiter & candidate dashboards

🔒 Secure Authentication — Role-based access with JWT / NextAuth

✨ Features
Feature	Description
🤖 AI Resume Parsing	Upload PDF resumes and extract structured candidate data using Groq LLM
📊 Candidate Match Scoring	AI compares extracted skills with job requirements
📂 Recruiter Dashboard	View applicants, ranked by AI match percentage
🧑‍💼 Candidate Portal	Browse jobs and apply instantly
📄 Resume Upload System	Supports PDF parsing and skill extraction
🔐 Authentication System	Secure login and role-based access
📱 Responsive Interface	Modern dashboard UI for recruiters and candidates
🛠️ Tech Stack
Frontend
Technology	Purpose
Next.js 15
	Full-stack React framework
React
	UI library
Tailwind CSS
	Utility-first styling
Framer Motion
	UI animations
Lucide Icons
	Icon library
Backend
Technology	Purpose
Next.js API Routes
	Backend logic
Node.js
	Runtime environment
MongoDB Atlas
	NoSQL database
Mongoose
	MongoDB ODM
Groq API
	AI resume analysis
NextAuth / JWT
	Authentication
📁 Project Structure
hiresight-ai/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── jobs/
│   │   ├── applications/
│   │   └── ai/
│   │
│   ├── dashboard/
│   ├── jobs/
│   ├── login/
│   ├── register/
│   └── page.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── CandidateCard.jsx
│   └── DashboardLayout.jsx
│
├── lib/
│   ├── db.js
│   ├── groq.js
│   └── auth.js
│
├── models/
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── public/
│
├── styles/
│
└── README.md
🚀 Getting Started
Prerequisites

Node.js 18+

MongoDB Atlas database

Groq API Key

Get Groq API key:

https://console.groq.com
1️⃣ Clone Repository
git clone https://github.com/farhankhan0986/HireSight-AI.git

cd HireSight-AI
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables

Create .env.local

MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_secret

GROQ_API_KEY=your_groq_api_key
4️⃣ Run Development Server
npm run dev

Application will run at:

http://localhost:3000
🔌 API Overview
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login
GET	/api/auth/session	Get session
Jobs
Method	Endpoint	Description
POST	/api/jobs	Create job posting
GET	/api/jobs	Fetch all jobs
GET	/api/jobs/:id	Job details
Applications
Method	Endpoint	Description
POST	/api/apply	Apply to job
GET	/api/applications	View applicants
AI Resume Processing
Method	Endpoint	Description
POST	/api/ai/analyze	Extract resume data
POST	/api/ai/match	Generate candidate match score
🌐 Deployment
Deploy Frontend (Vercel)

Connect GitHub repo to Vercel

Framework preset: Next.js

Add environment variables

Deploy

Database

Recommended providers:

MongoDB Atlas

Railway

Render

🤝 Contributing

Contributions are welcome.

Steps:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request
📄 License

ISC License

👤 Author

Farhan Abid

Email
farhankhan080304@gmail.com

GitHub
@farhankhan0986

<div align="center">

If you found this project helpful, please consider giving it a ⭐

</div>
