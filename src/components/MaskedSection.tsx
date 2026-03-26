import React from 'react';
import { motion } from 'motion/react';

interface MaskedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function MaskedSection({ children, className = "", id }: MaskedSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
      whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
