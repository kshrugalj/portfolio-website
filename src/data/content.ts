export const profile = {
  name: "Kshrugal Jangalapalli",
  email: "kshrugalj@gmail.com",
  github: "https://github.com/kshrugalj",
  linkedin: "https://www.linkedin.com/in/kshrugalj/",
  resumeUrl: "/resume.pdf",
  tagline: "Building technical systems that scale",
  role: "Software Engineer (Contract) @ Nexor Technologies",
  education: "B.S. Computer Science @ Georgia Tech — GPA 4.00/4.00",
};

export const stats = {
  competitions: 10,
  projects: 7,
  experiences: 5,
};

export interface Project {
  id: string;
  title: string;
  status: "active" | "completed";
  award?: string;
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
}

export const currentProjects: Project[] = [
  {
    id: "careeros",
    title: "CareerOS",
    status: "active",
    description:
      "AI job discovery platform across 111+ ATS boards with resume-to-role matching and one-click cover letter generation. Built with FastAPI, async httpx, Groq LLM and Firebase — 32–38s query time, zero rate-limit errors.",
    tags: ["Python", "FastAPI", "Next.js 16", "React 19", "TypeScript", "Firebase", "Groq LLM", "Pydantic v2"],
    links: [],
  },
  {
    id: "vibetexting",
    title: "VibeTexting",
    status: "active",
    description:
      "100% local AI messaging assistant for 50+ iMessage threads — zero cloud API calls, 5-second polling. Python CLI with SQLite parsing, AppleScript delivery, few-shot vibe mimicry from 150+ messages, plus semantic memory with ChromaDB + LLaVA vision.",
    tags: ["Python", "FastAPI", "React", "ChromaDB", "Ollama", "SQLite", "AppleScript", "LLaVA", "Tailwind CSS"],
    links: [],
  },
  {
    id: "recall",
    title: "Recall",
    status: "active",
    description:
      "Gamifying music education to make mastering instruments immersive. A smart platform that transforms music theory into an engaging, game-like experience.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Socket.IO", "Nuxt 4", "Vue 3", "Tailwind CSS", "Pinia", "JWT"],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/playrecall/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/playrecall/" },
    ],
  },
];

export const pastProjects: Project[] = [
  {
    id: "docops-copilot",
    title: "DocOps Copilot",
    status: "completed",
    award: "Built @ DVHacks 2026",
    description:
      "A document processing system that transforms unstructured documents into actionable outputs. Classifies document types, highlights potential risks, identifies missing information, and suggests next steps.",
    tags: ["AI", "Groq", "Llama", "Next.js", "Node.js", "PostgreSQL", "Prisma", "PyTesseract", "Python", "shadcn/ui", "Tailwind CSS", "TypeScript"],
    links: [
      { label: "Website", url: "https://docops-copilot.vercel.app/" },
      { label: "GitHub", url: "https://github.com/kshrugalj/DVHacks" },
      { label: "Devpost", url: "https://devpost.com/software/docops-copilot" },
    ],
  },
  {
    id: "admitx",
    title: "AdmitX",
    status: "completed",
    award: "Qualifier @ NexHacks 2026",
    description:
      "An AI-driven college advising platform built at NexHacks, a highly selective 24-hour hackathon at Carnegie Mellon University.",
    tags: ["Claude", "DevSwarm", "Groq", "LiveKit", "Python", "React", "SQL", "Supabase", "TypeScript"],
    links: [
      { label: "Website", url: "https://www.admitx.tech/" },
      { label: "GitHub", url: "https://github.com/kshrugalj/AdmitX" },
      { label: "Devpost", url: "https://devpost.com/software/admitx-phb81q" },
    ],
  },
  {
    id: "oralscan",
    title: "OralScan",
    status: "completed",
    award: "2nd Place — Congressional App Challenge 2025",
    description:
      "An AI-powered mobile application designed to detect early signs of oral cancer through image analysis.",
    tags: ["Flutter", "Dart", "Figma", "AWS", "Docker", "Python", "FastAPI", "TensorFlow", "OpenCV"],
    links: [
      { label: "Video", url: "https://www.youtube.com/watch?v=QshasNCWGik" },
    ],
  },
  {
    id: "chakraclash",
    title: "ChakraClash",
    status: "completed",
    award: "4th Place & Best Implementation — HogHacks 2025",
    description:
      "A real-time competitive Yoga ranking app that uses a custom machine vision model to score yoga poses.",
    tags: ["Deno", "Flutter", "Python", "TensorFlow", "OpenCV", "WebSockets"],
    links: [
      { label: "Article", url: "https://news.uark.edu/articles/77408/u-of-a-students-compete-in-hoghacks-hackathon" },
      { label: "GitHub", url: "https://github.com/kshrugalj/ChakraClash" },
    ],
  },
];

export interface Competition {
  date: string;
  title: string;
  award: string;
  issuer: string;
  description: string;
  associated?: string;
  tags?: string[];
}

export const competitions: Competition[] = [
  { date: "Apr 2026", title: "HogHacks 2026", award: "4th Place", issuer: "University of Arkansas ACM", description: "Placed 4th in the University of Arkansas's annual hackathon.", associated: "Bentonville West High School" },
  { date: "Mar 2026", title: "High School Programming Competition", award: "5th Place", issuer: "University of Arkansas EECS", description: "Placed 5th out of 20 teams. Solved algorithmic problems in Python.", associated: "Bentonville West High School", tags: ["Python", "Algorithms"] },
  { date: "Jan 2026", title: "NexHacks 2026", award: "Qualifier (Top 800/7000+)", issuer: "Carnegie Mellon University", description: "Developed AdmitX, an AI-powered college advising platform.", associated: "Bentonville West High School", tags: ["AI", "React", "LiveKit"] },
  { date: "Nov 2025", title: "Congressional App Challenge 2025", award: "2nd Place", issuer: "US Congress (Arkansas District 3)", description: "Awarded 2nd place for OralScan, an AI-powered oral cancer detection app.", associated: "Bentonville West High School", tags: ["Flutter", "TensorFlow", "Python"] },
  { date: "Nov 2025", title: "VibeCon 2025", award: "Top 25", issuer: "Y Combinator HQ, San Francisco", description: "Selected for VibeCon (250/2,000+), built MirAI at YC.", associated: "Bentonville West High School", tags: ["AI", "MirAI"] },
  { date: "Apr 2025", title: "HogHacks 2025", award: "4th Place & Best Implementation", issuer: "University of Arkansas", description: "Won Best Implementation for ChakraClash.", associated: "Bentonville West High School", tags: ["Flutter", "TensorFlow", "FastAPI"] },
  { date: "Mar 2025", title: "High School Programming Competition", award: "Top 10 (8th Place)", issuer: "University of Arkansas CSCE", description: "Placed 8th out of 25 teams.", associated: "Bentonville West High School", tags: ["Python"] },
  { date: "Dec 2024", title: "CyberPatriot", award: "2nd Place (State Platinum)", issuer: "AFA CyberPatriot", description: "2nd in Arkansas's highest tier. Top 10% of 3,200+ teams.", associated: "Ignite Professional Studies", tags: ["Cybersecurity", "Windows Server"] },
  { date: "Nov 2024", title: "Arvest Hackathon", award: "1st Place", issuer: "Arvest Bank", description: "1st place with a multilingual chatbot for financial literacy.", associated: "Ignite Professional Studies", tags: ["Translation", "Fintech"] },
  { date: "Feb 2024", title: "All-Regional Coding Competition", award: "State Qualifier", issuer: "Arkansas Dept. of Education", description: "Qualified for State, ranking 12th in region.", associated: "Bentonville West High School" },
];

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  link: string;
  bullets?: string[];
}

export const experiences: Experience[] = [
  {
    title: "Software Engineer (Contract)",
    company: "Nexor Technologies",
    period: "Jun 2026 — Aug 2026",
    description: "AI-powered document extraction & property transcription — TypeScript, Next.js, PostgreSQL, Claude, Azure Blob Storage",
    link: "#",
    bullets: [
      "Cut trust intake from 1-2 hours of manual retyping to 5 minutes by developing AI-powered document extraction with TypeScript, Next.js, PostgreSQL and Anthropic Claude to convert trust documents into structured data for attorney review",
      "Automated property statement transcription across 12 financial categories, building an email ingestion pipeline with TypeScript, Claude structured outputs, Resend web hooks, and Azure Blob Storage that converts 10–20 line items from PDF/image attachments into reviewable ledger entries",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "AitheriA",
    period: "Jan 2026 — May 2026",
    description: "Production web platform for AI music startup — Next.js 16, React 19, TypeScript, Tailwind CSS, Resend, Vercel",
    link: "https://aitheria.io/",
    bullets: [
      "Developed a production web platform for an AI music startup as technical lead on a 2-person team, delivering a 4-route, 7-section interactive experience using Next.js 16, React 19, TypeScript, and Tailwind CSS",
      "Deployed and launched the platform through Vercel with the company's custom domain, connecting the GitHub codebase and DNS to production while building the contact and lead-capture system with Next.js API routes, TypeScript, and Resend",
      "Presented AitheriA's platform and technical vision at 3+ entrepreneurial events, communicating product capabilities and business strategy to prospective partners, investors, and startup audiences",
    ],
  },
  {
    title: "Front-End Development Intern",
    company: "Velric.ai",
    period: "Sep 2025 — Nov 2025",
    description: "Core company web pages — Next.js, TypeScript, Tailwind CSS, SSR, Lighthouse 89/96/100/100",
    link: "https://velric.ai/",
    bullets: [
      "Developed 2 core company web pages, using Next.js, TypeScript, and Tailwind CSS to build responsive, type-safe Home and Contact experiences with reusable component architecture",
      "Delivered a web platform scoring 89 Performance, 96 Accessibility, 100 Best Practices, and 100 SEO in desktop Lighthouse testing by implementing Next.js server-side rendering (SSR) and optimizing initial page delivery",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "WayPave",
    period: "Jun 2025 — Aug 2025",
    description: "Real-time hiring analytics platform across 15+ restaurants — Vue.js, Tailwind CSS, Firebase",
    link: "https://waypave.com/",
    bullets: [
      "Built a real-time hiring analytics platform across 15+ restaurants, tracking interview-to-full-time conversion using Vue.js, Tailwind CSS, Firebase Authentication, and Firestore to surface actionable recruitment insights",
      "Developed live dashboards for 2 key hiring stages—interviews and full-time placements, implementing Firebase real-time updates to monitor restaurant-level conversion trends and support data-driven staffing decisions",
    ],
  },
  {
    title: "Information Security Intern",
    company: "Arvest Bank",
    period: "Jan 2025 — May 2025",
    description: "Ransomware preparedness for 6,000+ employees — JavaScript, HTML, CSS, LMS",
    link: "https://www.arvest.com/",
    bullets: [
      "Strengthened ransomware preparedness for 6,000+ employees by developing a mandatory, company-wide training program with interactive threat scenarios and a JavaScript, HTML, and CSS cybersecurity game integrated into the corporate LMS",
      "Presented the ransomware training initiative to the CISO and senior leadership, demonstrating the interactive training experience and explaining its approach to improving employee threat identification and incident response",
    ],
  },
];

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  link: string;
}

export const education: Education[] = [
  { degree: "B.S. in Computer Science, Threads: Intelligence and Systems & Architecture", school: "Georgia Institute of Technology", period: "May 2029", description: "GPA: 4.00/4.00 · Relevant Coursework: Intro to Computing, Object-Oriented Programming, Linear Algebra, Physics · Clubs: GT HackerHouse", link: "https://www.gatech.edu/" },
  { degree: "S2 Resident", school: "GT Hackerhouse", period: "Aug 2026 — Present", description: "S2 Resident at GT Hackerhouse", link: "https://hackerhousecampus.com/" },
  { degree: "Ignite Technology Student (Year 2)", school: "Ignite Professional Studies", period: "Aug 2025 — May 2026", description: "Yin and Yang Sensory Room, Hawk-Eye System, Cybersecurity Research, Traffic Optimization", link: "https://www.bentonvillek12.org/o/ignite" },
  { degree: "Ignite Technology Student (Year 1)", school: "Ignite Professional Studies", period: "Aug 2024 — May 2025", description: "Flow (Kayaking VR), NurseAI, OCR PDF development, Multilingual chatbot", link: "https://www.bentonvillek12.org/o/ignite" },
  { degree: "High School Diploma", school: "Bentonville West High School", period: "Aug 2022 — Jun 2026", description: "VP of Programming Club, NHS, DECA, Varsity Tennis, Key Club", link: "https://www.bentonvillek12.org/o/bwhs" },
];

export const commands = [
  { name: "whoami", description: "Display identity information" },
  { name: "projects", description: "List all projects" },
  { name: "projects --active", description: "List current projects only" },
  { name: "cat <project>", description: "Show project details" },
  { name: "competitions", description: "List competition history" },
  { name: "resume", description: "Show experience & education" },
  { name: "resume --education", description: "Show education only" },
  { name: "contact", description: "Display contact information" },
  { name: "browse", description: "Switch to browse mode" },
  { name: "help", description: "Show available commands" },
  { name: "clear", description: "Clear terminal output" },
  { name: "history", description: "Show command history" },
];

export const easterEggs = [
  { command: "sudo hire me", response: "Permission granted. Here's my contact info:" },
  { command: "neofetch", response: "kshrugal@portfolio" },
  { command: "fortune", response: "" },
  { command: "man kshrugal", response: "" },
  { command: "ls ~/.secrets", response: "nice try 😉" },
  { command: "whoami --all", response: "" },
];
