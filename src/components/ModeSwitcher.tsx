import React from "react";
import { motion } from "framer-motion";
import { type Mode } from "../hooks/useMode";

interface ModeSwitcherProps {
  onChoose: (mode: Mode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ onChoose }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-term-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full text-center"
      >
        <div className="mb-8">
          <span className="text-term-green text-sm font-mono">$</span>
          <span className="text-term-muted text-sm font-mono ml-2">welcome</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-term-text mb-3 font-mono">
          kshrugal@portfolio
        </h1>
        <p className="text-term-muted text-sm font-mono mb-12">
          choose your experience
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoose("terminal")}
            className="group relative px-8 py-5 bg-term-surface border border-term-border rounded-lg hover:border-term-green transition-colors duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-term-green text-lg">&gt;</span>
              <span className="text-term-text font-semibold font-mono">Interactive Terminal</span>
            </div>
            <p className="text-term-muted text-xs font-mono pl-7">
              Type commands to explore. For developers and power users.
            </p>
            <span className="absolute top-3 right-3 text-term-dim text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌘K
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoose("browse")}
            className="group relative px-8 py-5 bg-term-surface border border-term-border rounded-lg hover:border-term-blue transition-colors duration-200 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-term-blue text-lg">◎</span>
              <span className="text-term-text font-semibold font-mono">Browse Mode</span>
            </div>
            <p className="text-term-muted text-xs font-mono pl-7">
              Scroll and click. Traditional portfolio experience.
            </p>
          </motion.button>
        </div>

        <p className="text-term-dim text-xs font-mono mt-8">
          choose again on your next visit
        </p>
      </motion.div>
    </div>
  );
};

export default ModeSwitcher;
