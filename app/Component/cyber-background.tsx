"use client"

import { motion } from "framer-motion"

export function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep Navy Base */}
      <div className="absolute inset-0 bg-[#030014]" />

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Animated Beams (Inspired by homepage) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal */}
        {/* Horizontal */}
        {/* <div className="absolute top-[20%] left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent animate-beam-h" style={{ animationDuration: '8s', animationDelay: '0s' }} />
        <div className="absolute top-[60%] left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent animate-beam-h" style={{ animationDuration: '12s', animationDelay: '4s' }} /> */}

        {/* Vertical */}
        {/* <div className="absolute top-0 left-[30%] w-px h-full bg-linear-to-b from-transparent via-primary/30 to-transparent animate-beam-v" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-0 left-[70%] w-px h-full bg-linear-to-b from-transparent via-accent/20 to-transparent animate-beam-v" style={{ animationDuration: '15s', animationDelay: '6s' }} /> */}
      </div>

      {/* Glowing Orbs - Static for performance */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[150px]" />

      {/* Hot glow spots */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full" />
      <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.05) 50%)] bg-[length:100%_4px]" />
    </div>
  )
}

