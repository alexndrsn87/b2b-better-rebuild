import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';

type NavbarProps = {
  onRequestPrototype?: () => void;
};

/**
 * Frosted bar matches Built-Better---Blob-Site: inline backdropFilter on the nav
 * + very transparent tint (rgba(..., 0.18)) so blur reads. Renders in Layout (no portal).
 */
export default function Navbar({ onRequestPrototype }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const glassStyle = useMemo(
    () =>
      ({
        background: scrolled ? 'rgba(7, 11, 20, 0.28)' : 'rgba(7, 11, 20, 0.18)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: scrolled
          ? '0 10px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.06)'
          : '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.06)',
      }) as React.CSSProperties,
    [scrolled],
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'whitespace-nowrap rounded-full px-1 py-0.5 text-sm font-medium transition-colors sm:text-base md:text-[1.05rem]',
      isActive ? 'font-semibold text-[var(--color-accent)]' : 'text-white/80 hover:text-white',
    ].join(' ');

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={glassStyle}
      className="fixed top-[max(1.75rem,calc(env(safe-area-inset-top)+0.75rem))] left-1/2 z-[100] flex w-[94%] max-w-7xl -translate-x-1/2 flex-wrap items-center justify-between gap-3 rounded-full px-4 py-3 sm:px-6 sm:py-4 md:flex-nowrap"
      aria-label="Main navigation"
    >
      <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
        <img
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-white/15 sm:h-10 sm:w-10"
        />
        <span className="truncate font-heading text-lg font-extrabold tracking-tight text-white sm:text-xl md:text-2xl">
          Built Better
        </span>
      </Link>

      <div className="order-3 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium sm:gap-x-6 md:order-none md:w-auto md:gap-x-7 lg:gap-x-9">
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/how-it-works" className={navLinkClass}>
          How it works
        </NavLink>
        <NavLink to="/pricing" className={navLinkClass}>
          Pricing
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </div>

      <motion.button
        type="button"
        onClick={() => onRequestPrototype?.()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-primary btn-shimmer shrink-0 rounded-full px-4 py-2 text-sm font-semibold sm:px-6 sm:py-2.5 sm:text-base"
      >
        Get Started
      </motion.button>
    </motion.nav>
  );
}
