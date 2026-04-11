import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const checkPointer = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const style = target ? window.getComputedStyle(target).cursor : '';
      setIsPointer(style === 'pointer');
    };

    window.addEventListener('mousemove', (e) => {
      moveCursor(e);
      checkPointer(e);
    });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="custom-cursor-container"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      <div className="custom-cursor-dot" />
      <motion.div
        className={`custom-cursor-outline ${isPointer ? 'pointer' : ''}`}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.6 : 0.3,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
