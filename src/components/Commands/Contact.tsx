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
