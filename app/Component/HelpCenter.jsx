'use client';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, Zap, CheckCircle, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import MagicBento from './createParticleElement';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
// Your existing images (reduced quantity for compactness)
import lab1 from './assets/work5.webp';
import lab2 from './assets/work6.webp';
import lab3 from './assets/work7.webp';
import lab4 from './assets/work8.webp';
import event1 from './assets/work1.webp';
import event2 from './assets/work2.webp';
import event3 from './assets/work3.webp';

import gallery1 from './assets/gallery/1758278892364.jpg';
import gallery2 from './assets/gallery/1755235926484.jpg';
import gallery3 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.47 PM.webp';
import gallery4 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.45 PM (1).webp';
import gallery5 from './assets/gallery/1755235930440.jpg';
import gallery6 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (10).webp';

const gridItems = [
  {
    image: gallery1,
  },
  {
    image: gallery2,
  },
  {
    image: gallery3,
  },
  {
    image: gallery4,
  },
  {
    image: gallery5,
  },
  {
    image: gallery6,
  }
];

export default function CompactPremiumDemo() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://darkred-mouse-801836.hostingersite.com';
      const res = await fetch(`${apiUrl}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, interest: 'Elite Cyber Demo' }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setMessage('Request sent — expect contact within 24h');
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      setStatus('error');
      setMessage('Error — please try again');
    }
  };

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0015] dark:to-[#05000a] text-gray-900 dark:text-white overflow-hidden">
      {/* Background effects - kept subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.4) 1px, transparent 0)`, backgroundSize: '50px 50px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header - compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-5 h-5 bg-[#6b46e5] shadow-[0_0_15px_rgba(107,70,229,0.5)]"></div>
            <span className="text-[#0f172a] dark:text-white text-sm font-bold tracking-[0.2em] uppercase">PRIORITY ACCESS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400">
              Cyber Range Labs — Built for Real Practice
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-4xl mx-auto font-medium leading-relaxed">
            Live mentor-led sessions with hands-on labs you can actually finish and explain in interviews.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs md:text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10 py-2 px-4 rounded-full w-fit mx-auto border border-purple-100 dark:border-purple-800/30">
            <span>• Limited seats</span>
            <span>• Live mentoring</span>
            <span>• Priority onboarding</span>
          </div>
        </motion.div>

        {/* Two Column Layout - Form on Left, Grid on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 h-full"
          >
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-600/40 to-indigo-600/30 h-full">
              <div className="bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden h-full flex flex-col shadow-xl shadow-gray-200/50 dark:shadow-none">
                {/* Terminal style header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">access.terminal</span>
                  </div>
                  <Lock size={14} className="text-green-600 dark:text-green-400" />
                </div>

                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-300 dark:to-blue-200 bg-clip-text text-transparent">
                    Get Free Demo Now
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Limited availability — response within 24 hours
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <MdOutlineDriveFileRenameOutline size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none text-gray-900 dark:text-white placeholder-gray-500 text-sm transition-all"
                        placeholder="Enter Your Full Name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-1 gap-4">
                      <div className="relative">
                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={status === 'loading' || status === 'success'}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none text-gray-900 dark:text-white placeholder-gray-500 text-sm transition-all"
                          placeholder="Enter Your Phone Number"
                        />
                      </div>

                      <div className="relative">
                        <Zap size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={status === 'loading' || status === 'success'}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none text-gray-900 dark:text-white placeholder-gray-500 text-sm transition-all"
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {(status === 'success' || status === 'error') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`flex items-center gap-2.5 p-3 rounded-lg text-sm ${status === 'success'
                            ? 'bg-green-900/30 border border-green-700/40 text-green-300'
                            : 'bg-red-900/30 border border-red-700/40 text-red-300'
                            }`}
                        >
                          {status === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                          <span>{message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={status === 'loading' || status === 'success'}
                      className={`
                        w-full py-3.5 px-6 rounded-lg font-semibold text-sm md:text-base transition-all flex items-center justify-center gap-2
                        ${status === 'loading'
                          ? 'bg-gray-700 cursor-not-allowed'
                          : 'bg-purple-600 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/50'}
                      `}
                    >
                      {status === 'loading' ? (
                        <>Processing... <span className="animate-spin">⟳</span></>
                      ) : status === 'success' ? (
                        <>Sent ✓</>
                      ) : (
                        <>
                          Request Access <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 flex items-center justify-center gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Need Help?</span>
                      <a
                        href="tel:+919220946887"
                        className="text-base font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
                      >
                        (+91) 9220946887
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: MagicBento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-8 h-full"
          >
            <MagicBento
              theme={theme}
              items={gridItems}
              textAutoHide={true}
              enableStars
              enableSpotlight
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              spotlightRadius={540}
              particleCount={12}
              glowColor="132, 0, 255"
              disableAnimations={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}