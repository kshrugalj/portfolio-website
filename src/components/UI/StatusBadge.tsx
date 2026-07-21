import React from "react";

interface StatusBadgeProps {
  active: boolean;
  label?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ active, label }) => {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span
        className={`w-2 h-2 rounded-full ${active ? "bg-term-green" : "bg-term-yellow"}`}
        style={active ? { animation: "cursor-blink 2s steps(1) infinite" } : undefined}
      />
      {label && (
        <span className={active ? "text-term-green" : "text-term-yellow"}>
          {label}
        </span>
      )}
    </span>
  );
};

export default StatusBadge;
