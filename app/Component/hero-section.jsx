"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import heroBg from './assets/hero-bg.png';
// Dynamically load Particles to improve initial load time
const Particles = dynamic(() => import('./Particles'), { ssr: false });

// Using public folder path for image with spaces in filename
const heroRightImage = '/hero-split-cards.png';
import { motion } from 'framer-motion';
import { GoArrowRight } from "react-icons/go";

export default function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <HeroLayout isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} />
  );
}

function HeroLayout({ isVideoOpen, setIsVideoOpen }) {
  return (
    <section className="relative min-h-screen bg-background text-foreground flex items-center justify-center p-4 pt-24 sm:p-8 md:p-12 lg:p-16 overflow-hidden font-sans transition-colors duration-300">

      {/* Background Hero Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={heroBg}
          alt="Cybersecurity Background"
          fill
          className="object-cover opacity-10 dark:opacity-40"
          priority
        />
        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-[#02000d] dark:via-[#02000d]/80 dark:to-transparent/20"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-30 block dark:hidden mix-blend-multiply bg-grid-slate-200" />


      {/* OGL Particles Background - Lazy Loaded */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles
          particleColors={['#ffffff', '#a855f7', '#6366f1']}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="opacity-60 dark:opacity-80"
        />
      </div>

      {/* Animated Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal Beams */}
        <div className="absolute top-[15%] left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent animate-beam-h" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-[35%] left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent animate-beam-h" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute top-[55%] left-0 w-full h-px bg-linear-to-r from-transparent via-purple-400/40 to-transparent animate-beam-h" style={{ animationDelay: '4s', animationDuration: '10s' }}></div>
        <div className="absolute top-[85%] left-0 w-full h-px bg-linear-to-r from-transparent via-blue-400/30 to-transparent animate-beam-h" style={{ animationDelay: '6s', animationDuration: '12s' }}></div>

        {/* Vertical Beams */}
        <div className="absolute top-0 left-[20%] w-px h-full bg-linear-to-b from-transparent via-purple-500/40 to-transparent animate-beam-v" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        <div className="absolute top-0 left-[45%] w-px h-full bg-linear-to-b from-transparent via-blue-500/40 to-transparent animate-beam-v" style={{ animationDelay: '3s', animationDuration: '11s' }}></div>
        <div className="absolute top-0 left-[75%] w-px h-full bg-linear-to-b from-transparent via-purple-400/40 to-transparent animate-beam-v" style={{ animationDelay: '5s', animationDuration: '13s' }}></div>
        <div className="absolute top-0 left-[92%] w-px h-full bg-linear-to-b from-transparent via-blue-400/30 to-transparent animate-beam-v" style={{ animationDelay: '7s', animationDuration: '15s' }}></div>

        {/* Grid Sparks - Client Side Only to avoid Hydration Error */}
      </div>

      {/* Ambient Glows - Adjusted for Light Mode */}
      {/* Intense Purple Glow behind B2B area - Opacity reduced in light mode */}
      <div className="absolute top-[5%] right-[20%] w-[600px] h-[600px] bg-[#6d28d9]/25 blur-[120px] rounded-full pointer-events-none animate-pulse-slow opacity-10 dark:opacity-100"></div>

      {/* Hot center spot for the purple glow */}
      <div className="absolute top-[15%] right-[25%] w-[300px] h-[300px] bg-[#a855f7]/20 blur-[80px] rounded-full pointer-events-none opacity-20 dark:opacity-100"></div>

      {/* Bottom Left Deep Purple/Indigo wash */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[800px] h-[800px] bg-[#4c1d95]/30 blur-[130px] rounded-full pointer-events-none opacity-10 dark:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-tr from-[#1e1b4b]/10 via-transparent to-transparent pointer-events-none opacity-20 dark:opacity-100"></div>

      {/* Overall subtle vignette - Only for dark mode */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#02000d]/60 pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8">

        {/* Left Content Area */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[55%] flex flex-col justify-start text-center lg:text-left pt-0 lg:pt-6"
        >
          <div className="space-y-5 md:space-y-8 mt-0 lg:mt-6">
            {/* New Badge */}
            <div className="relative inline-flex rounded-full p-[2px] overflow-hidden">
              {/* Moving Border */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6932E2, #EBDFFF, #6932E2)",
                  backgroundSize: "200% 100%",
                  animation: "borderMove 3s linear infinite",
                }}
              />

              {/* Content */}
              <div className="relative inline-flex items-center gap-4 px-6 md:px-8 py-2 rounded-full bg-[#1B0D37] backdrop-blur-md text-white shadow-sm">

                <span className="text-xs md:text-sm font-medium text-purple-200 tracking-wider uppercase">
                  Next Generation Cybersecurity
                </span>
              </div>

              {/* Keyframes */}
              <style jsx>{`
                @keyframes borderMove {
                  0% {
                    background-position: 0% 50%;
                  }
                  100% {
                    background-position: 200% 50%;
                  }
                }
                @keyframes shine {
                  0% {
                    transform: translateX(-100%);
                  }
                  50% {
                    transform: translateX(300%);
                  }
                  100% {
                    transform: translateX(-100%);
                  }
                }
              `}</style>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight text-foreground leading-tight"
            >
              We Don’t Teach Cyber
              <br className="hidden md:block" />
              Security. We Build <span className="text-[#a855f7] drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] relative inline-block">
                Cyber Defenders
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-[620px] leading-relaxed font-normal mx-auto lg:mx-0"
            >
              Cyber Whisper brings together <span className="text-gray-900 dark:text-white font-semibold">AI-assisted investigation</span>,
              hands-on cybersecurity training, and <span className="text-[#a855f7] font-semibold">immersive cyber range simulations</span> helping individuals and organisations reduce investigation time and respond confidently to real-world attacks.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 md:gap-5 pt-4 justify-center lg:justify-start"
            >
              <Link href="/services">
                <button className="px-26 py-4 md:px-8 md:py-4 bg-[#a855f7] text-white font-bold rounded-2xl transition-all hover:bg-[#9333ea] active:scale-95 flex items-center justify-center gap-2 group text-sm md:text-base w-full sm:w-auto whitespace-nowrap">
                  Explore Solutions
                  <GoArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="px-6 py-3 md:px-8 md:py-4 bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white font-bold rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-xl transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 active:scale-95 flex items-center justify-center gap-3 group text-sm md:text-base w-full sm:w-auto"
              >
                Watch Demo
                <div className="w-6 h-6 rounded-full bg-[#a855f7]/20 flex items-center justify-center group-hover:bg-[#a855f7]/30 transition-colors">
                  <svg className="w-2.5 h-2.5 fill-[#a855f7]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </button>
            </motion.div>



            {/* Trust Indicators / Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
              className="pt-8 md:pt-10 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-10"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter leading-none">500+</span>
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mt-1">Clients</span>
              </div>
              <div className="w-px h-10 bg-linear-to-b from-gray-900/20 dark:from-white/20 to-transparent hidden sm:block"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter leading-none">99.9%</span>
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mt-1">Protection</span>
              </div>
              <div className="w-px h-10 bg-linear-to-b from-gray-900/20 dark:from-white/20 to-transparent hidden sm:block"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter leading-none">24/7</span>
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mt-1">Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content Area - Hero image with clickable left/right zones */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex w-full lg:w-[45%] relative items-center justify-center min-h-[300px] lg:min-h-[400px] mt-8 lg:mt-0"
        >
          <div className="relative w-full max-w-[480px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <Image
              src={heroRightImage}
              alt="Enterprise B2B and Individuals B2C - Cybersecurity training and solutions"
              width={600}
              height={500}
              className="w-full h-auto object-contain"
              priority
              sizes="(max-width: 1024px) 0px, 45vw"
            />
            {/* Left half → /b2b */}
            <Link href="/b2b" className="absolute inset-0 left-0 w-1/2 h-full cursor-pointer z-0" aria-label="Explore Enterprise Solutions" />

            {/* Left Button Interactive Pop Effect */}
            <Link href="/b2b">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 5px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-[2%] left-[4%] w-[40%] h-[11%] cursor-pointer z-20 rounded-xl"
                style={{
                  background: 'linear-gradient(90deg, rgba(168,85,247,0.01) 0%, rgba(168,85,247,0.1) 100%)', // Subtle tint
                  border: '2px solid rgba(168,85,247,0.3)' // Subtle border
                }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-300" />
              </motion.div>
            </Link>

            {/* Right half → /training */}
            <Link href="/training" className="absolute left-1/2 top-0 w-1/2 h-full cursor-pointer z-0" aria-label="Explore Training Programs" />

            {/* Right Button Interactive Pop Effect */}
            <Link href="/training">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 5px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-[2%] right-[4%] w-[40%] h-[11%] cursor-pointer z-20 rounded-xl"
                style={{
                  background: 'linear-gradient(90deg, rgba(6,182,212,0.01) 0%, rgba(6,182,212,0.1) 100%)', // Subtle tint
                  border: '2px solid rgba(6,182,212,0.3)' // Subtle border
                }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-xl transition-opacity duration-300" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Video Modal - Top Level for correct stacking context */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] border border-purple-500/20" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-20 p-3 bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-xl transition-all hover:scale-110 active:scale-90"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <video
                className="w-full h-full"
                src="/Cyber Whisper.mp4"
                controls
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section >
  );
} 
