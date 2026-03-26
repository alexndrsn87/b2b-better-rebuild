import React from 'react';
import { motion } from 'motion/react';

export function TextReveal({ text, className = "" }: { text: string, className?: string }) {
  const words = text.split(" ");
  
  return (
    <motion.span 
      className={`inline-flex flex-wrap gap-x-2 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
          }
        }
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0, rotate: 5 },
              visible: { 
                y: 0, opacity: 1, rotate: 0,
                transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
              }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
