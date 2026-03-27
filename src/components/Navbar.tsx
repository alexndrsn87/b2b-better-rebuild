import React from 'react';
import { motion } from 'motion/react';

type NavbarProps = {
  onRequestPrototype?: () => void;
};

export default function Navbar({ onRequestPrototype }: NavbarProps) {
  const glassStyle: React.CSSProperties = {
    background: 'rgba(10, 17, 40, 0.42)',
    backdropFilter: 'blur(24px) saturate(200%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
    boxShadow:
      '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.04)',
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={glassStyle}
      className="sticky top-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <motion.a
              href="#"
              className="font-heading font-bold text-2xl tracking-tight text-white flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              Built Better
            </motion.a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <motion.button
                type="button"
                onClick={() => onRequestPrototype?.()}
                className="btn-primary text-sm px-6 py-2.5"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
