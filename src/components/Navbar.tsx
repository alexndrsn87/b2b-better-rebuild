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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `${linkClass} ${isActive ? 'text-white' : ''}`;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-[max(0.85rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4 pointer-events-none"
      role="presentation"
    >
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={`glass-float-nav pointer-events-auto w-full max-w-7xl px-4 transition-[box-shadow,border-color] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'glass-float-nav--raised' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
          <div className="min-w-0 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/"
                className="flex items-center gap-2.5 font-heading text-lg font-extrabold tracking-tight text-white sm:gap-3 sm:text-xl md:text-2xl"
              >
                <img
                  src="/logo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-lg shadow-black/25 ring-1 ring-white/15 sm:h-10 sm:w-10"
                />
                <span className="truncate">Built Better</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-3 sm:gap-6" role="navigation" aria-label="Main">
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
              className="btn-primary btn-shimmer shrink-0 px-4 py-2.5 text-xs sm:px-6 sm:text-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
