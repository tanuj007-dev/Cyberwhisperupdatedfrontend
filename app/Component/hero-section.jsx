"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gridImage from './assets/grid.png';
import Particles from './Particles';
import h1 from './assets/h1.png';
import h2 from './assets/h2.png';
import { motion } from 'framer-motion';
import { GoArrowRight } from "react-icons/go";
export default function HeroSection() {
  return (
    <HeroLayout />
  );
}

const Sparks = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = [...Array(10)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`
    }));
    setItems(newItems);
  }, []);

  return (
    <>
      {items.map((item) => (
        <div
          key={`spark-${item.id}`}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px] animate-spark"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay
          }}
        ></div>
      ))}
    </>
  );
};

function HeroLayout() {
  return (
    <section className="relative min-h-screen bg-[#030014] text-white flex items-center justify-center p-4 pt-24 sm:p-8 md:p-12 lg:p-16 overflow-hidden font-sans">

      {/* Background Grid Image */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image
          src={gridImage}
          alt="Background Grid"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* OGL Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles
          particleColors={['#ffffff', '#a855f7', '#6366f1']}
          particleCount={250}
          particleSpread={12}
          speed={0.15}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="opacity-40"
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
        <Sparks />
      </div>

      {/* Ambient Glows - Same to same as reference */}
      {/* Intense Purple Glow behind B2B area */}
      <div className="absolute top-[5%] right-[20%] w-[600px] h-[600px] bg-[#6d28d9]/25 blur-[120px] rounded-full pointer-events-none animate-pulse-slow"></div>

      {/* Hot center spot for the purple glow */}
      <div className="absolute top-[15%] right-[25%] w-[300px] h-[300px] bg-[#a855f7]/20 blur-[80px] rounded-full pointer-events-none"></div>

      {/* Bottom Left Deep Purple/Indigo wash */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[800px] h-[800px] bg-[#4c1d95]/30 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-tr from-[#1e1b4b]/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Overall subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#02000d]/60 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8">

        {/* Left Content Area */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[60%] flex flex-col justify-start text-center lg:text-left pt-10 lg:pt-0"
        >
          <div className="space-y-6 md:space-y-8  mt-6">
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
              <div className="relative inline-flex items-center gap-4 px-6 md:px-8 py-2 rounded-full bg-[#030014] backdrop-blur-md text-white shadow-sm">

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
              `}</style>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight text-white leading-tight"
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
              className="text-gray-400 text-base sm:text-lg max-w-[620px] leading-relaxed font-normal mx-auto lg:mx-0"
            >
              Cyber Whisper brings together <span className="text-white font-semibold">AI-assisted investigation</span>,
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
              <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-[#a855f7] text-white font-bold rounded-2xl transition-all hover:bg-[#9333ea] active:scale-95 overflow-hidden w-full sm:w-auto">
                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                  Explore Solutions
                  <GoArrowRight size={20} />
                </span>
              </button>

              <button className="px-6 py-3 md:px-8 md:py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center gap-3 group text-sm md:text-base w-full sm:w-auto">
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
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">500+</span>
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mt-1">Clients</span>
              </div>
              <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent hidden sm:block"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">99.9%</span>
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mt-1">Protection</span>
              </div>
              <div className="w-px h-10 bg-linear-to-b from-white/20 to-transparent hidden sm:block"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">24/7</span>
                <span className="text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mt-1">Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content Area - Staggered Cards */}
        <div className="lg:w-[45%] relative flex flex-col mt-8 lg:mt-0 w-full px-4 sm:px-0">

          {/* DESKTOP LAYOUT (Hidden on mobile/tablet) */}
          <div className="hidden lg:flex flex-col gap-10">
            {/* B2B Card Desktop */}
            <div className="relative self-start w-full max-w-[420px] ml-40 group">
              <div className="absolute -inset-10 bg-[#a855f7]/20 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-3 rounded-[1.2rem] shadow-2xl">
                <Image
                  src={h1}
                  alt="B2B Icon"
                  width={200}
                  height={200}
                  className="absolute -top-20 -left-20 w-[180px] h-[180px] transition-transform group-hover:scale-110 duration-500 z-20"
                />
                <div className="pt-4 ml-8">
                  <h2 className="text-[#1e293b] font-bold text-lg mb-2">B2B </h2>
                  <h2 className="text-[#1e293b] font-bold text-lg mb-2 leading-tight">Train Teams Test Defences Improve Readiness</h2>
                  <p className="text-[#64748b] text-sm leading-snug mb-3 font-medium">
                    Prepare your security teams using immersive cyber range simulations, intelligent investigation workflows, and hands-on training.
                  </p>
                  <Link href="/b2b">
                    <div className="text-[#7c3aed] font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer border-t border-gray-100 pt-3">
                      Explore Enterprise Solutions <span>→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* B2C Card Desktop */}
            <div className="relative self-end w-full max-w-[420px] mr-40 group">
              <div className="relative bg-white p-3 rounded-[1.2rem] shadow-2xl">
                <Image
                  src={h2}
                  alt="B2C Icon"
                  width={200}
                  height={200}
                  className="absolute -top-24 -left-20 w-[180px] h-[180px] transition-transform group-hover:scale-110 duration-500 z-20"
                />
                <div className="pt-4 ml-8">
                  <h2 className="text-[#1e293b] font-bold text-lg mb-2"> B2C  </h2>
                  <h2 className="text-[#1e293b] font-bold text-lg mb-2 leading-tight"> Learn Security Build Skills Launch Careers </h2>
                  <p className="text-[#64748b] text-sm leading-snug mb-3 font-medium">
                    Prepare students and early professionals with structured cybersecurity training, certification-aligned programs, and real-world SOC programs.
                  </p>
                  <Link href="/training">
                    <div className="text-[#6366f1] font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer border-t border-gray-100 pt-3">
                      Explore Training Programs<span>→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT (Hidden on desktop) */}
          <div className="flex lg:hidden flex-col gap-6">
            {/* B2B Card Mobile */}
            <div className="relative w-full max-w-[500px] self-center group">
              <div className="absolute -inset-10 bg-[#a855f7]/20 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-4 rounded-[1.2rem] shadow-2xl flex flex-row items-center gap-4">
                <Image
                  src={h1}
                  alt="B2B Icon"
                  width={100}
                  height={100}
                  className="w-16 h-16 relative shrink-0 transition-transform group-hover:scale-110 duration-500"
                />
                <div>
                  <h2 className="text-[#1e293b] font-bold text-base mb-1">B2B</h2>
                  <h2 className="text-[#1e293b] font-bold text-sm mb-2 leading-tight">Train Teams Test Defences Improve Readiness</h2>
                  <p className="text-[#64748b] text-xs leading-snug mb-3 font-medium hidden xs:block">
                    Prepare your security teams using immersive cyber range simulations...
                  </p>
                  <Link href="/b2b">
                    <div className="text-[#7c3aed] font-bold text-xs flex items-center gap-2 cursor-pointer border-t border-gray-100 pt-2 whitespace-nowrap">
                      Explore Enterprise Solutions <span>→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* B2C Card Mobile */}
            <div className="relative w-full max-w-[500px] self-center group">
              <div className="relative bg-white p-4 rounded-[1.2rem] shadow-2xl flex flex-row items-center gap-4">
                <Image
                  src={h2}
                  alt="B2C Icon"
                  width={100}
                  height={100}
                  className="w-16 h-16 relative shrink-0 transition-transform group-hover:scale-110 duration-500"
                />
                <div>
                  <h2 className="text-[#1e293b] font-bold text-base mb-1">B2C</h2>
                  <h2 className="text-[#1e293b] font-bold text-sm mb-2 leading-tight">Learn Security Build Skills Launch Careers</h2>
                  <p className="text-[#64748b] text-xs leading-snug mb-3 font-medium hidden xs:block">
                    Prepare students and early professionals with structured cybersecurity training...
                  </p>
                  <Link href="/training">
                    <div className="text-[#6366f1] font-bold text-xs flex items-center gap-2 cursor-pointer border-t border-gray-100 pt-2 whitespace-nowrap">
                      Explore Training Programs<span>→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 
