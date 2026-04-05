import React from 'react';
import AmbientNoise from './AmbientNoise';
import CustomScrollbar from './CustomScrollbar';
import MouseGlow from './MouseGlow';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  onRequestPrototype?: () => void;
}

export default function Layout({ children, onRequestPrototype }: LayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Built Better",
    "description": "High-performance, fully managed websites for small business owners. Managed Web Design UK and Small Business Website Support.",
    "url": "https://builtbetter.co.uk",
    "areaServed": "UK",
    "priceRange": "££"
  };

  return (
    <div className="min-h-screen bg-[var(--color-navy)] text-[var(--color-text)] selection:bg-[var(--color-blue)] selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CustomScrollbar />
      <AmbientNoise />

      {/* Aurora + soft blobs — static CSS (scroll-linked 3D/blur was very heavy in Chrome) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <MouseGlow />
        <div className="aurora-layer" aria-hidden>
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
        <div className="absolute top-[-20%] left-[-10%] h-[60vw] w-[60vw] rounded-full bg-blue-600/5 blur-[72px]" />
        <div className="absolute top-[40%] right-[-10%] h-[50vw] w-[50vw] rounded-full bg-cyan-500/5 blur-[72px]" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, black 8%, transparent 45%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 8%, transparent 45%)',
          }}
        />
      </div>
      
      <Navbar onRequestPrototype={onRequestPrototype} />

      {/* Main Content — offset for fixed float nav (safe area + bar + margin) */}
      <main className="relative z-10 overflow-x-clip pt-[max(5.75rem,calc(env(safe-area-inset-top)+4.75rem))] sm:pt-[max(6.25rem,calc(env(safe-area-inset-top)+5.25rem))]">
        {children}
      </main>
    </div>
  );
}
