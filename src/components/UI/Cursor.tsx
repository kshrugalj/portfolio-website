import React from "react";

interface CursorProps {
  className?: string;
  style?: React.CSSProperties;
}

const Cursor: React.FC<CursorProps> = ({ className = "", style = {} }) => {
  return (
    <span
      className={`inline-block w-[0.6em] h-[1.15em] bg-term-green align-text-bottom ${className}`}
      style={{ animation: "cursor-blink 1s steps(1) infinite", ...style }}
    />
  );
};

export default Cursor;
