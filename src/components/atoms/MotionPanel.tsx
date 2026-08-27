'use client';

import React from "react";
import { motion } from "framer-motion";

const fadeSide = (x: number) => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0 },
});

const motionTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const MotionPanel: React.FC<{
  x?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ x = 0, className, children }) => {
  return (
    <motion.div
      variants={fadeSide(x)}
      initial="hidden"
      animate="visible"
      transition={motionTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionPanel;
