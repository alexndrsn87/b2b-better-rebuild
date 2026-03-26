import React from 'react';
import { LayoutTemplate, Shield, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-light)]/50 border-t border-white/10 relative z-10 overflow-hidden">
      {/* CTA Section */}
      <div className="py-20 relative border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[100px]"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">
            <TextReveal text="Ready to get started?" />
          </h2>
          <motion.p 
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Stop worrying about your website and get back to running your business. Let's build something great together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a 
              href="#pricing"
              className="btn-primary text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get the £49 prototype
            </motion.a>
            <motion.a 
              href="#"
              className="btn-secondary text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Message us on WhatsApp
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="font-heading font-bold text-2xl tracking-tight text-white flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              Built Better
            </a>
            <p className="text-gray-400 font-sans max-w-sm mb-8 leading-relaxed">
              The last website your business will ever need. We build it fast, host it forever, and manage it so you don't have to.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <LayoutTemplate className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Shield className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Heart className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">The £49 Prototype</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Essential Package</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Growth Package</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Support</h4>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">WhatsApp Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
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
