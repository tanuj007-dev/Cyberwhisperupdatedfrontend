"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden bg-[#170938]">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src="/about_hero_bg_cyber_1767455986386.png"
          alt="Cyber Security Background"
          fill
          priority
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#030014]/20 via-[#030014]/50 to-[#030014] z-10" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#a855f7]/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#6366f1]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 cyber-grid-bg opacity-10 z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-flex rounded-full p-px overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary via-white to-primary animate-border-rotate opacity-50" />
          <div className="relative px-6 py-2 rounded-full bg-[#030014] backdrop-blur-md text-primary text-xs font-bold uppercase tracking-[0.2em]">
            Empowering Cyber Defenders
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
        >
          WHO WE <span className="text-primary   drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">ARE</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 text-gray-400 font-medium"
        >
          <a href="/" className="hover:text-primary transition-colors hover:scale-105 transform">
            Home
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <span className="text-white">About Us</span>
        </motion.div>
      </div>
    </section>
  )
}
