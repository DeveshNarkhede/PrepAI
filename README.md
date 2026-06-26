# 🎯 PrepAI — AI-Powered Mock Interview Coach

<div align="center">

![PrepAI Banner](https://img.shields.io/badge/PrepAI-AI%20Interview%20Coach-6C63FF?style=for-the-badge&logo=robot&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-prep--ai--two--liart.vercel.app-6C63FF?style=for-the-badge)](https://prep-ai-two-liart.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

**Practice real interviews. Get instant AI feedback. Land your dream job.**

[🚀 Try it Live](https://prep-ai-two-liart.vercel.app/) · [🐛 Report Bug](https://github.com/yourusername/prepai/issues) · [✨ Request Feature](https://github.com/yourusername/prepai/issues)

</div>

---

## ✨ Features

- 🤖 **AI Interviewer** — Animated AI avatar asks role-specific questions powered by Gemini 2.5 Flash
- 📹 **Live Webcam** — See yourself on screen just like a real interview
- 🎤 **Voice + Text Input** — Answer by typing or speaking (speech-to-text)
- 📊 **Instant Scoring** — Every answer rated 1–10 with detailed feedback
- ✅ **Strengths & Improvements** — Know exactly what you did well and what to fix
- 💡 **Ideal Answers** — See the perfect answer after each question
- 📈 **Final Report** — Overall, Technical, Communication & Confidence scores
- 🎯 **6 Interview Types** — Software Engineer, Data Scientist, Product Manager, HR, Marketing, Custom
- 📱 **Fully Responsive** — Works on desktop and mobile

---

## 🖥️ Screenshots

### Landing Page
> Select your interview type, experience level, and skills

```
┌─────────────────────────────────────────┐
│  🎯 PrepAI  AI-Powered Interview Coach  │
├─────────────────────────────────────────┤
│         🤖 Your AI Interview Coach      │
│   Practice real interviews, improve     │
│                                         │
│  01 — INTERVIEW TYPE                    │
│  💻 Software  📊 Data  🗂️ PM  🤝 HR    │
│                                         │
│  02 — EXPERIENCE LEVEL                  │
│  Fresher  1-3Y  3-5Y  5+Y              │
│                                         │
│  03 — SKILLS                            │
│  React  Python  SQL  Node.js ...        │
│                                         │
│  [ Start My Interview → ]               │
└─────────────────────────────────────────┘
```

### Interview Screen
> AI asks questions, you answer, get scored instantly

```
┌──────────────────┬──────────────────────┐
│   AI Interviewer │    Your Camera       │
│      🤖 (live)   │    📹 (webcam)       │
├──────────────────┴──────────────────────┤
│  QUESTION 1                             │
│  "Explain the difference between        │
│   REST and GraphQL..."                  │
├─────────────────────────────────────────┤
│  [Type your answer...        ] [🎤]     │
│  [ Submit Answer →                    ] │
├─────────────────────────────────────────┤
│  Score: 8/10  ●●●●●●●●○○               │
│  ✓ Good explanation of REST             │
│  ✓ Mentioned flexibility                │
│  ↑ Could explain caching better         │
│  💡 Ideal: GraphQL allows clients...    │
└─────────────────────────────────────────┘
```

### Final Report
> Complete breakdown after all 5 questions

```
┌─────────────────────────────────────────┐
│         OVERALL PERFORMANCE             │
│              7/10                       │
│          Good performance               │
├───────────┬───────────────┬─────────────┤
│ ⚙️ Tech   │ 💬 Comm       │ 🎯 Conf     │
│   7/10    │    8/10       │   7/10      │
├───────────┴───────────────┴─────────────┤
│  QUESTION BREAKDOWN                     │
│  Q1 ████████░░ 8  "Great answer..."     │
│  Q2 ███████░░░ 7  "Good but..."         │
│  Q3 ██████░░░░ 6  "Needs more..."       │
├─────────────────────────────────────────┤
│  FOCUS AREAS                            │
│  ↑ Add concrete examples                │
│  ↑ Explain system design tradeoffs      │
└─────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/prepai.git
cd prepai
```

**2. Install dependencies**
```bash
npm install
npx shadcn@latest init
npm install lucide-react class-variance-authority clsx tailwind-merge
```

**3. Set up environment variables**

Create a `.env.local` file in the root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your free API key at **[aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)**

**4. Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
prepai/
├── src/
│   └── app/
│       ├── api/
│       │   └── gemini/
│       │       └── route.ts          # Gemini API proxy (server-side)
│       ├── components/
│       │   └── MockInterviewApp.jsx  # Main app component
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .env.local                        # API key (never commit this)
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Components** | shadcn/ui |
| **AI Model** | Google Gemini 2.5 Flash |
| **Speech** | Web Speech API (built-in browser) |
| **Camera** | MediaDevices API (built-in browser) |
| **Deployment** | Vercel |

---

## 🎮 How It Works

```
User selects role + experience + skills
           ↓
   Interview screen opens
           ↓
   Gemini generates Question 1
           ↓
   User answers (type or speak)
           ↓
   Gemini evaluates → Score + Feedback
           ↓
   Repeat for 5 questions
           ↓
   Final report generated
```

---

## 🌐 Deployment

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) and add `GEMINI_API_KEY` in Environment Variables.

### Environment Variables on Vercel

| Variable | Value |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key |

---

## 📋 Interview Types Supported

| Type | Focus Areas |
|---|---|
| 💻 Software Engineer | DSA, System Design, Languages, Frameworks |
| 📊 Data Scientist | ML, Statistics, Python, SQL, Data Analysis |
| 🗂️ Product Manager | Strategy, Metrics, Prioritization, Leadership |
| 🤝 HR Round | Behavioral, Communication, Culture Fit |
| 📣 Marketing | Campaigns, Analytics, Brand Strategy |
| ✏️ Custom | Any role you define |

---

## ⚡ API Rate Limits (Free Tier)

| Model | Requests/min | Daily Limit |
|---|---|---|
| Gemini 2.5 Flash | 10/min | Limited |

> **Tip:** Wait 60 seconds between interview sessions to avoid rate limits on the free tier.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📄 License

MIT License — feel free to use this for personal or commercial projects.

---

## 👨‍💻 Author

**Devesh**

[![GitHub](https://img.shields.io/badge/GitHub-yourusername-181717?style=flat&logo=github)](https://github.com/yourusername)

---

<div align="center">

**⭐ Star this repo if PrepAI helped you!**

[🚀 Try PrepAI Live](https://prep-ai-two-liart.vercel.app/)

</div>
