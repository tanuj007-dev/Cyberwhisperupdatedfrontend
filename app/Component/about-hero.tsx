"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden bg-[#170938]">
      {/* Background: same tech stock image as gallery hero */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80)`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0E0429]/20 via-[#0E0429]/50 to-[#0E0429] z-10" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-[10%] left-[20%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#a855f7]/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-[#6366f1]/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 cyber-grid-bg opacity-10 z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-flex rounded-full p-px overflow-hidden mb-4 md:mb-8"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary via-white to-primary animate-border-rotate opacity-50" />
          <div className="relative px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-[#0E0429] backdrop-blur-md text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            Empowering Cyber Defenders
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-7xl font-semibold text-white mb-4 md:mb-8 tracking-tighter"
        >
          WHO WE ARE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 text-gray-400 font-medium text-sm md:text-base mb-8"
        >
          <a href="/" className="hover:text-primary transition-colors hover:scale-105 transform">
            Home
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <span className="text-white">About Us</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed text-center"
        >
          Practitioner-led cyber defense, delivered through real-world workflows, hands-on training, and measurable outcomes.
        </motion.p>
      </div>
    </section>
  )
}
