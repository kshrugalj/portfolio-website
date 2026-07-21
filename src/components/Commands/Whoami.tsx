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
          <div className="flex items-center gap-4">
            <img src="/profile.jpg" alt="Kshrugal" className="w-16 h-16 rounded-full border border-term-border object-cover" />
            <div>
              <div className="text-term-text text-lg font-bold">{profile.name}</div>
              <div className="text-term-green">{profile.role}</div>
              <div className="text-term-blue text-xs">{profile.education}</div>
            </div>
          </div>
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
