import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';

type NavbarProps = {
  onRequestPrototype?: () => void;
};

const linkClass = 'text-sm font-medium text-gray-300 hover:text-white transition-colors';

export default function Navbar({ onRequestPrototype }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const glassStyle: React.CSSProperties = {
    background: scrolled
      ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(7,11,20,0.72) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(10,17,40,0.45) 100%)',
    backdropFilter: scrolled ? 'blur(48px) saturate(230%)' : 'blur(36px) saturate(220%)',
    WebkitBackdropFilter: scrolled ? 'blur(48px) saturate(230%)' : 'blur(36px) saturate(220%)',
    boxShadow: scrolled
      ? '0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
      : '0 8px 44px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.06)',
  };

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `${linkClass} ${isActive ? 'text-white' : ''}`;

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={glassStyle}
      className={`sticky top-0 z-50 border-b transition-[border-color] duration-300 ${
        scrolled ? 'border-white/18' : 'border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex-shrink-0 min-w-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/"
                className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                  <span className="text-white text-sm font-bold">B</span>
                </div>
                <span className="truncate">Built Better</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-wrap justify-end">
            <div className="flex items-center gap-4 sm:gap-6" role="navigation" aria-label="Main">
              <NavLink to="/" end className={navItem}>
                Home
              </NavLink>
              <NavLink to="/what-we-do" className={navItem}>
                What We Do
              </NavLink>
              <NavLink to="/pricing" className={navItem}>
                Pricing
              </NavLink>
            </div>
            <motion.button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-primary btn-shimmer text-xs sm:text-sm px-4 sm:px-6 py-2.5 shrink-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
