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
        <span className="text-term-green flex-shrink-0">kshrugal@portfolio</span>
        <span className="text-term-blue flex-shrink-0">~</span>
        <span className="text-term-muted flex-shrink-0">$</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleTab}
            disabled={disabled}
            className="w-full bg-transparent border-none outline-none text-term-text font-mono text-sm caret-transparent"
            placeholder={disabled ? "" : "type a command..."}
            autoComplete="off"
            spellCheck={false}
          />
          <Cursor className="absolute top-1/2 -translate-y-1/2" style={{ left: `${input.length * 0.602}em` }} />
        </div>
      </form>
    </div>
  );
};

export default CommandLine;
