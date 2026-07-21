# Terminal Portfolio Revamp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a dual-mode experience — an interactive terminal where users can type commands, plus a traditional browse mode — with an onboarding screen letting visitors choose their experience.

**Architecture:** Shared data layer feeds two presentation modes (Terminal + Browse). The terminal mode features a boot sequence, scrollable command history, typed input, autocomplete, and easter eggs. The browse mode is a clean, scrollable traditional portfolio. An onboarding choice screen appears on every visit — no persistence, purely session-based.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Framer Motion (already installed). Remove `typewriter-effect` and `react-icons` — replace with Framer Motion animations and inline SVG icons.

---

## File Structure

```
src/
├── data/
│   └── content.ts              # ALL portfolio content (shared between modes)
├── hooks/
│   ├── useTerminal.ts          # Terminal state machine (commands, history, output)
│   └── useMode.ts              # Mode preference (session-only, no persistence)
├── components/
│   ├── ModeSwitcher.tsx        # Onboarding choice screen
│   ├── Terminal/
│   │   ├── Terminal.tsx        # Main terminal container
│   │   ├── BootSequence.tsx    # Boot animation on load
│   │   ├── TerminalPrompt.tsx  # Reusable "$ command █" line
│   │   ├── TerminalOutput.tsx  # Output block wrapper
│   │   ├── CommandLine.tsx     # Interactive input bar at bottom
│   │   └── CommandPalette.tsx  # Cmd+K overlay
│   ├── Commands/
│   │   ├── Whoami.tsx          # Identity output
│   │   ├── Projects.tsx        # ls projects/ table + cat detail
│   │   ├── Competitions.tsx    # history | grep competition
│   │   ├── Resume.tsx          # cat resume (tabbed experience/education)
│   │   ├── Contact.tsx         # Social links output
│   │   ├── Help.tsx            # Command reference
│   │   └── EasterEggs.tsx      # sudo hire me, neofetch, fortune
│   ├── Browse/
│   │   ├── BrowseMode.tsx      # Full browse layout
│   │   ├── BrowseNav.tsx       # Traditional navbar
│   │   ├── BrowseHero.tsx      # Hero section
│   │   ├── BrowseProjects.tsx  # Project cards
│   │   ├── BrowseCompetitions.tsx # Competition grid
│   │   └── BrowseExperience.tsx # Experience timeline
│   └── UI/
│       ├── Cursor.tsx          # Blinking block cursor
│       └── StatusBadge.tsx     # ● active/inactive indicator
├── App.tsx                     # Root: checks mode, renders ModeSwitcher or mode
├── index.css                   # Tailwind + terminal theme tokens
└── main.tsx                    # Entry (unchanged)
```

**Files to delete:**
- `src/components/AnimatedSection.tsx`
- `src/components/CustomCursor.tsx`
- `src/components/Hero.tsx`
- `src/components/Navbar.tsx`
- `src/components/CurrentProjects.tsx`
- `src/components/Projects.tsx`
- `src/components/Competitions.tsx`
- `src/components/ExperienceEducation.tsx`

**Dependencies to remove:**
- `typewriter-effect` (replace with Framer Motion)
- `react-icons` (replace with inline SVGs)

---

## Task 1: Create shared data layer

**Files:**
- Create: `src/data/content.ts`

All portfolio content lives here. Both Terminal and Browse modes read from this single source.

- [ ] **Step 1: Create `src/data/content.ts`**

```typescript
export const profile = {
  name: "Kshrugal Jangalapalli",
  email: "kshrugalj@gmail.com",
  github: "https://github.com/kshrugalj",
  linkedin: "https://www.linkedin.com/in/kshrugalj/",
  resumeUrl: "/resume.pdf",
  tagline: "Building technical systems that scale",
  role: "Chief Architect @ Aitheria",
  education: "Incoming CS @ Georgia Tech",
};

export const stats = {
  competitions: 10,
  projects: 6,
  experiences: 4,
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
    tags: [],
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
    tags: [],
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
}

export const experiences: Experience[] = [
  { title: "Chief Architect", company: "Aitheria", period: "Jan 2026 — Present", description: "Developing Technical Systems and AI Training.", link: "https://aitheria.io/" },
  { title: "Frontend Developer Intern", company: "Velric", period: "Sep 2025 — Dec 2025", description: "Helped build the company website using Next.js, TypeScript, and Tailwind.", link: "https://velric.ai/" },
  { title: "Software Engineer Intern", company: "WayPave", period: "Jun 2025 — Aug 2025", description: "Built a full-stack hiring analytics platform with Firebase and Vue.js/Tailwind.", link: "https://waypave.com/" },
  { title: "Information Security Intern", company: "Arvest Bank", period: "Jan 2025 — May 2025", description: "Led development of company-wide ransomware training program.", link: "https://www.arvest.com/" },
];

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  link: string;
}

export const education: Education[] = [
  { degree: "Incoming CS Student", school: "Georgia Institute of Technology", period: "Jun 2026 — Present", description: "Major: Computer Science", link: "https://www.gatech.edu/" },
  { degree: "Ignite Technology Student (Year 2)", school: "Ignite Professional Studies", period: "Aug 2025 — Present", description: "Yin and Yang Sensory Room, Hawk-Eye System, Cybersecurity Research, Traffic Optimization", link: "https://www.bentonvillek12.org/o/ignite" },
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
```

- [ ] **Step 2: Verify no import errors**

Run: `npx tsc --noEmit`
Expected: No new errors from this file.

---

## Task 2: Terminal theme & CSS foundation

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace `src/index.css` contents**

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');

@theme {
  --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", "Fira Code", monospace;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-term-bg: #0a0e14;
  --color-term-surface: #131720;
  --color-term-raised: #1a1f2b;
  --color-term-gutter: #0d1117;

  --color-term-text: #c5cdd9;
  --color-term-muted: #5c6773;
  --color-term-dim: #3a4150;

  --color-term-green: #03dac6;
  --color-term-yellow: #ffd580;
  --color-term-blue: #82aaff;
  --color-term-red: #ff5572;
  --color-term-purple: #c792ea;

  --color-term-border: #1e2530;
  --color-term-border-active: #2a3040;
}

@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-mono);
    background-color: var(--color-term-bg);
    color: var(--color-term-text);
    line-height: 1.5;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: var(--color-term-green);
    color: var(--color-term-bg);
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-term-bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-term-border);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-term-dim);
  }
}

@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes terminal-reveal {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes boot-progress {
  from { width: 0%; }
  to { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify styles load**

Run: `npm run build`
Expected: Build succeeds, no CSS errors.

---

## Task 3: Core UI components — Cursor, StatusBadge

**Files:**
- Create: `src/components/UI/Cursor.tsx`
- Create: `src/components/UI/StatusBadge.tsx`

- [ ] **Step 1: Create `src/components/UI/Cursor.tsx`**

```tsx
import React from "react";

interface CursorProps {
  className?: string;
}

const Cursor: React.FC<CursorProps> = ({ className = "" }) => {
  return (
    <span
      className={`inline-block w-[0.6em] h-[1.15em] bg-term-green align-text-bottom ${className}`}
      style={{ animation: "cursor-blink 1s steps(1) infinite" }}
    />
  );
};

export default Cursor;
```

- [ ] **Step 2: Create `src/components/UI/StatusBadge.tsx`**

```tsx
import React from "react";

interface StatusBadgeProps {
  active: boolean;
  label?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ active, label }) => {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span
        className={`w-2 h-2 rounded-full ${active ? "bg-term-green" : "bg-term-yellow"}`}
        style={active ? { animation: "cursor-blink 2s steps(1) infinite" } : undefined}
      />
      {label && (
        <span className={active ? "text-term-green" : "text-term-yellow"}>
          {label}
        </span>
      )}
    </span>
  );
};

export default StatusBadge;
```

---

## Task 4: useMode hook — session-only mode choice

**Files:**
- Create: `src/hooks/useMode.ts`

No localStorage — the mode resets on every page load/visit. The onboarding screen appears every time.

- [ ] **Step 1: Create `src/hooks/useMode.ts`**

```typescript
import { useState } from "react";

export type Mode = "terminal" | "browse" | null;

export function useMode() {
  const [mode, setMode] = useState<Mode>(null);

  const chooseMode = (selected: Mode) => {
    setMode(selected);
  };

  return { mode, chooseMode };
}
```

---

## Task 5: ModeSwitcher — onboarding choice screen

**Files:**
- Create: `src/components/ModeSwitcher.tsx`

Appears on every visit/reload. No persistence — purely session-based.

- [ ] **Step 1: Create `src/components/ModeSwitcher.tsx`**

```tsx
import React from "react";
import { motion } from "framer-motion";
import { Mode } from "../hooks/useMode";

interface ModeSwitcherProps {
  onChoose: (mode: Mode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ onChoose }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-term-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full text-center"
      >
        <div className="mb-8">
          <span className="text-term-green text-sm font-mono">$</span>
          <span className="text-term-muted text-sm font-mono ml-2">welcome</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-term-text mb-3 font-mono">
          kshrugal@portfolio
        </h1>
        <p className="text-term-muted text-sm font-mono mb-12">
          choose your experience
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoose("terminal")}
            className="group relative px-8 py-5 bg-term-surface border border-term-border rounded-lg hover:border-term-green transition-colors duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-term-green text-lg">&gt;</span>
              <span className="text-term-text font-semibold font-mono">Interactive Terminal</span>
            </div>
            <p className="text-term-muted text-xs font-mono pl-7">
              Type commands to explore. For developers and power users.
            </p>
            <span className="absolute top-3 right-3 text-term-dim text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌘K
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoose("browse")}
            className="group relative px-8 py-5 bg-term-surface border border-term-border rounded-lg hover:border-term-blue transition-colors duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-term-blue text-lg">◎</span>
              <span className="text-term-text font-semibold font-mono">Browse Mode</span>
            </div>
            <p className="text-term-muted text-xs font-mono pl-7">
              Scroll and click. Traditional portfolio experience.
            </p>
          </motion.button>
        </div>

        <p className="text-term-dim text-xs font-mono mt-8">
          choose again on your next visit
        </p>
      </motion.div>
    </div>
  );
};

export default ModeSwitcher;
```

---

## Task 6: useTerminal hook — command state machine

**Files:**
- Create: `src/hooks/useTerminal.ts`

- [ ] **Step 1: Create `src/hooks/useTerminal.ts`**

```typescript
import { useState, useCallback } from "react";
import { commands as commandList } from "../data/content";

export interface OutputLine {
  id: string;
  command?: string;
  content: React.ReactNode;
  isError?: boolean;
}

export function useTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [executedCommands, setExecutedCommands] = useState<Set<string>>(new Set());

  const addOutput = useCallback((line: OutputLine) => {
    setOutput((prev) => [...prev, line]);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const getAvailableCommands = useCallback(() => {
    return commandList.map((c) => c.name);
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up") {
        setHistoryIndex((prev) => {
          const next = Math.min(prev + 1, history.length - 1);
          return next;
        });
      } else {
        setHistoryIndex((prev) => {
          const next = Math.max(prev - 1, -1);
          return next;
        });
      }
    },
    [history.length]
  );

  const getCurrentHistoryCommand = useCallback(() => {
    if (historyIndex === -1) return "";
    return history[history.length - 1 - historyIndex] ?? "";
  }, [history, historyIndex]);

  const executeCommand = useCallback(
    (command: string) => {
      const trimmed = command.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setExecutedCommands((prev) => new Set(prev).add(trimmed.split(" ")[0]));

      // The actual rendering of command output happens in the Commands components
      // This hook just manages state. The Terminal component calls the right command renderer.
      return trimmed;
    },
    []
  );

  return {
    output,
    addOutput,
    clearOutput,
    history,
    historyIndex,
    executedCommands,
    executeCommand,
    navigateHistory,
    getCurrentHistoryCommand,
    getAvailableCommands,
  };
}
```

---

## Task 7: TerminalPrompt — reusable prompt line

**Files:**
- Create: `src/components/Terminal/TerminalPrompt.tsx`

- [ ] **Step 1: Create `src/components/Terminal/TerminalPrompt.tsx`**

```tsx
import React from "react";
import Cursor from "../UI/Cursor";

interface TerminalPromptProps {
  command: string;
  showCursor?: boolean;
  prefix?: string;
  className?: string;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  command,
  showCursor = false,
  prefix = "~",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 font-mono text-sm ${className}`}>
      <span className="text-term-green">kshrugal@portfolio</span>
      <span className="text-term-blue">{prefix}</span>
      <span className="text-term-muted">$</span>
      <span className="text-term-text">{command}</span>
      {showCursor && <Cursor />}
    </div>
  );
};

export default TerminalPrompt;
```

---

## Task 8: TerminalOutput — output block wrapper

**Files:**
- Create: `src/components/Terminal/TerminalOutput.tsx`

- [ ] **Step 1: Create `src/components/Terminal/TerminalOutput.tsx`**

```tsx
import React from "react";

interface TerminalOutputProps {
  children: React.ReactNode;
  indent?: number;
  className?: string;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  children,
  indent = 0,
  className = "",
}) => {
  return (
    <div
      className={`font-mono text-sm leading-relaxed ${className}`}
      style={{ paddingLeft: `${indent * 1.5}rem` }}
    >
      {children}
    </div>
  );
};

export default TerminalOutput;
```

---

## Task 9: Command components — Whoami, Help, Contact, EasterEggs

**Files:**
- Create: `src/components/Commands/Whoami.tsx`
- Create: `src/components/Commands/Help.tsx`
- Create: `src/components/Commands/Contact.tsx`
- Create: `src/components/Commands/EasterEggs.tsx`

- [ ] **Step 1: Create `src/components/Commands/Whoami.tsx`**

```tsx
import React from "react";
import { profile, stats } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";

const Whoami: React.FC = () => {
  return (
    <div className="space-y-4">
      <TerminalPrompt command="whoami" />
      <TerminalOutput indent={1}>
        <div className="border border-term-border rounded p-4 space-y-2">
          <div className="text-term-text text-lg font-bold">{profile.name}</div>
          <div className="text-term-green">{profile.role}</div>
          <div className="text-term-blue">{profile.education}</div>
          <div className="text-term-muted mt-2">{profile.tagline}</div>
          <div className="text-term-dim text-xs mt-3">
            {stats.competitions} competitions · {stats.projects} projects · {stats.experiences} experiences
          </div>
          <div className="flex gap-4 mt-3">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
              → github
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
              → linkedin
            </a>
            <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green text-xs transition-colors">
              → email
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
              → resume
            </a>
          </div>
        </div>
      </TerminalOutput>
    </div>
  );
};

export default Whoami;
```

- [ ] **Step 2: Create `src/components/Commands/Help.tsx`**

```tsx
import React from "react";
import { commands } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";

interface HelpProps {
  onCommandClick?: (cmd: string) => void;
}

const Help: React.FC<HelpProps> = ({ onCommandClick }) => {
  return (
    <div className="space-y-4">
      <TerminalPrompt command="help" />
      <TerminalOutput indent={1}>
        <div className="text-term-muted mb-2">available commands:</div>
        <div className="space-y-1">
          {commands.map((cmd) => (
            <div key={cmd.name} className="flex gap-4">
              <button
                onClick={() => onCommandClick?.(cmd.name.split(" ")[0])}
                className="text-term-blue hover:text-term-green text-left transition-colors cursor-pointer font-mono text-sm bg-transparent border-none p-0"
              >
                {cmd.name}
              </button>
              <span className="text-term-dim">{cmd.description}</span>
            </div>
          ))}
        </div>
        <div className="text-term-dim text-xs mt-4">
          tip: use ↑/↓ to navigate command history · tab for autocomplete
        </div>
      </TerminalOutput>
    </div>
  );
};

export default Help;
```

- [ ] **Step 3: Create `src/components/Commands/Contact.tsx`**

```tsx
import React from "react";
import { profile } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";

const Contact: React.FC = () => {
  return (
    <div className="space-y-4">
      <TerminalPrompt command="contact" />
      <TerminalOutput indent={1}>
        <div className="space-y-1">
          <div><span className="text-term-muted">email:</span> <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green transition-colors">{profile.email}</a></div>
          <div><span className="text-term-muted">github:</span> <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">{profile.github.replace("https://", "")}</a></div>
          <div><span className="text-term-muted">linkedin:</span> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">{profile.linkedin.replace("https://", "")}</a></div>
          <div><span className="text-term-muted">resume:</span> <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">download.pdf</a></div>
        </div>
      </TerminalOutput>
    </div>
  );
};

export default Contact;
```

- [ ] **Step 4: Create `src/components/Commands/EasterEggs.tsx`**

```tsx
import React from "react";
import { profile } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";

interface EasterEggProps {
  command: string;
}

const fortunes = [
  "You will Ship something great this year.",
  "The best error message is the one that never shows up.",
  "It works on my machine ¯\\_(ツ)_/¯",
  "There's no place like 127.0.0.1",
  "Weeks of coding can save you hours of planning.",
];

const EasterEggs: React.FC<EasterEggProps> = ({ command }) => {
  const cmd = command.trim().toLowerCase();

  if (cmd === "sudo hire me") {
    return (
      <div className="space-y-4">
        <TerminalPrompt command={command} />
        <TerminalOutput indent={1}>
          <div className="text-term-green font-bold">Permission granted.</div>
          <div className="text-term-text mt-2">Here's how to reach me:</div>
          <div className="mt-2 space-y-1">
            <div>→ <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green transition-colors">{profile.email}</a></div>
            <div>→ <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">github.com/kshrugalj</a></div>
            <div>→ <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">linkedin.com/in/kshrugalj</a></div>
          </div>
        </TerminalOutput>
      </div>
    );
  }

  if (cmd === "neofetch") {
    return (
      <div className="space-y-4">
        <TerminalPrompt command={command} />
        <TerminalOutput indent={1}>
          <pre className="text-term-green text-xs leading-tight">
{`    _____
   /     \\  kshrugal@portfolio
  / () () \\ ──────────────────
  \\  ___  /  OS: Portfolio OS 1.0
   |     |   Shell: react-terminal
   |     |   DE: Tailwind CSS 4
  /|     |\\  Languages: TS, Python, Dart
 / |     | \\ Frameworks: React, Next.js, Flutter
/  |     |  \\ Editor: VS Code + Neovim`}
          </pre>
        </TerminalOutput>
      </div>
    );
  }

  if (cmd === "fortune") {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return (
      <div className="space-y-4">
        <TerminalPrompt command={command} />
        <TerminalOutput indent={1}>
          <div className="text-term-yellow italic">"{fortune}"</div>
        </TerminalOutput>
      </div>
    );
  }

  if (cmd === "man kshrugal") {
    return (
      <div className="space-y-4">
        <TerminalPrompt command={command} />
        <TerminalOutput indent={1}>
          <div className="text-term-yellow font-bold">KSHRUGAL(1)</div>
          <div className="text-term-muted mt-2">NAME</div>
          <div className="pl-4">kshrugal - builder of technical systems</div>
          <div className="text-term-muted mt-2">SYNOPSIS</div>
          <div className="pl-4">kshrugal [--passionate] [--relentless] [--creative]</div>
          <div className="text-term-muted mt-2">DESCRIPTION</div>
          <div className="pl-4 max-w-lg">
            A developer who builds at the intersection of AI and systems.
            Currently serving as Chief Architect at Aitheria and incoming
            CS student at Georgia Tech. Has a track record of winning
            hackathons and shipping real products.
          </div>
          <div className="text-term-muted mt-2">BUGS</div>
          <div className="pl-4">Sometimes stays up too late coding.</div>
        </TerminalOutput>
      </div>
    );
  }

  if (cmd === "ls ~/.secrets") {
    return (
      <div className="space-y-4">
        <TerminalPrompt command={command} />
        <TerminalOutput indent={1}>
          <div className="text-term-yellow">nice try 😉</div>
        </TerminalOutput>
      </div>
    );
  }

  if (cmd === "whoami --all") {
    return (
      <div className="space-y-4">
        <TerminalPrompt command={command} />
        <TerminalOutput indent={1}>
          <div className="space-y-1 text-term-text">
            <div><span className="text-term-muted">name:</span> {profile.name}</div>
            <div><span className="text-term-muted">role:</span> {profile.role}</div>
            <div><span className="text-term-muted">edu:</span> {profile.education}</div>
            <div><span className="text-term-muted">status:</span> <span className="text-term-green">building</span></div>
            <div><span className="text-term-muted">sleep:</span> <span className="text-term-red">insufficient</span></div>
            <div><span className="text-term-muted">caffeine:</span> <span className="text-term-yellow">high</span></div>
          </div>
        </TerminalOutput>
      </div>
    );
  }

  return null;
};

export default EasterEggs;
```

---

## Task 10: Command components — Projects, Competitions, Resume

**Files:**
- Create: `src/components/Commands/Projects.tsx`
- Create: `src/components/Commands/Competitions.tsx`
- Create: `src/components/Commands/Resume.tsx`

- [ ] **Step 1: Create `src/components/Commands/Projects.tsx`**

```tsx
import React, { useState } from "react";
import { currentProjects, pastProjects, Project } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";
import StatusBadge from "../UI/StatusBadge";

interface ProjectsProps {
  args?: string;
}

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-2 mt-2 pl-4 border-l border-term-border-active">
      <div className="text-term-text font-bold"># {project.title}</div>
      {project.award && <div className="text-term-yellow text-xs">> award: {project.award}</div>}
      {project.status === "active" && <StatusBadge active label="In Development" />}
      <div className="text-term-muted mt-2">{project.description}</div>
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-term-purple text-xs bg-term-purple/10 px-1.5 py-0.5 rounded border border-term-purple/20">
              {tag}
            </span>
          ))}
        </div>
      )}
      {project.links.length > 0 && (
        <div className="mt-2 space-y-1">
          {project.links.map((link) => (
            <div key={link.label}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
                → {link.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ args }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const showActive = args?.includes("--active");
  const projects = showActive ? currentProjects : [...currentProjects, ...pastProjects];

  return (
    <div className="space-y-4">
      <TerminalPrompt command={showActive ? "projects --active" : "projects"} />
      <TerminalOutput indent={1}>
        <div className="text-term-muted mb-2">
          {showActive ? "currently building:" : "all projects:"}
        </div>

        <div className="space-y-0.5">
          {projects.map((project) => (
            <div key={project.id}>
              <button
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                className="w-full text-left flex items-center gap-3 py-1.5 px-2 hover:bg-term-raised rounded transition-colors cursor-pointer font-mono text-sm bg-transparent border-none"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.status === "active" ? "#03dac6" : "#5c6773" }} />
                <span className="text-term-blue hover:underline">{project.title}</span>
                {project.award && <span className="text-term-dim text-xs hidden sm:inline">— {project.award}</span>}
              </button>
              {expandedProject === project.id && <ProjectDetail project={project} />}
            </div>
          ))}
        </div>

        <div className="text-term-green mt-4">$ <span className="text-term-dim">cat &lt;project&gt; for details (click above)</span></div>
      </TerminalOutput>
    </div>
  );
};

export default Projects;
```

- [ ] **Step 2: Create `src/components/Commands/Competitions.tsx`**

```tsx
import React, { useState } from "react";
import { competitions } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";

const Competitions: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <TerminalPrompt command="competitions" />
      <TerminalOutput indent={1}>
        <div className="text-term-muted mb-2">history | grep competition --color</div>

        <div className="space-y-0.5">
          {competitions.map((comp, i) => (
            <div key={i}>
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full text-left flex items-center gap-3 py-1.5 px-2 hover:bg-term-raised rounded transition-colors cursor-pointer font-mono text-sm bg-transparent border-none"
              >
                <span className="text-term-dim text-xs w-8 text-right tabular-nums">{String(1024 - i).padStart(4, " ")}</span>
                <span className="text-term-muted text-xs w-16 tabular-nums">{comp.date}</span>
                <span className="text-term-blue hover:underline flex-1 text-left">{comp.title.toLowerCase().replace(/\s+/g, "-")}</span>
                <span className="text-term-yellow text-xs">→ {comp.award}</span>
              </button>
              {expandedIndex === i && (
                <div className="ml-14 pl-4 border-l border-term-border-active py-2 space-y-1">
                  <div className="text-term-muted text-xs italic">{comp.issuer}</div>
                  <div className="text-term-text text-xs">{comp.description}</div>
                  {comp.associated && <div className="text-term-dim text-xs">associated: {comp.associated}</div>}
                  {comp.tags && comp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {comp.tags.map((tag) => (
                        <span key={tag} className="text-term-purple text-xs bg-term-purple/10 px-1.5 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </TerminalOutput>
    </div>
  );
};

export default Competitions;
```

- [ ] **Step 3: Create `src/components/Commands/Resume.tsx`**

```tsx
import React, { useState } from "react";
import { experiences, education } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";

interface ResumeProps {
  args?: string;
}

const Resume: React.FC<ResumeProps> = ({ args }) => {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    args?.includes("--education") ? "education" : "experience"
  );

  const items = activeTab === "experience" ? experiences : education;

  return (
    <div className="space-y-4">
      <TerminalPrompt command={args ? `resume ${args}` : "resume"} />
      <TerminalOutput indent={1}>
        <div className="flex gap-4 mb-4 border-b border-term-border pb-2">
          <button
            onClick={() => setActiveTab("experience")}
            className={`text-xs font-mono cursor-pointer bg-transparent border-none ${activeTab === "experience" ? "text-term-green" : "text-term-muted hover:text-term-text"}`}
          >
            {activeTab === "experience" && "▸ "}experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`text-xs font-mono cursor-pointer bg-transparent border-none ${activeTab === "education" ? "text-term-green" : "text-term-muted hover:text-term-text"}`}
          >
            {activeTab === "education" && "▸ "}education
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-term-dim text-xs w-28 flex-shrink-0 tabular-nums pt-0.5">{item.period}</div>
              <div className="space-y-1">
                <div className="text-term-text font-semibold text-sm">{item.title || item.degree}</div>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
                  {"company" in item ? item.company : item.school}
                </a>
                <div className="text-term-muted text-xs">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </TerminalOutput>
    </div>
  );
};

export default Resume;
```

---

## Task 11: CommandLine — interactive input bar

**Files:**
- Create: `src/components/Terminal/CommandLine.tsx`

- [ ] **Step 1: Create `src/components/Terminal/CommandLine.tsx`**

```tsx
import React, { useState, useRef, useEffect } from "react";
import Cursor from "../UI/Cursor";

interface CommandLineProps {
  onExecute: (command: string) => void;
  availableCommands: string[];
  historyCommand: string;
  disabled?: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
  onExecute,
  availableCommands,
  historyCommand,
  disabled = false,
}) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  useEffect(() => {
    if (historyCommand !== undefined) {
      setInput(historyCommand);
    }
  }, [historyCommand]);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = availableCommands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && filtered.join("") !== input);
    } else {
      setShowSuggestions(false);
    }
  }, [input, availableCommands]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onExecute(input.trim());
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleTab = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && filteredSuggestions.length > 0) {
      e.preventDefault();
      setInput(filteredSuggestions[0]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      {showSuggestions && (
        <div className="absolute bottom-full left-0 mb-1 bg-term-surface border border-term-border rounded px-3 py-1.5 text-xs font-mono text-term-muted">
          {filteredSuggestions.map((s) => (
            <div key={s} className="text-term-blue">{s}</div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono text-sm py-3 px-4 bg-term-surface/50 border-t border-term-border">
        <span className="text-term-green">kshrugal@portfolio</span>
        <span className="text-term-blue">~</span>
        <span className="text-term-muted">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleTab}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-term-text font-mono text-sm caret-transparent"
          placeholder={disabled ? "" : "type a command..."}
          autoComplete="off"
          spellCheck={false}
        />
        <Cursor />
      </form>
    </div>
  );
};

export default CommandLine;
```

---

## Task 12: CommandPalette — Cmd+K overlay

**Files:**
- Create: `src/components/Terminal/CommandPalette.tsx`

- [ ] **Step 1: Create `src/components/Terminal/CommandPalette.tsx`**

```tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { commands } from "../../data/content";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (command: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onExecute }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmdName: string) => {
    onExecute(cmdName.split(" ")[0]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-term-surface border border-term-border rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-term-border">
              <span className="text-term-green text-sm">$</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type a command..."
                className="flex-1 bg-transparent border-none outline-none text-term-text font-mono text-sm"
              />
            </div>
            <div className="max-h-64 overflow-y-auto py-2">
              {filtered.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => handleSelect(cmd.name)}
                  className="w-full text-left px-4 py-2 hover:bg-term-raised transition-colors flex justify-between items-center cursor-pointer bg-transparent border-none font-mono text-sm"
                >
                  <span className="text-term-blue">{cmd.name}</span>
                  <span className="text-term-dim text-xs">{cmd.description}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-2 text-term-dim text-sm">no matching commands</div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-term-border text-term-dim text-xs font-mono">
              ↑↓ navigate · enter select · esc close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
```

---

## Task 13: BootSequence — loading animation

**Files:**
- Create: `src/components/Terminal/BootSequence.tsx`

- [ ] **Step 1: Create `src/components/Terminal/BootSequence.tsx`**

```tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cursor from "../UI/Cursor";

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  { text: "BIOS v3.2.1 — Portfolio System", delay: 0 },
  { text: "Initializing modules...", delay: 300 },
  { text: "  ✓ identity.so", delay: 600 },
  { text: "  ✓ projects.so (6 loaded)", delay: 800 },
  { text: "  ✓ competitions.so (10 loaded)", delay: 1000 },
  { text: "  ✓ resume.so", delay: 1200 },
  { text: "  ✓ contact.so", delay: 1400 },
  { text: "System ready.", delay: 1700 },
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisibleLines(bootLines.length);
      setShowProgressBar(false);
      onComplete();
      return;
    }

    const lineTimers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    const progressTimer = setTimeout(() => setShowProgressBar(false), 1600);
    const completeTimer = setTimeout(() => onComplete(), 2200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-sm space-y-1 mb-8"
    >
      {bootLines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className={
            line.text.startsWith("  ✓")
              ? "text-term-green"
              : line.text === "System ready."
              ? "text-term-green font-bold"
              : "text-term-muted"
          }
        >
          {line.text}
        </motion.div>
      ))}

      {showProgressBar && (
        <div className="mt-2">
          <div className="w-full h-1 bg-term-border rounded overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-term-green rounded"
            />
          </div>
        </div>
      )}

      {visibleLines >= bootLines.length && (
        <div className="mt-4 pt-4 border-t border-term-border">
          <div className="text-term-muted">
            Type <span className="text-term-blue">help</span> for available commands, or try:
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {["whoami", "projects", "competitions", "resume", "contact"].map((cmd) => (
              <span key={cmd} className="text-term-green text-xs">→ {cmd}</span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BootSequence;
```

---

## Task 14: Terminal — main container

**Files:**
- Create: `src/components/Terminal/Terminal.tsx`

- [ ] **Step 1: Create `src/components/Terminal/Terminal.tsx`**

```tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "./BootSequence";
import CommandLine from "./CommandLine";
import CommandPalette from "./CommandPalette";
import { useTerminal, OutputLine } from "../../hooks/useTerminal";
import Whoami from "../Commands/Whoami";
import Help from "../Commands/Help";
import Projects from "../Commands/Projects";
import Competitions from "../Commands/Competitions";
import Resume from "../Commands/Resume";
import Contact from "../Commands/Contact";
import EasterEggs from "../Commands/EasterEggs";

const knownCommands = ["whoami", "projects", "cat", "competitions", "resume", "contact", "help", "clear", "history"];

const Terminal: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandOutputs, setCommandOutputs] = useState<OutputLine[]>([]);
  const {
    history,
    historyIndex,
    executeCommand,
    navigateHistory,
    getCurrentHistoryCommand,
    getAvailableCommands,
  } = useTerminal();
  const outputEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [commandOutputs, scrollToBottom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>("input[type=text]")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleExecute = useCallback((command: string) => {
    const result = executeCommand(command);
    if (!result) return;

    const parts = result.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");
    const id = `cmd-${Date.now()}`;

    if (cmd === "clear") {
      setCommandOutputs([]);
      return;
    }

    if (cmd === "history") {
      const historyOutput: OutputLine = {
        id,
        command: result,
        content: (
          <div className="space-y-1">
            {history.map((h, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-term-dim text-xs w-8 text-right">{i + 1}</span>
                <span className="text-term-text">{h}</span>
              </div>
            ))}
          </div>
        ),
      };
      setCommandOutputs((prev) => [...prev, historyOutput]);
      return;
    }

    // Check easter eggs
    const easterEggCmds = ["sudo hire me", "neofetch", "fortune", "man kshrugal", "ls ~/.secrets", "whoami --all"];
    if (easterEggCmds.includes(result.toLowerCase())) {
      setCommandOutputs((prev) => [
        ...prev,
        { id, command: result, content: <EasterEggs command={result} /> },
      ]);
      return;
    }

    let content: React.ReactNode;

    switch (cmd) {
      case "whoami":
        content = <Whoami />;
        break;
      case "help":
        content = <Help onCommandClick={handleExecute} />;
        break;
      case "projects":
        content = <Projects args={args} />;
        break;
      case "cat":
        content = <Projects args={args ? `--cat ${args}` : ""} />;
        break;
      case "competitions":
        content = <Competitions />;
        break;
      case "resume":
        content = <Resume args={args} />;
        break;
      case "contact":
        content = <Contact />;
        break;
      default:
        content = (
          <div className="space-y-2">
            <div className="text-term-red">command not found: {cmd}</div>
            <div className="text-term-dim text-xs">type <span className="text-term-blue">help</span> for available commands</div>
          </div>
        );
    }

    setCommandOutputs((prev) => [...prev, { id, command: result, content }]);
  }, [executeCommand, history]);

  const handleHistoryNavigate = (direction: "up" | "down") => {
    navigateHistory(direction);
  };

  return (
    <div className="min-h-screen flex flex-col bg-term-bg">
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onExecute={handleExecute}
      />

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 overflow-y-auto">
        {!booted ? (
          <BootSequence onComplete={() => setBooted(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {commandOutputs.map((output) => (
                <motion.div
                  key={output.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {output.content}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={outputEndRef} />
          </motion.div>
        )}
      </div>

      {booted && (
        <div className="sticky bottom-0 bg-term-bg/95 backdrop-blur-sm border-t border-term-border">
          <CommandLine
            onExecute={handleExecute}
            availableCommands={getAvailableCommands()}
            historyCommand={getCurrentHistoryCommand()}
          />
        </div>
      )}
    </div>
  );
};

export default Terminal;
```

---

## Task 15: BrowseMode — traditional portfolio

**Files:**
- Create: `src/components/Browse/BrowseMode.tsx`

- [ ] **Step 1: Create `src/components/Browse/BrowseMode.tsx`**

This is a clean, scrollable traditional portfolio using the same data. Keep it simple — the terminal mode is the star.

```tsx
import React from "react";
import { profile, stats, currentProjects, pastProjects, competitions, experiences, education } from "../../data/content";
import StatusBadge from "../UI/StatusBadge";

const BrowseMode: React.FC = () => {
  return (
    <div className="min-h-screen bg-term-bg">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-term-bg/90 backdrop-blur-sm border-b border-term-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
          <span className="font-mono text-sm text-term-green">kshrugal@portfolio</span>
          <div className="flex gap-6 text-xs font-mono">
            {["projects", "competitions", "experience"].map((s) => (
              <a key={s} href={`#${s}`} className="text-term-muted hover:text-term-green transition-colors">#{s}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-term-text mb-4">{profile.name}</h1>
          <div className="text-term-green text-lg mb-2">{profile.role}</div>
          <div className="text-term-blue text-sm mb-6">{profile.education}</div>
          <p className="text-term-muted max-w-xl mb-8">{profile.tagline}</p>
          <div className="flex gap-4 text-sm font-mono">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">github →</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">linkedin →</a>
            <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green transition-colors">email →</a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">resume →</a>
          </div>
          <div className="flex gap-6 mt-8 text-xs font-mono text-term-dim">
            <span>{stats.competitions} competitions</span>
            <span>{stats.projects} projects</span>
            <span>{stats.experiences} experiences</span>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6 border-t border-term-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">projects</h2>
          <div className="space-y-8">
            {[...currentProjects, ...pastProjects].map((p) => (
              <div key={p.id} className="bg-term-surface border border-term-border rounded-lg p-6 hover:border-term-border-active transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-term-text font-bold text-lg">{p.title}</h3>
                  {p.status === "active" && <StatusBadge active label="active" />}
                </div>
                {p.award && <div className="text-term-yellow text-sm mb-2">{p.award}</div>}
                <p className="text-term-muted text-sm mb-4">{p.description}</p>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-term-purple text-xs bg-term-purple/10 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
                      → {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section id="competitions" className="py-16 px-6 border-t border-term-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">competitions</h2>
          <div className="space-y-3">
            {competitions.map((c, i) => (
              <div key={i} className="flex items-center gap-4 py-2 px-3 hover:bg-term-surface rounded transition-colors">
                <span className="text-term-dim text-xs w-16 tabular-nums">{c.date}</span>
                <span className="text-term-text text-sm flex-1">{c.title}</span>
                <span className="text-term-yellow text-xs">{c.award}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="py-16 px-6 border-t border-term-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">experience</h2>
          <div className="space-y-6 mb-12">
            {experiences.map((e, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-term-dim text-xs w-28 flex-shrink-0 tabular-nums pt-0.5">{e.period}</span>
                <div>
                  <div className="text-term-text font-semibold text-sm">{e.title}</div>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">{e.company}</a>
                  <div className="text-term-muted text-xs mt-1">{e.description}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">education</h2>
          <div className="space-y-6">
            {education.map((e, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-term-dim text-xs w-28 flex-shrink-0 tabular-nums pt-0.5">{e.period}</span>
                <div>
                  <div className="text-term-text font-semibold text-sm">{e.degree}</div>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">{e.school}</a>
                  <div className="text-term-muted text-xs mt-1">{e.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-term-border text-center">
        <div className="text-term-dim text-xs font-mono">
          © 2026 {profile.name} · <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green transition-colors">{profile.email}</a>
        </div>
      </footer>
    </div>
  );
};

export default BrowseMode;
```

---

## Task 16: App shell — tie everything together

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx` contents**

```tsx
import { useMode } from "./hooks/useMode";
import ModeSwitcher from "./components/ModeSwitcher";
import Terminal from "./components/Terminal/Terminal";
import BrowseMode from "./components/Browse/BrowseMode";

function App() {
  const { mode, chooseMode } = useMode();

  if (!mode) {
    return <ModeSwitcher onChoose={chooseMode} />;
  }

  if (mode === "terminal") {
    return <Terminal onSwitchMode={() => chooseMode("browse")} />;
  }

  return <BrowseMode onSwitchMode={() => chooseMode("terminal")} />;
}

export default App;
```

- [ ] **Step 2: Delete old components**

```bash
rm src/components/AnimatedSection.tsx \
   src/components/CustomCursor.tsx \
   src/components/Hero.tsx \
   src/components/Navbar.tsx \
   src/components/CurrentProjects.tsx \
   src/components/Projects.tsx \
   src/components/Competitions.tsx \
   src/components/ExperienceEducation.tsx
```

- [ ] **Step 3: Remove unused dependencies**

```bash
npm uninstall typewriter-effect react-icons
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors.

---

## Task 17: Mode toggle in nav

Both modes need a way to switch. Add a small toggle in the corner. Since mode is session-only (no localStorage), the switch just calls a prop to change state in App.

**Files:**
- Modify: `src/components/Terminal/Terminal.tsx` — accept `onSwitchMode` prop
- Modify: `src/components/Browse/BrowseMode.tsx` — accept `onSwitchMode` prop

- [ ] **Step 1: Update Terminal to accept `onSwitchMode` prop**

In `Terminal.tsx`, update the component signature and the switch button:

```tsx
// Update the props interface
interface TerminalProps {
  onSwitchMode: () => void;
}

// Update the component signature
const Terminal: React.FC<TerminalProps> = ({ onSwitchMode }) => {

// Replace the switch button onClick:
<button
  onClick={onSwitchMode}
  className="fixed top-4 right-4 z-50 text-term-dim hover:text-term-green text-xs font-mono transition-colors bg-term-surface border border-term-border rounded px-3 py-1.5 cursor-pointer"
>
  switch to browse mode →
</button>
```

- [ ] **Step 2: Update BrowseMode to accept `onSwitchMode` prop**

In `BrowseMode.tsx`, update the component signature and the switch button:

```tsx
// Update the props interface
interface BrowseModeProps {
  onSwitchMode: () => void;
}

// Update the component signature
const BrowseMode: React.FC<BrowseModeProps> = ({ onSwitchMode }) => {

// Replace the switch button onClick in the nav:
<button
  onClick={onSwitchMode}
  className="text-term-dim hover:text-term-green transition-colors cursor-pointer bg-transparent border-none font-mono text-xs"
>
  → terminal mode
</button>
```

---

## Task 18: Final polish & verification

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Clean build, zero errors.

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 3: Manual test checklist**

Verify:
- [ ] Onboarding screen appears on every visit/reload
- [ ] Choosing "terminal" loads boot sequence, then prompt
- [ ] Choosing "browse" loads traditional layout
- [ ] Typing `whoami` shows identity output
- [ ] Typing `projects` shows project list, clicking expands details
- [ ] Typing `competitions` shows competition history
- [ ] Typing `resume` shows experience, tabs switch to education
- [ ] Typing `contact` shows contact info
- [ ] Typing `help` shows available commands
- [ ] Typing `clear` clears output
- [ ] Typing unknown command shows "command not found"
- [ ] Easter eggs work: `sudo hire me`, `neofetch`, `fortune`, `man kshrugal`
- [ ] `Cmd+K` opens command palette
- [ ] History navigation works with ↑/↓
- [ ] "switch to browse mode" button switches without page reload
- [ ] Browse mode shows all sections, scrolls correctly
- [ ] "→ terminal mode" button switches back without reload
- [ ] Onboarding screen reappears on page reload
- [ ] Mobile: terminal mode shows command input at bottom
- [ ] Mobile: browse mode is responsive

---

## Summary

| Task | What it builds | Deps |
|------|---------------|------|
| 1 | Shared data layer | — |
| 2 | Terminal theme CSS | — |
| 3 | Cursor + StatusBadge | — |
| 4 | useMode hook | — |
| 5 | ModeSwitcher onboarding | Task 4 |
| 6 | useTerminal hook | Task 1 |
| 7 | TerminalPrompt | Task 3 |
| 8 | TerminalOutput | — |
| 9 | Whoami, Help, Contact, EasterEggs | Tasks 1, 7, 8 |
| 10 | Projects, Competitions, Resume | Tasks 1, 7, 8 |
| 11 | CommandLine input | Task 3 |
| 12 | CommandPalette (Cmd+K) | Task 1 |
| 13 | BootSequence | Task 3 |
| 14 | Terminal container | Tasks 6–13 |
| 15 | BrowseMode | Tasks 1, 3 |
| 16 | App shell + cleanup | Tasks 4, 5, 14, 15 |
| 17 | Mode toggle buttons | Tasks 14, 15 |
| 18 | Final verification | All |
