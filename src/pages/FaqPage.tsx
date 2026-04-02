import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

const faqs = [
  {
    q: 'How does the £49 prototype work?',
    a:
      'You tell us about your business. We deliver a custom interactive homepage preview within 24 hours. The preview link is valid for 7 days. If you go ahead with a full build, the £49 comes off your setup fee.',
  },
  {
    q: 'What do I get each month after launch?',
    a:
      'Hosting, SSL, security updates, and unlimited reasonable content changes via WhatsApp—things like text, images, opening hours, and menu tweaks. Large new features or extra pages may be quoted separately.',
  },
  {
    q: 'Do I own my website?',
    a:
      'You own your content, branding, and domain. The way we structure agreements is explained in our Terms of Service. We’re happy to clarify anything before you commit.',
  },
  {
    q: 'Can you help with my domain and email?',
    a:
      'Yes. We can guide you through domain connection and basic DNS. Business email setup depends on your provider; we’ll tell you what we can do within your plan.',
  },
  {
    q: 'What if I need to cancel?',
    a:
      'You can stop your monthly plan according to the notice period in your agreement. We’ll explain what happens to hosting and access so there are no surprises.',
  },
  {
    q: 'Are you only for UK businesses?',
    a:
      'We’re set up for UK local businesses—time zones, copy, and SEO are tuned for that. If you’re nearby but cross-border, message us and we’ll see if it’s a fit.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.p className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.p>

        <div className="text-center mb-12">
          <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-blue-400/90 mb-4">
            Help
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white leading-tight">
            <TextReveal text="Frequently asked questions" />
          </h1>
          <motion.p
            className="text-lg text-gray-400 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Straight answers about prototypes, monthly support, and how we work with local businesses.
          </motion.p>
        </div>

        <ul className="space-y-3 font-sans">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={item.q} className="glass-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 text-white font-heading font-semibold text-base md:text-lg hover:bg-white/[0.03] transition-colors"
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-gray-400 leading-relaxed text-sm md:text-base border-t border-white/5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <motion.p
          className="mt-10 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Still stuck?{' '}
          <Link to="/whatsapp" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Message us on WhatsApp
          </Link>
          .
        </motion.p>
      </div>
    </section>
  );
}
