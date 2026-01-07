"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const team = [
  {
    name: "SARAH",
    fullName: "Sarah Chen",
    role: "Chief Security Officer",
    image: "/team_sarah_1767456208869.png",
  },
  {
    name: "MARCUS",
    fullName: "Marcus Thorne",
    role: "Lead Architect",
    image: "/team_marcus_1767456277100.png",
  },
  {
    name: "ELENA",
    fullName: "Elena Rodriguez",
    role: "Threat Analyst",
    image: "/team_elena_1767456350560.png",
  },
  {
    name: "DAVID",
    fullName: "David Kim",
    role: "Head of Research",
    image: "/team_david_1767456376612.png",
  },
  {
    name: "AI-CO",
    fullName: "AI Core 1.0",
    role: "Autonomous Defense",
    image: "/team_aico_1767456426160.png",
  },
]

export function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0)

  return (
    <section className="relative min-h-[80vh] bg-[#030014] py-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Text Container with Fixed Height to Prevent Layout Shift */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2
            key={hoveredIndex ?? "default"}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 1.1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.5,
            }}
            className="text-[18vw] font-black leading-none tracking-tighter text-primary/10 select-none whitespace-nowrap"
            style={{
              filter: "blur(4px) drop-shadow(0 0 30px rgba(123, 44, 255, 0.2))",
            }}
          >
            {hoveredIndex !== null ? team[hoveredIndex].name : "TEAM"}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Our Elite Team</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">The Minds Behind <span className="text-primary italic">The Shield</span></h2>
        </div>

        {/* Avatars Grid */}
        <LayoutGroup>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                layout
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative cursor-pointer"
                animate={{
                  scale: hoveredIndex === idx ? 1.2 : 1,
                  zIndex: hoveredIndex === idx ? 30 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${hoveredIndex === idx
                    ? "border-primary shadow-[0_0_25px_rgba(123,44,255,0.6)] scale-110"
                    : "border-white/5 grayscale opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.fullName}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Arrow Indicator */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="active-indicator"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white z-40 border-2 border-[#030014]"
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>

        {/* Member Info Card - Floating style */}
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center glass-panel px-10 py-6 rounded-3xl border-white/5"
              >
                <h3 className="text-3xl font-black text-white tracking-tight">{team[hoveredIndex].fullName}</h3>
                <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mt-2">
                  {team[hoveredIndex].role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cyber Text Decoration */}
      <div className="absolute bottom-10 left-10 text-[10px] font-mono text-primary/20 tracking-widest uppercase vertical-text">
        Cyber Whisper / System / Core_Team
      </div>
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  )
}
