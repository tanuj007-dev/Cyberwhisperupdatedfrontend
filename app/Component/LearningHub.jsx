"use client"
import React from 'react';
import { motion } from 'framer-motion';

import { TbShieldCheckered } from "react-icons/tb";
const FeatureCard = ({ title, description, align = 'left' }) => (
    <div className={`max-w-[320px] ${align === 'right' ? 'text-right' : 'text-left'} pointer-events-auto`}>
        <h3 className="text-[#090B21] font-semibold text-xl mb-3 leading-tight tracking-tight uppercase font-sans">
            {title}
        </h3>
        <p className="text-[#090B21] text-[15px] leading-[1.6] font-medium">
            {description}
        </p>
    </div>
);

const AnimatedPath = ({ d, delay = 0 }) => (
    <g>
        <path
            d={d}
            fill="transparent"
            strokeWidth="2"
            stroke="#6b46e5"
            strokeOpacity="0.1"
            strokeLinecap="round"
        />
        <motion.path
            d={d}
            fill="transparent"
            strokeWidth="2.5"
            stroke="#6b46e5"
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

export default function LearningHub() {
    return (
        <section className="relative w-full bg-white py-24 px-6 overflow-hidden font-sans">

            {/* Background Corner Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            {/* Matrix Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#6b46e5 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

                {/* Header Section */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-5 h-5 bg-[#6b46e5] rounded shadow-[0_0_10px_rgba(107,70,229,0.3)]"></div>
                    <span className="text-[15px] font-semibold tracking-[0.2em] text-[#1a1a2e] uppercase">
                        Cyber Range Highlight
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a2e] mb-6 text-center tracking-tight">
                    Stay Connected, Keep Training
                </h2>

                <p className="max-w-3xl text-gray-500 text-lg md:text-xl  leading-[1.7] mb-24 text-center">
                    A unified cyber range where learners and teams simulate attacks, investigate threats, and practice real-world defence workflows.
                </p>

                {/* Main Interactive Diagram */}
                <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center">

                    {/* SVG Connections Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid meet">
                        {/* Left Fork Structure: Stem from center icon splitting to Top/Bottom cards */}
                        <AnimatedPath
                            d="M 285 110 L 320 110 Q 350 110 350 140 L 350 225 L 435 225 M 350 225 L 350 310 Q 350 340 320 340 L 285 340"
                            delay={0}
                        />

                        {/* Right Fork Structure */}
                        <AnimatedPath
                            d="M 715 110 L 680 110 Q 650 110 650 140 L 650 225 L 565 225 M 650 225 L 650 310 Q 650 340 680 340 L 715 340"
                            delay={0.5}
                        />
                    </svg>

                    {/* Central Icon */}
                    <div className="relative z-20 flex items-center justify-center pointer-events-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-[2.5rem] shadow-[0_15px_60px_rgba(107,70,229,0.2)] flex items-center justify-center border border-purple-50 group hover:scale-105 transition-transform duration-500"
                        >
                            <div className="w-20 h-20 bg-linear-to-br from-purple-50 to-white rounded-3xl flex items-center justify-center text-[#6b46e5]">
                                <TbShieldCheckered size={44} strokeWidth={2} />
                            </div>

                            {/* Ambient glow pulses */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-[#6b46e5]/5 animate-pulse blur-xl -z-10"></div>
                        </motion.div>
                    </div>

                    {/* Feature Cards Positioning */}
                    <div className="absolute inset-0 z-10 flex w-full h-full pointer-events-none">
                        {/* Left Column */}
                        <div className="flex flex-col flex-1 justify-between items-start h-full">
                            <FeatureCard
                                title="One dashboard joins red, blue, and observers together"
                                description="Unified Blue, Red & Observer View
Run attack, defence, and monitoring activities together in a single, shared environment."
                                align="left"
                            />
                            <FeatureCard
                                title="Plug-and-play access over a single link"
                                description="Instant Access via Secure Link
Launch labs and simulations instantly without complex setup or local configuration.
"
                                align="left"
                            />
                        </div>

                        {/* Gap for Central Icon */}
                        <div className="w-32 md:w-48"></div>

                        {/* Right Column */}
                        <div className="flex flex-col flex-1 justify-between items-end h-full">
                            <FeatureCard
                                title="Plug-and-play access over a single link"
                                description="Realistic Attack Simulations
Practice detection and response using real-world attack scenarios mapped to modern threat techniques."
                                align="right"
                            />
                            <FeatureCard
                                title="Real-time sync so every move appears instantly"
                                description="Live Activity & Event Sync
Every action, alert, and response appears in real time across dashboards and participants."
                                align="right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
