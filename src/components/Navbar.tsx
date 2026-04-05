import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';

type NavbarProps = {
  onRequestPrototype?: () => void;
};

export default function Navbar({ onRequestPrototype }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled(window.scrollY > 32);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shell = (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-center px-3 pt-[max(0.65rem,env(safe-area-inset-top))] sm:px-5 sm:pt-4"
    >
      <nav
        className={`site-nav pointer-events-auto w-full max-w-6xl ${scrolled ? 'site-nav--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="site-nav-brand group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
        >
          <img
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="site-nav-logo h-8 w-8 shrink-0 rounded-[0.65rem] object-cover ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-[0.98] sm:h-9 sm:w-9"
          />
          <span className="truncate font-heading text-base font-extrabold tracking-tight text-white sm:text-lg">
            Built Better
          </span>
        </Link>

        <div className="site-nav-links flex flex-1 flex-wrap items-center justify-center gap-1 sm:gap-0 md:gap-1">
          {(
            [
              { to: '/', end: true, label: 'Home' },
              { to: '/how-it-works', end: false, label: 'How it works' },
              { to: '/pricing', end: false, label: 'Pricing' },
            ] as const
          ).map(({ to, end, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `site-nav-link ${isActive ? 'site-nav-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onRequestPrototype?.()}
          className="site-nav-cta btn-shimmer shrink-0"
        >
          Get Started
        </button>
      </nav>
    </header>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(shell, document.body);
}
