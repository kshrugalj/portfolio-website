import React from "react";
import { motion } from "framer-motion";
import { type Mode } from "../hooks/useMode";

interface ModeSwitcherProps {
  onChoose: (mode: Mode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ onChoose }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 border-[3px] border-black m-2 md:m-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-[560px] w-full"
      >
        <div className="border-[3px] border-black bg-white">
          <div className="bg-black text-white px-4 py-2 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">kshrugal@portfolio — select mode</span>
            <span className="font-mono text-[10px]">● ● ●</span>
          </div>

          <div className="p-6 md:p-8 text-center">
            <div className="font-display text-[28px] md:text-[32px] leading-none tracking-[-0.02em] uppercase">Choose your experience</div>
            <p className="font-mono text-[11px] tracking-wide opacity-60 mt-3">Two ways in — same rawblock system</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 text-left">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoose("terminal")}
                className="group text-left border-[3px] border-black p-5 bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-50 group-hover:text-white/60">01 — Terminal</div>
                <div className="font-display text-[16px] uppercase leading-none mt-2">Interactive Terminal</div>
                <p className="font-sans text-[12px] leading-snug opacity-60 group-hover:text-white/70 mt-2">
                  Type commands to explore. For developers and power users.
                </p>
                <div className="mt-4 font-mono text-[10px] tracking-wide border border-black px-2 py-1 inline-flex group-hover:border-white group-hover:text-white">
                  &gt;_ enter
                </div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoose("browse")}
                className="group text-left border-[3px] border-black p-5 bg-black text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-50 group-hover:opacity-50">02 — Browse</div>
                <div className="font-display text-[16px] uppercase leading-none mt-2">Browse Mode</div>
                <p className="font-sans text-[12px] leading-snug opacity-60 group-hover:opacity-60 mt-2">
                  Scroll and click. Editorial portfolio — Rayhan layout × RawBlock.
                </p>
                <div className="mt-4 font-mono text-[10px] tracking-wide border border-white px-2 py-1 inline-flex group-hover:border-black">
                  ◎ view
                </div>
              </motion.button>
            </div>

            <p className="font-mono text-[10px] tracking-wide opacity-40 mt-6">Choice persists until you clear site data. You can switch anytime.</p>
          </div>

          <div className="border-t-[3px] border-black px-4 py-2 flex justify-between font-mono text-[10px] tracking-[0.1em] uppercase opacity-60">
            <span>RawBlock · 2026</span>
            <span>0px radius · 3px border · no shadow</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeSwitcher;
