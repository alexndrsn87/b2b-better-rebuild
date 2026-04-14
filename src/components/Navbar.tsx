import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link, NavLink } from 'react-router-dom';
import NavGetStartedButton from './NavGetStartedButton';

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
        background: scrolled ? 'rgba(7, 10, 18, 0.52)' : 'rgba(7, 10, 18, 0.38)',
        backdropFilter: 'blur(28px) saturate(185%)',
        WebkitBackdropFilter: 'blur(28px) saturate(185%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: scrolled
          ? '0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.2)'
          : '0 10px 42px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.15)',
      }) as React.CSSProperties,
    [scrolled],
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'nav-link whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.98rem] font-medium tracking-[-0.02em] transition-[color,background-color] duration-200 sm:px-3 sm:py-2 sm:text-[1.0625rem] md:text-[1.125rem]',
      isActive
        ? 'bg-white/[0.08] font-semibold text-[var(--color-accent)] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.22)]'
        : 'text-white/[0.88] hover:bg-white/[0.06] hover:text-white',
    ].join(' ');

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={glassStyle}
      className="fixed top-[max(1.5rem,calc(env(safe-area-inset-top)+0.65rem))] left-1/2 z-[100] flex min-h-[3.25rem] w-[94%] max-w-7xl -translate-x-1/2 flex-wrap items-center justify-between gap-3 rounded-full px-4 py-3 sm:min-h-[3.5rem] sm:gap-4 sm:px-7 sm:py-3.5 md:flex-nowrap md:gap-5 md:px-8"
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
        <span className="truncate font-heading text-[1.125rem] font-extrabold tracking-[-0.03em] text-white sm:text-xl md:text-2xl">
          Built Better
        </span>
      </Link>

      <div className="order-3 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 md:order-none md:w-auto md:gap-x-2 lg:gap-x-3">
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

      <div className="shrink-0">
        <NavGetStartedButton onClick={() => onRequestPrototype?.()} />
      </div>
    </motion.nav>
  );
}
