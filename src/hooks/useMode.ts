import { useState } from "react";

export type Mode = "terminal" | "browse" | null;

export function useMode() {
  const [mode, setMode] = useState<Mode>(null);

  const chooseMode = (selected: Mode) => {
    setMode(selected);
  };

  return { mode, chooseMode };
}
