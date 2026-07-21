import React from "react";

interface TerminalOutputProps {
  children: React.ReactNode;
  indent?: number;
  className?: string;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  children,
  indent = 0,
  className = "",
}) => {
  return (
    <div
      className={`font-mono text-sm leading-relaxed ${className}`}
      style={{ paddingLeft: `${indent * 1.5}rem` }}
    >
      {children}
    </div>
  );
};

export default TerminalOutput;
