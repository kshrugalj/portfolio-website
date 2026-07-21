import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { commands as commandList } from "../data/content";

export interface OutputLine {
  id: string;
  command?: string;
  content: ReactNode;
  isError?: boolean;
}

export function useTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [executedCommands, setExecutedCommands] = useState<Set<string>>(new Set());

  const addOutput = useCallback((line: OutputLine) => {
    setOutput((prev) => [...prev, line]);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const getAvailableCommands = useCallback(() => {
    return commandList.map((c) => c.name);
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up") {
        setHistoryIndex((prev) => {
          const next = Math.min(prev + 1, history.length - 1);
          return next;
        });
      } else {
        setHistoryIndex((prev) => {
          const next = Math.max(prev - 1, -1);
          return next;
        });
      }
    },
    [history.length]
  );

  const getCurrentHistoryCommand = useCallback(() => {
    if (historyIndex === -1) return "";
    return history[history.length - 1 - historyIndex] ?? "";
  }, [history, historyIndex]);

  const executeCommand = useCallback(
    (command: string) => {
      const trimmed = command.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setExecutedCommands((prev) => new Set(prev).add(trimmed.split(" ")[0]));

      return trimmed;
    },
    []
  );

  return {
    output,
    addOutput,
    clearOutput,
    history,
    historyIndex,
    executedCommands,
    executeCommand,
    navigateHistory,
    getCurrentHistoryCommand,
    getAvailableCommands,
  };
}
