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
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const items = activeTab === "experience" ? experiences : education;

  const handleToggle = (idx: number, hasBullets: boolean) => {
    if (!hasBullets) return;
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4">
      <TerminalPrompt command={args ? `resume ${args}` : "resume"} />
      <TerminalOutput indent={1}>
        <div className="flex gap-4 mb-4 border-b border-term-border pb-2">
          <button
            onClick={() => {
              setActiveTab("experience");
              setExpandedIdx(null);
            }}
            className={`text-xs font-mono cursor-pointer bg-transparent border-none ${activeTab === "experience" ? "text-term-green" : "text-term-muted hover:text-term-text"}`}
          >
            {activeTab === "experience" && "▸ "}experience
          </button>
          <button
            onClick={() => {
              setActiveTab("education");
              setExpandedIdx(null);
            }}
            className={`text-xs font-mono cursor-pointer bg-transparent border-none ${activeTab === "education" ? "text-term-green" : "text-term-muted hover:text-term-text"}`}
          >
            {activeTab === "education" && "▸ "}education
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const hasBullets = "bullets" in item && Array.isArray((item as { bullets?: string[] }).bullets) && (item as { bullets?: string[] }).bullets!.length > 0;
            const isExpanded = expandedIdx === i && activeTab === "experience" && hasBullets;
            const bullets = hasBullets ? (item as { bullets?: string[] }).bullets! : [];
            return (
              <div
                key={i}
                onClick={() => handleToggle(i, hasBullets)}
                role={hasBullets ? "button" : undefined}
                tabIndex={hasBullets ? 0 : undefined}
                aria-expanded={hasBullets ? isExpanded : undefined}
                onKeyDown={(e) => {
                  if (hasBullets && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleToggle(i, hasBullets);
                  }
                }}
                className={`flex gap-4 rounded transition-colors ${hasBullets ? "cursor-pointer hover:bg-term-surface/60 -mx-2 px-2 py-2" : "py-1"} ${isExpanded ? "bg-term-surface/80 border border-term-border/50 !hover:bg-term-surface/80" : ""} ${hasBullets && !isExpanded ? "group" : ""}`}
              >
                <div className="text-term-dim text-xs w-36 flex-shrink-0 tabular-nums pt-0.5 whitespace-nowrap">{item.period}</div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className={`font-semibold text-sm ${isExpanded ? "text-term-green" : "text-term-text group-hover:text-term-green"} transition-colors`}>
                      {"title" in item ? item.title : item.degree}
                    </div>
                    {hasBullets && (
                      <span
                        className={`text-[10px] leading-none transition-all duration-200 flex items-center justify-center w-4 h-4 rounded ${isExpanded ? "bg-term-green/15 text-term-green rotate-90" : "text-term-dim group-hover:text-term-green group-hover:bg-term-surface border border-transparent group-hover:border-term-border"}`}
                      >
                        ▸
                      </span>
                    )}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-term-blue hover:text-term-green text-xs transition-colors inline-block"
                  >
                    {"company" in item ? item.company : item.school}
                  </a>
                  <div className="text-term-muted text-xs leading-relaxed">{item.description}</div>
                  {hasBullets && isExpanded && (
                    <ul className="mt-3 space-y-1.5 border-t border-term-border/50 pt-3 animate-[fadeIn_150ms_ease]">
                      {bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2 text-xs leading-relaxed text-term-muted">
                          <span className="text-term-green mt-1 flex-shrink-0 text-[8px]">●</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {hasBullets && !isExpanded && (
                    <div className="text-[10px] font-mono text-term-dim group-hover:text-term-muted transition-colors">click to expand ▾</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </TerminalOutput>
    </div>
  );
};

export default Resume;
