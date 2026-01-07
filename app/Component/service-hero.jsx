"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { GoArrowRight } from "react-icons/go";
// Import assets
import cyberLab1 from "./assets/cyber_lab_1.png"
import cyberLab2 from "./assets/cyber_lab_2.png"
import cyberLab3 from "./assets/cyber_lab_3.png"
import cyberLab4 from "./assets/cyber_lab_4.png"

import bgGrid from "./assets/bggrid.png"

const CAROUSEL_IMAGES = [
  { img: cyberLab1, title: 'Cyber Lab' },
  { img: cyberLab2, title: 'Security Ops' },
  { img: cyberLab3, title: 'Digital Fortress' },
  { img: cyberLab4, title: 'Threat Intelligence' },
]

// Triplicating images for a smoother infinite loop
const ALL_IMAGES = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES]

export default function ServiceHero() {
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
    <div className="relative w-full min-h-[500px] md:min-h-[600px] bg-white overflow-hidden py-12 md:py-16 lg:py-24 font-sans border-b border-gray-100">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0">
        <Image
          src={bgGrid}
          alt="Background Grid"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Background Dot Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#6b46e5 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-300/40 blur-[140px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-0">

          {/* Left Side: Content Area */}
          <div className="w-full lg:w-[55%] space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-1000 text-center lg:text-left">
            {/* New Badge */}
            <div className="relative inline-flex rounded-full p-[2px] overflow-hidden mt-10 md:mt-0">
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
              <div className="relative inline-flex items-center   gap-2 md:gap-4 px-4 md:px-8 py-2 rounded-full bg-[#EBDFFF] text-[#6932E2] shadow-sm">
                <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest bg-white text-black px-2 md:px-3 py-1 rounded-2xl">
                  New
                </span>
                <span className="text-xs md:text-sm">Registrations are now open!</span>
              </div>

              {/* Keyframes */}
              <style jsx>{`
    @keyframes borderMove {
      0% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 200% 50%;
        filter: "blur(2px)",
opacity: 0.8,

      }
    }
  `}</style>
            </div>


            {/* Main Heading */}
            <div className="space-y-2  animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                Master<span className="text-[#6B46E5]"> Cybersecurity</span> <br className="hidden sm:block" />
                <span className="sm:inline block">From Scratch</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-[600px] animate-in fade-in slide-in-from-left duration-1000 mx-auto lg:mx-0">
              From AI-powered threat detection to immersive Cyber Range training, we safeguard your digital future so you can focus on what you do best.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-5 animate-in fade-in slide-in-from-left duration-1000 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-3 bg-[#310E3F] text-white px-8 md:px-10 py-3 rounded-full font-bold text-base md:text-lg hover:scale-105 hover:bg-[#6B46E5] transition-all hover:shadow-2xl active:scale-95 group w-full sm:w-auto">
                Enroll Now
                <div className="w-6 h-6 rounded-full bg-white flex text-[#310E3F] items-center justify-center transition-transform group-hover:translate-x-1">
                  <GoArrowRight size={20} />
                </div>
              </button>
              <button className="px-8 md:px-10 py-3 rounded-full border-2 border-[#310E3F] text-[#310E3F] font-bold text-base md:text-lg transition-all hover:border-slate-400 hover:text-slate-900 active:scale-95 w-full sm:w-auto">
                See Curriculum
              </button>
            </div>

            {/* Bottom Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-6 pt-6 text-[#310E3F] tracking-widest text-base md:text-xl">
              <span>Learn</span>
              <span className="text-3xl md:text-5xl text-[#310E3F]">•</span>
              <span>Simulate</span>
              <span className="text-3xl md:text-5xl text-[#310E3F]">•</span>
              <span>Win</span>
            </div>
          </div>

          {/* Right Side: Moving Carousel Area */}
          <div className="w-full lg:w-[50%] relative py-6 md:py-10">
            {/* Visual glow backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/40 blur-[120px] rounded-full z-0 pointer-events-none" />

            {/* Horizontal view but cards are vertical */}
            <div className="relative z-10 overflow-hidden -mx-4 sm:-mx-10 md:-mx-20 lg:mx-0">
              <motion.div
                ref={containerRef}
                style={{ x }}
                className="flex gap-4 md:gap-6 py-6 md:py-10"
              >
                {ALL_IMAGES.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-none w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-[3/4.5] rounded-2xl md:rounded-[3rem] overflow-hidden bg-white border border-gray-100 transition-transform duration-500 hover:-translate-y-4 hover:shadow-purple-200/50"
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