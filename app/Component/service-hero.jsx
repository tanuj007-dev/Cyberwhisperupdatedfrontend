"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { GoArrowRight } from "react-icons/go";
import { useEnquiry } from '../context/EnquiryContext';
// Import assets
import cyberLab1 from "./assets/cyber_lab_1.webp"
import cyberLab2 from "./assets/cyber_lab_2.webp"
import cyberLab3 from "./assets/cyber_lab_3.webp"
import cyberLab4 from "./assets/cyber_lab_4.webp"

import Particles from './Particles';
import gridImage from './assets/grid.webp';

const CAROUSEL_IMAGES = [
  { img: cyberLab1, title: 'Cyber Lab' },
  { img: cyberLab2, title: 'Security Ops' },
  { img: cyberLab3, title: 'Digital Fortress' },
  { img: cyberLab4, title: 'Threat Intelligence' },
]

// Triplicating images for a smoother infinite loop
const ALL_IMAGES = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES]

export default function ServiceHero() {
  const { openEnquiry } = useEnquiry();
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)

  // Automatic scrolling logic
  useAnimationFrame((t, delta) => {
    if (!containerWidth) return
    const moveBy = -0.5 // Speed of movement
    let nextX = x.get() + moveBy

    // Reset for infinite loop
    const limit = (containerWidth / 3)
    if (nextX <= -limit) {
      nextX = 0
    }
    x.set(nextX)
  })

  useEffect(() => {
    if (containerRef.current) {
      // We calculate the width of one set of images
      setContainerWidth(containerRef.current.scrollWidth)
    }
  }, [])

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] bg-white dark:bg-black overflow-hidden py-12 md:py-16 lg:py-24 font-sans border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      {/* Background Grid Image */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image
          src={gridImage}
          alt="Background Grid"
          fill
          className="object-cover dark:opacity-30 opacity-10 inverted-grid"
          priority
        />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-30 block dark:hidden mix-blend-multiply bg-grid-slate-200" />

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

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-0">

          {/* Left Side: Content Area */}
          <div className="w-full lg:w-[55%] space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-1000 text-center lg:text-left">
            {/* New Badge */}
            <div className="relative inline-flex rounded-full p-[2px] mt-16 md:mt-0 overflow-hidden">
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
                  Cybersecurity Services + Cyber Range
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
            {/* Main Heading */}
            <div className="space-y-2  animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
                We Don’t Just Talk <span className="text-[#6B46E5]"> Cybersecurity</span> <br className="hidden sm:block" />
                <span className="sm:inline block">We Build Cyber <span className="text-[#6B46E5]">Defenders</span></span>
              </h1>
            </div>

            {/* Description */}
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-[600px] mx-auto lg:mx-0"
            >
              From <span className="text-gray-900 dark:text-white font-semibold">SOC deployment</span> and <span className="text-gray-900 dark:text-white font-semibold">managed monitoring</span> to <span className="text-[#a855f7] font-semibold">cyber range simulations</span>, <span className="text-gray-900 dark:text-white font-semibold">threat intelligence</span>, and <span className="text-gray-900 dark:text-white font-semibold">VAPT</span> — Cyber Whisper helps teams detect faster, respond smarter, and stay ready.
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-5 animate-in fade-in slide-in-from-left duration-1000 w-full sm:w-auto">
              <button
                onClick={openEnquiry}
                className="flex items-center justify-center gap-3 bg-[#310E3F] text-white px-8 md:px-10 py-3 rounded-full font-bold text-base md:text-lg hover:scale-105 hover:bg-[#6B46E5] transition-all hover:shadow-2xl active:scale-95 group w-full sm:w-auto border-2 border-[#310E3F] dark:border-purple-500">
                Get a Quote
                <div className="w-6 h-6 rounded-full bg-white flex text-[#310E3F] items-center justify-center transition-transform group-hover:translate-x-1">
                  <GoArrowRight size={20} />
                </div>
              </button>
              <button onClick={openEnquiry} className="px-8 md:px-10 py-3 rounded-full border-2 border-[#310E3F] dark:border-purple-500 text-[#310E3F] dark:text-purple-400 font-bold text-base md:text-lg transition-all hover:border-slate-400 dark:hover:border-purple-300 hover:text-slate-900 dark:hover:text-white active:scale-95 w-full sm:w-auto">
                Book a Cyber Range Demo
              </button>
            </div>

            {/* Bottom Indicators */}
            <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-2 md:gap-6 pt-6 text-[#310E3F] dark:text-purple-300 tracking-tight text-[10px] sm:text-base md:text-base lg:text-lg whitespace-nowrap">
              <span>Practical</span>
              <span className="text-2xl md:text-5xl text-[#310E3F] dark:text-purple-300">•</span>
              <span>Outcome-driven</span>
              <span className="text-2xl md:text-5xl text-[#310E3F] dark:text-purple-300">•</span>
              <span>Built by practitioners</span>
            </div>
          </div>

          {/* Right Side: Moving Carousel Area */}
          <div className="w-full lg:w-[50%] relative py-6 md:py-10">
            {/* Visual glow backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/40 blur-[120px] rounded-full z-0 pointer-events-none" />

            {/* Horizontal view but cards are vertical */}
            <div className="relative z-10 overflow-hidden -mx-4 sm:-mx-10 md:-mx-20 lg:mx-0 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <motion.div
                ref={containerRef}
                style={{ x }}
                className="flex gap-4 md:gap-6 py-6 md:py-10"
              >
                {ALL_IMAGES.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-none w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-[3/4.5] rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-transform duration-500 hover:-translate-y-4 hover:shadow-purple-200/50"
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}