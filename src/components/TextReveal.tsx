import React from 'react';
import { motion } from 'motion/react';

export function TextReveal({ text, className = "" }: { text: string, className?: string }) {
  const words = text.split(" ");
  
  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: "100%", opacity: 0, rotate: 5 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.08, 
              ease: [0.33, 1, 0.68, 1], // Custom spring-like easing
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
