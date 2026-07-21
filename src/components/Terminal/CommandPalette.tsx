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
