import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "./BootSequence";
import CommandLine from "./CommandLine";
import CommandPalette from "./CommandPalette";
import { useTerminal, type OutputLine } from "../../hooks/useTerminal";
import Whoami from "../Commands/Whoami";
import Help from "../Commands/Help";
import Projects from "../Commands/Projects";
import Competitions from "../Commands/Competitions";
import Resume from "../Commands/Resume";
import Contact from "../Commands/Contact";
import EasterEggs from "../Commands/EasterEggs";

interface TerminalProps {
  onSwitchMode: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onSwitchMode }) => {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandOutputs, setCommandOutputs] = useState<OutputLine[]>([]);
  const {
    history,
    executeCommand,
    getCurrentHistoryCommand,
    getAvailableCommands,
  } = useTerminal();
  const outputEndRef = useRef<HTMLDivElement>(null);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setCommandOutputs([{
      id: "welcome",
      content: (
        <div className="space-y-2">
          <div className="text-term-green text-sm">System ready. Welcome, User.</div>
          <div className="text-term-text text-sm">
            Type <span className="text-term-blue font-bold">help</span> to see all available commands.
          </div>
        </div>
      ),
    }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [commandOutputs, scrollToBottom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>("input[type=text]")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleExecute = useCallback(
    (command: string) => {
      const result = executeCommand(command);
      if (!result) return;

      const parts = result.split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1).join(" ");
      const id = `cmd-${Date.now()}`;

      if (cmd === "clear") {
        setCommandOutputs([]);
        return;
      }

      if (cmd === "history") {
        const historyOutput: OutputLine = {
          id,
          command: result,
          content: (
            <div className="space-y-1">
              {history.map((h, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-term-dim text-xs w-8 text-right">{i + 1}</span>
                  <span className="text-term-text">{h}</span>
                </div>
              ))}
            </div>
          ),
        };
        setCommandOutputs((prev) => [...prev, historyOutput]);
        return;
      }

      // Check easter eggs
      const easterEggCmds = ["sudo hire me", "neofetch", "fortune", "man kshrugal", "ls ~/.secrets", "whoami --all"];
      if (easterEggCmds.includes(result.toLowerCase())) {
        setCommandOutputs((prev) => [
          ...prev,
          { id, command: result, content: <EasterEggs command={result} /> },
        ]);
        return;
      }

      let content: React.ReactNode;

      switch (cmd) {
        case "whoami":
          content = <Whoami />;
          break;
        case "help":
          content = <Help onCommandClick={handleExecute} />;
          break;
        case "projects":
          content = <Projects args={args} />;
          break;
        case "cat":
          content = <Projects args={args ? `--cat ${args}` : ""} />;
          break;
        case "competitions":
          content = <Competitions />;
          break;
        case "resume":
          content = <Resume args={args} />;
          break;
        case "contact":
          content = <Contact />;
          break;
        case "browse":
          onSwitchMode();
          content = (
            <div className="text-term-green">
              Switching to browse mode...
            </div>
          );
          break;
        default:
          content = (
            <div className="space-y-2">
              <div className="text-term-red">command not found: {cmd}</div>
              <div className="text-term-dim text-xs">type <span className="text-term-blue">help</span> for available commands</div>
            </div>
          );
      }

      setCommandOutputs((prev) => [...prev, { id, command: result, content }]);
    },
    [executeCommand, history],
  );

  return (
    <div className="min-h-screen flex flex-col bg-term-bg">
      <button
        onClick={onSwitchMode}
        className="fixed top-4 right-4 z-50 text-term-dim hover:text-term-green text-xs font-mono transition-colors bg-term-surface border border-term-border rounded px-3 py-1.5 cursor-pointer"
      >
        switch to browse mode →
      </button>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onExecute={handleExecute}
      />

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 overflow-y-auto">
        <BootSequence onComplete={handleBootComplete} />

        {booted && commandOutputs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 mt-6"
          >
            <AnimatePresence mode="wait">
              {commandOutputs.map((output) => (
                <motion.div
                  key={output.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {output.content}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={outputEndRef} />
          </motion.div>
        )}
      </div>

      {booted && (
        <div className="sticky bottom-0 bg-term-bg/95 backdrop-blur-sm border-t border-term-border">
          <CommandLine
            onExecute={handleExecute}
            availableCommands={getAvailableCommands()}
            historyCommand={getCurrentHistoryCommand()}
          />
        </div>
      )}
    </div>
  );
};

export default Terminal;
