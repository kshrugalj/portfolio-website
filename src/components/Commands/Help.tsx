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
