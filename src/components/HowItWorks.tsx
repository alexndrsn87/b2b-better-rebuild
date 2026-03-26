import React from 'react';
import { motion } from 'motion/react';
import { PenTool, Code2, Headphones, Triangle, Square, Circle } from 'lucide-react';
import { TextReveal } from './TextReveal';

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Try a Prototype",
      desc: "For £49, we build a custom, interactive preview of your new homepage in 24 hours. No templates, no commitment.",
      icon: <PenTool className="w-8 h-8 text-blue-400" />,
    },
    {
      num: "2",
      title: "We Build Your Site",
      desc: "If you love the prototype, we deduct the £49 from your setup fee and build out your full, high-performance website.",
      icon: <Code2 className="w-8 h-8 text-cyan-400" />,
    },
    {
      num: "3",
      title: "We Manage Everything",
      desc: "We host, secure, and update it forever. Need a change? Just message us. You run your business, we handle the tech.",
      icon: <Headphones className="w-8 h-8 text-emerald-400" />,
    }
  ];

  return (
    <motion.section 
      id="how-it-works" 
      className="py-20 relative z-10 overflow-hidden bg-[var(--color-navy-light)]/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-56 h-56 rounded-full bg-blue-500/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[60%] left-[50%] w-40 h-40 rounded-full bg-amber-500/10 blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            <TextReveal text="How it works" />
          </h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ delay: 0.3 }}
          >
            Three simple steps to a professional website. No dashboards to learn, no software to update.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.num}
                </div>
                {step.icon}
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
