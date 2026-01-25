import React, { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
