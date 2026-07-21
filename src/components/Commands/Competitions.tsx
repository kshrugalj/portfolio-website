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
