import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutTemplate, Shield, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

type FooterProps = {
  onRequestPrototype?: () => void;
};

export default function Footer({ onRequestPrototype }: FooterProps) {
  return (
    <footer className="bg-[var(--color-navy-light)]/50 border-t border-white/10 relative z-10 overflow-hidden">
      <div className="py-[var(--section-py)] relative border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[100px]"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-cyan-400/85 mb-4">
            Next step
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
            <TextReveal text="Ready to get started?" />
          </h2>
          <motion.p
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            See how simple fixed pricing can be—or tell us what you need and we&apos;ll come back with a clear next
            step.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/pricing" className="btn-primary btn-shimmer text-lg group inline-flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2" />
                See Your Demo
              </Link>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-secondary text-lg group inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Message us
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-heading font-bold text-2xl tracking-tight text-white flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              Built Better
            </Link>
            <p className="text-gray-400 font-sans max-w-sm mb-8 leading-relaxed">
              Professional sites for local businesses—built for you, managed by us. Save time and keep your online
              presence sharp without living in a dashboard.
            </p>
            <div className="flex space-x-5">
              <span className="text-gray-400">
                <LayoutTemplate className="w-5 h-5" />
              </span>
              <span className="text-gray-400">
                <Shield className="w-5 h-5" />
              </span>
              <span className="text-gray-400">
                <Heart className="w-5 h-5" />
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Site</h4>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="hover:text-blue-400 transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Support</h4>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 font-sans text-sm">
            &copy; {new Date().getFullYear()} Built Better. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
            <span>Proudly serving the UK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Built to last</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
