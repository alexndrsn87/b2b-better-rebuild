import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutTemplate, Shield, Heart } from 'lucide-react';
import FooterCTA from './FooterCTA';

type FooterProps = {
  onRequestPrototype?: () => void;
};

export default function Footer({ onRequestPrototype }: FooterProps) {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[var(--color-navy-light)]/50">
      <FooterCTA onRequestPrototype={onRequestPrototype} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-heading font-extrabold text-2xl tracking-tight text-white flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl object-cover shadow-lg shadow-black/25 ring-1 ring-white/15 shrink-0"
              />
              Built Better
            </Link>
            <div className="text-gray-400 font-sans max-w-sm mb-10 space-y-4 leading-relaxed">
              <p>Professional sites for local businesses—built for you, managed by us.</p>
              <p>Save time and keep your online presence sharp without living in a dashboard.</p>
            </div>
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
                <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-blue-400 transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Support</h4>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/whatsapp" className="hover:text-blue-400 transition-colors">
                  WhatsApp Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
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
