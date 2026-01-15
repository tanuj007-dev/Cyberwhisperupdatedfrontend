"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WeServe() {
  return (
    <section className="relative overflow-hidden bg-background py-12 md:py-24 lg:py-32 font-sans transition-colors duration-300">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B46E5]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4FB7C1]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          <div className="lg:col-span-6 relative flex items-center justify-center animate-fade-in-left">
            <div className="relative w-full aspect-square max-w-[550px]">
              <div className="absolute inset-0 bg-[#4FB7C1]/5 blur-3xl rounded-full" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(79,183,193,0.15)] group">
                <Image
                  src="/cyber_city_industries.webp"
                  alt="Industries We Serve Illustration"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                {/* Overlay to blend with dark bg */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0E0429]/60 via-transparent to-transparent pointer-events-none" />

                {/* Active Monitoring Radar Effect */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">

                  {/* Dynamic Radar Sweep Gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(34, 211, 238, 0.1) 60deg, transparent 120deg)"
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Rotating Cross-Beams */}
                  <motion.div
                    className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                    animate={{ rotate: 360, opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  <motion.div
                    className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-purple-400/60 to-transparent"
                    animate={{ rotate: -360, opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />

                  {/* Rotating Dashed Ring */}
                  <motion.div
                    className="absolute w-[95%] h-[95%] border border-dashed border-cyan-400/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Counter-Rotating Inner Ring */}
                  <motion.div
                    className="absolute w-[75%] h-[75%] border border-dotted border-purple-400/30 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Expanding Radar Pulses */}
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-cyan-400/5 border border-cyan-400/30 rounded-full"
                      initial={{ width: "10%", height: "10%", opacity: 0 }}
                      animate={{
                        width: ["10%", "110%"],
                        height: ["10%", "110%"],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 1.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6">
            <div className="space-y-8 animate-fade-in-right">
              <div className="space-y-6">
                {/* Purple Label */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
                  <span className="text-foreground text-sm font-bold uppercase tracking-[0.2em]">
                    WHO WE SERVE
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-[45px] font-bold leading-[1.2] text-foreground tracking-tight">
                  We don't just deploy and <br className="hidden md:block" />
                  go we partner with you for <br className="hidden md:block" />
                  the long haul
                </h2>

                {/* Description */}
                <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground font-medium max-w-xl">
                  Our integrated approach goes beyond quick fixes, combining advanced AI, real-world simulations, and round-the-clock monitoring to keep you a step ahead of emerging threats.
                </p>

                {/* Badge/Feature */}
                <div className="inline-flex items-center gap-2 bg-[#6B46E5] text-white px-4 md:px-5 py-2 rounded-md font-semibold text-xs md:text-sm transition-transform hover:scale-105 cursor-default">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  99.9% Threat Coverage
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 md:gap-5 pt-6 md:pt-8">
                  <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-[15px] transition-all duration-300 shadow-xl shadow-primary/20 active:scale-95">
                    Learn More
                  </button>
                  <button className="border-2 border-primary/10 hover:border-primary text-primary px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-[15px] transition-all duration-300 active:scale-95">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}