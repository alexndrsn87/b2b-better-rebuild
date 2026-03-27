import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { TextReveal } from './TextReveal';
import PrototypeOffer from './PrototypeOffer';

function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.15)',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseXRel = e.clientX - rect.left;
    const mouseYRel = e.clientY - rect.top;
    x.set(mouseXRel / rect.width - 0.5);
    y.set(mouseYRel / rect.height - 0.5);
    mouseX.set(mouseXRel);
    mouseY.set(mouseYRel);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative glass-card transition-shadow duration-300 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
        }}
      />
      <div style={{ transform: 'translateZ(30px)' }} className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

const tiers = [
  {
    name: 'The Starter',
    setup: 299,
    monthly: 25,
    popular: false,
    features: ['1-page professional site', 'Domain setup', 'Hosting included', 'WhatsApp support'],
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    name: 'The Business',
    setup: 399,
    monthly: 35,
    popular: true,
    features: [
      '4-page custom site',
      'Professional copy',
      'Domain management',
      'Unlimited content updates',
    ],
    glow: 'rgba(6, 182, 212, 0.22)',
  },
  {
    name: 'The Growth',
    setup: 599,
    monthly: 50,
    popular: false,
    features: [
      'Everything in Business',
      'Google Business Profile setup',
      'Basic SEO pack',
      'Monthly performance reports',
    ],
    glow: 'rgba(168, 85, 247, 0.18)',
  },
];

const addOns = [
  { label: 'Extra Pages', price: '£49' },
  { label: 'Booking Widgets', price: '£75' },
  { label: 'Monthly Blog', price: '£60/mo' },
  { label: 'Social Media Graphics', price: '£75' },
];

type PricingProps = {
  onRequestPrototype?: () => void;
};

export default function Pricing({ onRequestPrototype }: PricingProps) {
  return (
    <section id="pricing" className="py-[var(--section-py)] relative z-10 overflow-x-hidden overflow-y-visible">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[5%] w-48 h-48 rounded-full bg-pink-500/10 blur-xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[15%] right-[5%] w-64 h-64 rounded-full bg-cyan-500/10 blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold mb-6 text-white">
            <TextReveal text="Clear plans. Recurring value." />
          </h2>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ delay: 0.2 }}
          >
            Pick a tier that fits how you work. One setup fee, then a fixed monthly cost—so you always know what
            you&apos;re paying, with no surprise invoices.
          </motion.p>
        </div>

        <div className="mb-14">
          <PrototypeOffer onRequestPrototype={onRequestPrototype} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ delay: index * 0.1 }}
              className="flex relative overflow-visible"
            >
              <TiltCard
                className={`p-8 md:p-10 flex flex-col h-full w-full overflow-visible ${tier.popular ? 'border-cyan-500/35' : ''}`}
                glowColor={tier.glow}
              >
                {tier.popular && (
                  <div
                    className="pointer-events-none absolute -top-5 -right-5 z-30 flex rotate-[10deg] items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(37,99,235,0.55)] ring-2 ring-white/30 sm:-top-6 sm:-right-6 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-white">{tier.name}</h3>
                  <p className="text-gray-400 text-sm font-sans mb-6">
                    {tier.popular
                      ? 'Best for most local businesses that need room to grow.'
                      : tier.name === 'The Starter'
                        ? 'A sharp single page that converts—ideal if you want to start simple.'
                        : 'Full visibility online with reporting you can actually use.'}
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-white">£{tier.setup}</span>
                    <span className="text-gray-400 text-sm">setup</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-2xl font-semibold text-cyan-400">+ £{tier.monthly}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-10 flex-1 text-gray-300 font-sans text-sm md:text-base">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => onRequestPrototype?.()}
                    className={tier.popular ? 'btn-primary btn-shimmer w-full text-lg py-3' : 'btn-secondary w-full text-lg py-3'}
                  >
                    Get started
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-3xl mx-auto glass-card p-8 md:p-10"
        >
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-2 text-center">Add-ons</h3>
          <p className="text-center text-gray-400 text-sm font-sans mb-8">
            Bolt these on whenever you need them—no pressure, no jargon.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            {addOns.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-4 py-3 px-4 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <span className="text-gray-300 text-sm md:text-base">{item.label}</span>
                <span className="text-white font-heading font-semibold tabular-nums">{item.price}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
