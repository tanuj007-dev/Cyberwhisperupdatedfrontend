'use client';

import React from 'react';
import { motion } from 'framer-motion';
import footerBg from './assets/footer-bg.png';

const processes = [
  { id: '01', step: 'Step 01', heading: 'Understand the Requirement', description: 'We start by understanding your goals—training, SOC readiness, workshops, or cyber range usage.' },
  { id: '02', step: 'Step 02', heading: 'Design the Right Approach', description: 'Based on your needs, we design the right mix of labs, training programs, simulations, or consulting.' },
  { id: '03', step: 'Step 03', heading: 'Set Up the Environment', description: 'We configure cyber range labs, SOC tools, datasets, and access—ready for hands-on use.' },
  { id: '04', step: 'Step 04', heading: 'Hands-On Execution', description: 'Learners or teams engage in live training, simulations, workshops, or SOC exercises guided by experts.' },
  { id: '05', step: 'Step 05', heading: 'Review & Improve', description: 'We review outcomes, provide guidance, and recommend next steps for continuous improvement or advanced training.' },
];

// Animated Path Component - Continuous looping animation like LearningHub
const AnimatedPath = ({ d, delay = 0 }) => (
  <g>
    {/* Background static path */}
    <path
      d={d}
      fill="transparent"
      strokeWidth="2"
      stroke="#7B2CFF"
      strokeOpacity="0.15"
      strokeLinecap="round"
    />
    {/* Animated flowing path */}
    <motion.path
      d={d}
      fill="transparent"
      strokeWidth="2.5"
      stroke="#7B2CFF"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1
      }}
    />
  </g>
);

export default function WorkProcessSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden font-sans">

      <div
        className="absolute inset-x-0 top-2/4 -translate-y-2/4 h-[1000px] w-full opacity-[0.2] pointer-events-none select-none z-0"
        style={{
          backgroundImage: `url(${footerBg.src || footerBg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
            <span className="text-[#1a1a2e] text-[15px] font-semibold uppercase tracking-[0.2em]">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="text-4xl md:text-[50px] font-semibold text-[#1a1a2e] mb-10 tracking-tight">
            Our Engagement Process
          </h2>

          {/* Watch Video Button */}
          <button className="bg-[#1D0B2E] hover:bg-[#2A1042] text-white pl-8 pr-3 py-3 rounded-full font-semibold flex items-center gap-4 mx-auto transition-all duration-300 shadow-xl group">
            Watch Video
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <svg className="w-4 h-4 text-[#1D0B2E] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Process Flow Desktop - visible only on XL screens where fixed layout fits */}
        <div className="relative hidden xl:block h-[620px] mt-12 w-full max-w-[1280px] mx-auto">
          {/* Cards Grid Staggered */}
          {/* Top Row (Centers: 130, 640, 1150) */}
          <div className="absolute left-[-30px] top-[28px] w-[320px] h-[180px] rounded-2xl border border-[#6F2DFF]/30 bg-white shadow-[0_10px_40px_rgba(111,45,255,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(111,45,255,0.15)] hover:-translate-y-1">
            <ProcessCard {...processes[0]} />
          </div>
          <div className="absolute left-[460px] top-[28px] w-[320px] h-[180px] rounded-2xl border border-[#6F2DFF]/30 bg-white shadow-[0_10px_40px_rgba(111,45,255,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(111,45,255,0.15)] hover:-translate-y-1">
            <ProcessCard {...processes[2]} />
          </div>
          <div className="absolute left-[950px] top-[28px] w-[320px] h-[180px] rounded-2xl border border-[#6F2DFF]/30 bg-white shadow-[0_10px_40px_rgba(111,45,255,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(111,45,255,0.15)] hover:-translate-y-1">
            <ProcessCard {...processes[4]} />
          </div>

          {/* Bottom Row (Centers: 385, 895) */}
          <div className="absolute left-[215px] top-[400px] w-[320px] h-[180px] rounded-2xl border border-[#6F2DFF]/30 bg-white shadow-[0_10px_40px_rgba(111,45,255,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(111,45,255,0.15)] hover:-translate-y-1">
            <ProcessCard {...processes[1]} />
          </div>
          <div className="absolute left-[700px] top-[400px] w-[320px] h-[180px] rounded-2xl border border-[#6F2DFF]/30 bg-white shadow-[0_10px_40px_rgba(111,45,255,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(111,45,255,0.15)] hover:-translate-y-1">
            <ProcessCard {...processes[3]} />
          </div>

          {/* SVG Animated Path with continuous looping animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1280 620" preserveAspectRatio="none">
            {/* The Main Connecting Path with Rounded Corners - Using AnimatedPath for looping */}
            {/* Path segment 1: Card 1 down to junction */}
            <AnimatedPath
              d="M 130,207 V 270 Q 130,300 170,300 H 355 Q 380,295 385,320 V 400"
              delay={0}
            />
            {/* Path segment 2: Junction up to Card 3 */}
            <AnimatedPath
              d="M 385,330 Q 385,300 415,300 H 610 Q 640,300 640,270 V 207"
              delay={0.6}
            />
            {/* Path segment 3: Card 3 down to junction */}
            <AnimatedPath
              d="M 640,270 Q 640,300 670,300 H 865 Q 895,300 895,330 V 400"
              delay={1.2}
            />
            {/* Path segment 4: Junction up to Card 5 */}
            <AnimatedPath
              d="M 895,330 Q 890,300 925,300 H 1120 Q 1150,300 1150,270 V 207"
              delay={1.8}
            />

            {/* Independent Step Markers (01-05) - Evenly Spaced Midpoints */}
            {[
              { x: 130, y: 360, dir: 'down', label: '01' },
              { x: 390, y: 240, dir: 'up', label: '02' },
              { x: 640, y: 360, dir: 'down', label: '03' },
              { x: 895, y: 240, dir: 'up', label: '04' },
              { x: 1150, y: 360, dir: 'down', label: '05' }
            ].map((marker, i) => (
              <g key={i}>
                {/* Terminal Dot on line */}
                <circle cx={marker.x} cy={marker.y} r="3.5" fill="#1D0B2E" />

                {/* Dashed Line with animation */}
                <motion.line
                  x1={marker.x}
                  y1={marker.y}
                  x2={marker.x}
                  y2={marker.dir === 'down' ? marker.y + 100 : marker.y - 100}
                  stroke="#7B2CFF"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.2,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 2.5
                  }}
                />

                {/* Number Badge with pulse animation */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {/* Outer glow ring - pulsing */}
                  <motion.circle
                    cx={marker.x}
                    cy={marker.dir === 'down' ? marker.y + 120 : marker.y - 120}
                    r="22"
                    fill="transparent"
                    stroke="#7B2CFF"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  />
                  <circle
                    cx={marker.x}
                    cy={marker.dir === 'down' ? marker.y + 120 : marker.y - 120}
                    r="18"
                    fill="#7B2CFF"
                  />
                  <text
                    x={marker.x}
                    y={marker.dir === 'down' ? marker.y + 125 : marker.y - 117}
                    textAnchor="middle"
                    className="text-[13px] font-bold fill-white"
                  >
                    {marker.label}
                  </text>
                </motion.g>
              </g>
            ))}
          </svg>
        </div>

        {/* Mobile/Tablet Layout (Stacked) */}
        <div className="xl:hidden flex flex-col gap-6 max-w-2xl mx-auto">
          {processes.map((p, i) => (
            <div key={i} className="w-full min-h-[180px] h-auto rounded-2xl border border-[#6F2DFF]/30 bg-white shadow-[0_10px_40px_rgba(111,45,255,0.08)] overflow-hidden relative">
              <ProcessCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, heading, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white w-full h-full p-6 flex flex-col items-center justify-center text-center group transition-all duration-500"
    >
      <div className="text-[#6B46E5] font-semibold text-lg mb-2 tracking-tight">
        {step}
      </div>

      <h3 className="text-[#1a1a2e] font-bold text-xl mb-3 tracking-tight">
        {heading}
      </h3>

      <p className="text-[#1a1a2e] text-[14px] leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}
