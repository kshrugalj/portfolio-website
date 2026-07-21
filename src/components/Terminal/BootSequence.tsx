import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  { text: "BIOS v3.2.1 — Portfolio System", delay: 0 },
  { text: "Initializing modules...", delay: 300 },
  { text: "  ✓ identity.so", delay: 600 },
  { text: "  ✓ projects.so (6 loaded)", delay: 800 },
  { text: "  ✓ competitions.so (10 loaded)", delay: 1000 },
  { text: "  ✓ resume.so", delay: 1200 },
  { text: "  ✓ contact.so", delay: 1400 },
  { text: "System ready.", delay: 1700 },
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showProgressBar, setShowProgressBar] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisibleLines(bootLines.length);
      setShowProgressBar(false);
      onComplete();
      return;
    }

    const lineTimers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    const progressTimer = setTimeout(() => setShowProgressBar(false), 1600);
    const completeTimer = setTimeout(() => onComplete(), 2200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-sm space-y-1 mb-8"
    >
      {bootLines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className={
            line.text.startsWith("  ✓")
              ? "text-term-green"
              : line.text === "System ready."
                ? "text-term-green font-bold"
                : "text-term-muted"
          }
        >
          {line.text}
        </motion.div>
      ))}

      {showProgressBar && (
        <div className="mt-2">
          <div className="w-full h-1 bg-term-border rounded overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-term-green rounded"
            />
          </div>
        </div>
      )}

      {visibleLines >= bootLines.length && (
        <div className="mt-4 pt-4 border-t border-term-border">
          <div className="flex items-center gap-4">
            <img src="/profile.jpg" alt="Kshrugal" className="w-20 h-20 rounded-full border border-term-border object-cover" />
            <div>
              <div className="text-term-text font-bold">Kshrugal Jangalapalli</div>
              <div className="text-term-green text-xs">System ready.</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BootSequence;
