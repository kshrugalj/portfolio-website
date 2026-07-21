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
              <div className="text-term-dim text-xs w-36 flex-shrink-0 tabular-nums pt-0.5 whitespace-nowrap">{item.period}</div>
              <div className="space-y-1">
                <div className="text-term-text font-semibold text-sm">{"title" in item ? item.title : item.degree}</div>
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
