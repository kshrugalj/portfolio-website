export const profile = {
  name: "Kshrugal Jangalapalli",
  email: "kshrugalj@gmail.com",
  github: "https://github.com/kshrugalj",
  linkedin: "https://www.linkedin.com/in/kshrugalj/",
  resumeUrl: "/resume.pdf",
  tagline: "Building technical systems that scale",
  role: "Software Engineer (Contract) @ Nexor Technologies",
  education: "CS @ Georgia Tech",
};

export const stats = {
  competitions: 10,
  projects: 6,
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
  {
    id: "vibetexting",
    title: "VibeTexting",
    status: "active",
    description:
      "Adding emotional depth to digital communication. Real-time sentiment analysis provides visual feedback to ensure your messages carry the weight they deserve.",
    tags: ["Python", "FastAPI", "React 19", "TypeScript", "Vite", "Tailwind CSS", "ChromaDB", "Ollama", "SQLite"],
    links: [],
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
    description: "Full-stack contract — Next.js, React, TypeScript, Python, FastAPI",
    link: "#",
    bullets: [
      "Built and shipped full-stack features using Next.js, React, TypeScript, Python, and FastAPI, translating product requirements into responsive user interfaces and reliable backend services.",
      "Integrated REST APIs and database-backed workflows to support scalable application functionality, improve data flow between services, and streamline user interactions.",
      "Contributed to debugging, testing, and code reviews across a modern web stack, helping improve application reliability, maintainability, and deployment readiness.",
      "Collaborated with engineers to deliver secure, production-quality solutions while following best practices for version control, iterative development, and performance optimization.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Aitheria",
    period: "Jan 2026 — May 2026",
    description: "Crowdfunding & landing platform — Next.js, TypeScript, Tailwind, Resend, Vercel",
    link: "https://aitheria.io/",
    bullets: [
      "Built a full-stack crowdfunding and landing platform using Next.js, TypeScript, and Tailwind CSS to support a music-tech startup.",
      "Engineered a modular architecture with custom CSS animations and a soundbar visualizer for an immersive user experience.",
      "Integrated the Resend API to automate secure contact form processing and streamline lead management.",
      "Achieved seamless delivery and high performance by optimizing CI/CD pipelines through Vercel.",
      "Developed multi-phase intro transitions to enhance brand storytelling and user engagement.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company: "Velric",
    period: "Sep 2025 — Nov 2025",
    description: "Core website pages — Next.js, TypeScript, Tailwind, SSR",
    link: "https://velric.ai/",
    bullets: [
      "Implementation of Next.js, TypeScript, and Tailwind CSS to build core company website pages.",
      "Development of Home and Contact pages with a focus on clean UI and responsive design.",
      "Utilized server-side rendering (SSR) to improve performance and SEO.",
      "Emphasized type safety and maintainable component architecture.",
      "Collaborated with the team to align frontend implementation with branding and product goals.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "WayPave",
    period: "Jun 2025 — Aug 2025",
    description: "Hiring analytics platform — Firebase, Vue.js, Tailwind",
    link: "https://waypave.com/",
    bullets: [
      "Built a full-stack hiring analytics platform to surface real-time recruitment insights.",
      "Implemented a Firebase backend for authentication, data storage, and live updates.",
      "Developed a responsive Vue.js + Tailwind CSS frontend for clear data visualization.",
      "Enabled real-time analytics dashboards to track hiring metrics and trends.",
      "Leveraged data-driven insights to help guide product and strategy decisions.",
    ],
  },
  {
    title: "Information Security Intern",
    company: "Arvest Bank",
    period: "Jan 2025 — May 2025",
    description: "Ransomware training program — JavaScript, HTML/CSS, LMS",
    link: "https://www.arvest.com/",
    bullets: [
      "Led the development of a company-wide ransomware training program to improve cybersecurity awareness.",
      "Built an interactive JavaScript/HTML/CSS game to simplify complex security concepts.",
      "Integrated the training experience with the company Learning Management System (LMS).",
      "Designed engaging scenarios to help employees identify and respond to ransomware threats.",
      "Increased accessibility and retention of cybersecurity best practices across teams.",
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
  { degree: "CS Student", school: "Georgia Institute of Technology", period: "Aug 2026 — Present", description: "Major: Computer Science", link: "https://www.gatech.edu/" },
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
