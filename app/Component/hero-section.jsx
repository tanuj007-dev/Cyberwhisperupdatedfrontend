"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import heroBg from './assets/hero-bg.png';
import Particles from './Particles';
import b2b from './assets/2.png';
import b2bbg from './assets/b2bbg.png';
import b2c from './assets/b2c.png';
import b2cbg from './assets/b2cbg.png';
import b2cCard from './assets/b2c card .png';
import { motion } from 'framer-motion';
import { GoArrowRight } from "react-icons/go";
import { Building2, GraduationCap } from 'lucide-react';

// Import icon images
const b2bIcon = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3e%3cdefs%3e%3cradialGradient id='glow'%3e%3cstop offset='0%25' style='stop-color:%237C3AED;stop-opacity:0.4'/%3e%3cstop offset='100%25' style='stop-color:%237C3AED;stop-opacity:0'/%3e%3c/radialGradient%3e%3c/defs%3e%3ccircle cx='100' cy='100' r='90' fill='%237C3AED'/%3e%3cpath d='M70 60 h20 v10 h-20 z M75 75 h10 v30 h-10 z M90 65 h20 v10 h-20 z M95 80 h10 v25 h-10 z M110 70 h20 v10 h-20 z M115 85 h10 v20 h-10 z M65 110 h70 v5 h-70 z' fill='white'/%3e%3c/svg%3e";
const b2cIcon = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3e%3cdefs%3e%3cradialGradient id='glow'%3e%3cstop offset='0%25' style='stop-color:%237C3AED;stop-opacity:0.4'/%3e%3cstop offset='100%25' style='stop-color:%237C3AED;stop-opacity:0'/%3e%3c/radialGradient%3e%3c/defs%3e%3ccircle cx='100' cy='100' r='90' fill='%237C3AED'/%3e%3ccircle cx='85' cy='75' r='12' fill='white'/%3e%3cpath d='M85 90 q-15 0 -15 15 v10 h30 v-10 q0 -15 -15 -15' fill='white'/%3e%3ccircle cx='115' cy='75' r='12' fill='white'/%3e%3cpath d='M115 90 q-15 0 -15 15 v10 h30 v-10 q0 -15 -15 -15' fill='white'/%3e%3c/svg%3e";
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


      {/* OGL Particles Background - Removed for performance */}
      {/* OGL Particles Background */}
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
          className="lg:w-[60%] flex flex-col justify-start text-center lg:text-left pt-0 lg:pt-6"
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
                <button className="px-26 py-4 md:px-8 md:py-4 bg-[#a855f7] text-white font-bold rounded-2xl transition-all hover:bg-[#9333ea] active:scale-95 flex items-center justify-center gap-2 group text-sm md:text-base w-full sm:w-auto">
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

        {/* Right Content Area - Staggered Cards */}
        <div className="hidden lg:flex lg:w-[45%] relative flex-col mt-8 lg:mt-0 w-full px-4 sm:px-0">

          {/* DESKTOP LAYOUT (Hidden on mobile/tablet) */}
          <div className="hidden lg:flex flex-col gap-8 scale-90 origin-right">
            {/* B2B Card Desktop */}
            <Link href="/b2b" className="relative self-end w-full max-w-[500px] ml-24 group">
              <div className="absolute -inset-10 rounded-full pointer-events-none "></div>
              <Image
                src={b2b}
                alt="Enterprise B2B - Train Teams Test Defences Improve Readiness"
                width={500}
                height={300}
                className="w-[500px] h-[300px] hover:scale-105 ml-12 duration-500 object-contain rounded-[40px]"
              />
            </Link>

            {/* B2C Card Desktop */}
            <Link href="/training" className="relative self-start w-full max-w-[500px] -mt-5  group">
              <Image
                src={b2cCard}
                alt="Individuals B2C - Learn Security Build Skills Launch Careers"
                width={500}
                height={300}
                className="w-[500px] h-[300px] hover:scale-105 mr-12 duration-500 object-contain rounded-[40px]"
              />
            </Link>
          </div>

          {/* MOBILE LAYOUT (Hidden on desktop) */}
          <div className="flex lg:hidden flex-col gap-6">
            {/* B2B Card Mobile */}
            <Link href="/b2b" className="relative w-full max-w-[400px] self-center group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border-2 border-purple-300 shadow-[0_0_25px_rgba(107,70,229,0.3)] group-hover:shadow-[0_0_40px_rgba(107,70,229,0.5)] transition-all duration-500 group-hover:scale-[1.02]"
              >
                {/* Animated Moving Border */}
                <div className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-70"
                    style={{
                      background: "linear-gradient(90deg, #60A5FA, #A78BFA, #EC4899, #60A5FA)",
                      backgroundSize: "300% 100%",
                      animation: "borderMove 4s linear infinite",
                    }}
                  />
                </div>

                {/* Inner border to create the effect */}
                <div className="absolute inset-[1px] rounded-2xl bg-transparent border border-purple-500/20" />
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={b2bbg}
                    alt="Background"
                    fill
                    className="object-cover blur-[2px] scale-110"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e]/98 via-[#16213e]/95 to-[#0f3460]/98" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5">
                  {/* Badge */}
                  <div className="flex justify-start mb-2">
                    <div className="inline-flex items-start gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-purple-400/30 backdrop-blur-md">
                      <span className="text-purple-300 text-[10px] font-semibold">Enterprise (B2B)</span>
                    </div>
                  </div>

                  {/* Shine Divider */}
                  <div className="relative h-px w-full mb-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-1/3"
                      style={{
                        animation: "shine 3s ease-in-out infinite",
                      }}
                    />
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-10 h-10 relative mb-1.5">
                      <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-md opacity-80" />
                      <Image
                        src={b2bIcon}
                        alt="Enterprise"
                        width={48}
                        height={48}
                        className="w-full h-full drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      />
                    </div>

                    {/* Heading */}
                    <h3 className="text-base font-bold text-white mb-1 leading-tight">
                      Train Teams Test Defences Improve Readiness
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-[10px] leading-relaxed mb-2">
                      Prepare your security teams using immersive cyber range simulations and intelligent workflows.
                    </p>

                    {/* CTA Button */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-purple-400/40 text-white text-[10px] font-semibold hover:bg-white/20 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm group/btn">
                      <span>Explore Solutions</span>
                      <GoArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Link>

            {/* B2C Card Mobile */}
            <Link href="/training" className="relative w-full max-w-[400px] self-center group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl border-2 border-purple-300 shadow-[0_0_25px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500 group-hover:scale-[1.02]"
              >
                {/* Animated Moving Border */}
                <div className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-70"
                    style={{
                      background: "linear-gradient(90deg, #60A5FA, #A78BFA, #EC4899, #60A5FA)",
                      backgroundSize: "300% 100%",
                      animation: "borderMove 4s linear infinite",
                    }}
                  />
                </div>

                {/* Inner border to create the effect */}
                <div className="absolute inset-[1px] rounded-2xl bg-transparent border border-blue-500/20" />
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={b2cCard}
                    alt="Background"
                    fill
                    className="object-cover blur-[2px] scale-110"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e]/98 via-[#0f1f3e]/95 to-[#0a1628]/98" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5">
                  {/* Badge */}
                  <div className="flex justify-center mb-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-blue-400/30 backdrop-blur-md">
                      <span className="text-blue-300 text-[10px] font-semibold">Individuals (B2C)</span>
                    </div>
                  </div>

                  {/* Shine Divider */}
                  <div className="relative h-px w-full mb-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-1/3"
                      style={{
                        animation: "shine 3s ease-in-out infinite",
                      }}
                    />
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-10 h-10 relative mb-1.5">
                      <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md opacity-80" />
                      <Image
                        src={b2cIcon}
                        alt="Individuals"
                        width={48}
                        height={48}
                        className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                      />
                    </div>

                    {/* Heading */}
                    <h3 className="text-base font-bold text-white mb-1 leading-tight">
                      Learn Security Build Skills Launch Careers
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-[10px] leading-relaxed mb-2">
                      Prepare students with structured cybersecurity training and certification programs.
                    </p>

                    {/* CTA Button */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-blue-400/40 text-white text-[10px] font-semibold hover:bg-white/20 hover:border-blue-400/60 transition-all duration-300 backdrop-blur-sm group/btn">
                      <span>Explore Programs</span>
                      <GoArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Link>
          </div>

        </div>
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
