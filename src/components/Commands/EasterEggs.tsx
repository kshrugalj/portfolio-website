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
