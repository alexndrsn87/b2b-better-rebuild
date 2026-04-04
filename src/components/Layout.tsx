import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import AmbientNoise from './AmbientNoise';
import CustomScrollbar from './CustomScrollbar';
import MouseGlow from './MouseGlow';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  onRequestPrototype?: () => void;
}

export default function Layout({ children, onRequestPrototype }: LayoutProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]);
  const rotate = useTransform(scrollY, [0, 3000], [0, 120]);
  
  // Spatial Scroll effect (Z-axis movement)
  const gridZ = useTransform(scrollY, [0, 3000], [0, 1000]);
  const gridOpacity = useTransform(scrollY, [0, 500], [0.2, 0.05]);

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
    <div className="min-h-screen bg-[var(--color-navy)] text-[var(--color-text)] selection:bg-[var(--color-blue)] selection:text-white relative overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CustomScrollbar />
      <AmbientNoise />

      {/* 3D Parallax + aurora wash */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
        <MouseGlow />
        <div className="aurora-layer" aria-hidden>
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
        <motion.div 
          style={{ y: y1, rotate, translateZ: useTransform(scrollY, [0, 3000], [0, -200]) }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/5 blur-[120px]"
        />
        <motion.div 
          style={{ y: y2, translateZ: useTransform(scrollY, [0, 3000], [0, 300]) }}
          className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px]"
        />
        {/* 3D Perspective Grid with Spatial Scroll */}
        <motion.div 
          style={{ translateZ: gridZ, opacity: gridOpacity }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 w-full h-[200%] origin-top"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transform: 'rotateX(75deg) translateY(-100px) scale(3)',
              maskImage: 'linear-gradient(to bottom, black 5%, transparent 50%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 5%, transparent 50%)'
            }}
          />
        </motion.div>
      </div>
      
      <Navbar onRequestPrototype={onRequestPrototype} />

      {/* Main Content — offset for fixed float nav (safe area + bar + margin) */}
      <main className="relative z-10 pt-[max(5.75rem,calc(env(safe-area-inset-top)+4.75rem))] sm:pt-[max(6.25rem,calc(env(safe-area-inset-top)+5.25rem))]">
        {children}
      </main>
    </div>
  );
}
