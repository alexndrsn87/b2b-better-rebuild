import { motion, useScroll, useTransform, useSpring } from 'motion/react';

type OrbitElectronsProps = {
  className?: string;
};

/** Electrons orbiting a local area (positioned by parent — trails the thumb). */
function OrbitElectrons({ className = '' }: OrbitElectronsProps) {
  const orbitR = 24;
  const orbitOuter = 32;
  const colors = [
    'bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.95)]',
    'bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.9)]',
    'bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.85)]',
  ];
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative h-full w-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 120, 240].map((deg, i) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${orbitR}px)`,
              }}
            >
              <div className={`h-full w-full rounded-full ${colors[i % colors.length]}`} />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative h-full w-12"
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        >
          {[60, 180, 300].map((deg, i) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-2 w-2"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${orbitOuter}px)`,
              }}
            >
              <div
                className={`h-full w-full rounded-full ${
                  i === 1
                    ? 'bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.85)]'
                    : 'bg-cyan-200/90 shadow-[0_0_10px_rgba(165,243,252,0.75)]'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function CustomScrollbar() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 38,
    mass: 0.75,
    restDelta: 0.001,
  });

  const top = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const y = useTransform(smoothProgress, [0, 1], ['0%', '-100%']);

  const trailTop = top;
  const trailY = y;

  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.18, 0.95]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.45, 0.85, 0.45]);
  const beamHeight = useTransform(smoothProgress, [0, 1], ['24%', '70%']);
  const beamOpacity = useTransform(smoothProgress, [0, 1], [0.3, 0.85]);
  const accentRotate = useTransform(smoothProgress, [0, 1], ['0deg', '240deg']);
  const trackFill = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="pointer-events-none fixed left-3 top-24 bottom-24 z-50 hidden w-14 md:block">
      {/* Spectral halo */}
      <div
        className="absolute left-1/2 top-1/2 h-[min(72vh,560px)] w-14 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.28] mix-blend-screen blur-[14px]"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full opacity-90"
          style={{
            background:
              'conic-gradient(from 200deg at 50% 40%, rgba(59,130,246,0.45), rgba(34,211,238,0.35), rgba(168,85,247,0.35), rgba(59,130,246,0.45))',
            animation: 'scrollbar-orbit 22s linear infinite',
          }}
        />
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 overflow-hidden rounded-full">
        <div className="absolute inset-0 rounded-full bg-white/[0.07] shadow-[inset_0_0_12px_rgba(0,0,0,0.35)] ring-1 ring-white/10" />
        <motion.div
          style={{ height: trackFill }}
          className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-blue-500/35 via-cyan-400/25 to-sky-500/20 opacity-90 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
        />
        <div
          className="scrollbar-shard absolute left-0 right-0 mx-auto h-16 w-[3px] rounded-full bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-70"
          aria-hidden
        />
      </div>

      <div className="absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 rounded-full bg-white/10" />

      <motion.div
        style={{ top: trailTop, y: trailY }}
        className="absolute left-0 right-0 h-[5.5rem]"
      >
        <OrbitElectrons />
      </motion.div>

      <motion.div
        style={{ height: beamHeight, opacity: beamOpacity }}
        className="absolute bottom-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-t from-blue-400 via-cyan-300 to-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.45)]"
      />

      <motion.div
        style={{ top, y, scale: glowScale, opacity: glowOpacity }}
        className="absolute left-1/2 h-20 w-10 -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-400 via-cyan-300 to-sky-500 blur-[11px]"
      />

      <motion.div
        style={{ top, y }}
        className="absolute left-2 h-20 w-8 rounded-full bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600 shadow-[0_0_24px_rgba(37,99,235,0.55),0_0_8px_rgba(34,211,238,0.4)]"
      >
        <motion.div
          style={{ rotate: accentRotate }}
          className="absolute inset-[3px] rounded-full border border-white/40"
        />
        <div className="absolute inset-[8px] rounded-full bg-white/20 backdrop-blur-sm" />
        <motion.div style={{ rotate: accentRotate }} className="absolute inset-0 rounded-full opacity-40">
          <div className="absolute left-1 top-2 h-6 w-1 rounded-full bg-white/70 blur-[2px]" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ top, y }}
        className="absolute left-1/2 -mt-2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
      />
    </div>
  );
}
