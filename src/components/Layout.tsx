import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]);
  const rotate = useTransform(scrollY, [0, 3000], [0, 120]);
  
  // Spatial Scroll effect (Z-axis movement)
  const gridZ = useTransform(scrollY, [0, 3000], [0, 1000]);
  const gridOpacity = useTransform(scrollY, [0, 500], [0.2, 0.05]);

  // Scroll Progress Line (Lusion style)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      
      {/* Scroll Progress Line (Left Rail) */}
      <div className="fixed left-6 top-0 bottom-0 w-[1px] bg-white/5 z-50 hidden lg:block">
        <motion.div 
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-blue-400 to-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        />
      </div>

      {/* 3D Parallax Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
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
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[var(--color-navy)]/70 backdrop-blur-xl">
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
                <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">How it Works</a>
                <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#pricing" className="btn-primary text-sm px-6 py-2.5">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
