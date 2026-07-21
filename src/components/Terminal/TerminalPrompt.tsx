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
