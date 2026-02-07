"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEnquiry } from '../context/EnquiryContext'

// Using existing assets
import { Award } from 'lucide-react'
import cardBg from './assets/essentials_bg.png'

const skillCards = [
    {
        title: 'Security Compliance + Strategic Consulting',
        description: 'Simplify compliance and execute a practical security roadmap aligned to business risk.',
        points: [
            'Gap assessment + control checklist + policy templates',
            'Audit-ready documentation support and evidence guidance',
            'Security roadmap (people/process/tech) with prioritized initiatives'
        ],
        cta: 'Book a Consultation'
    },
    {
        title: 'Virtual CISO (vCISO) Services',
        description: 'On-demand security leadership to guide your strategy, governance, and board communications without the full-time cost.',
        points: [
            'Board representation & security reporting',
            'Security program design & team oversight',
            'Vendor risk management & incident leadership'
        ],
        cta: 'Talk to a vCISO'
    }
]

export default function SkillLevels() {
    const { openEnquiry } = useEnquiry();
    return (
        <section id="skill-levels" className="relative w-full bg-white dark:bg-black py-12 md:py-24 px-6 overflow-hidden font-sans transition-colors duration-300">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/20 blur-[140px] rounded-full -translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-16">

                {/* Left Section: Title & Subtext */}
                <div className="w-full lg:w-[30%] pt-0 md:pt-12 text-center lg:text-left h-fit flex flex-col items-center lg:items-start text-balance">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start"
                    >
                        <div className="inline-flex items-center justify-center lg:justify-start">
                            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                                <Award className="w-8 h-8 md:w-12 md:h-12 text-[#6B46E5] dark:text-[#c084fc]" />
                            </div>
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] dark:text-white tracking-tight leading-[1.1]">
                            Governance & Advisory
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-lg font-medium max-w-md lg:max-w-xs mx-auto lg:mx-0 leading-relaxed">
                            Compliance clarity + practical security strategy for leadership and teams.
                        </p>
                    </motion.div>
                </div>

                {/* Right Section: Cards Grid */}
                <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-5">
                    {skillCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative h-full rounded-[2.5rem] p-[2px] overflow-hidden shadow-2xl"
                        >
                            {/* Moving Border Animation */}
                            <div
                                className="absolute inset-0 rounded-[2.5rem]"
                                style={{
                                    background: "linear-gradient(90deg, #6932E2, #EBDFFF, #6932E2)",
                                    backgroundSize: "200% 100%",
                                    animation: "borderMove 3s linear infinite",
                                }}
                            />

                            {/* Inner Card Content */}
                            <div className="relative h-full w-full rounded-[calc(2.5rem-2px)] bg-[#F5F3FF]/95 backdrop-blur-xl dark:bg-[#0f0720] dark:bg-none overflow-hidden transition-colors duration-300">

                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none mix-blend-multiply dark:mix-blend-normal">
                                    <Image src={cardBg} alt="Background" className="w-full h-full object-cover" />
                                </div>

                                {/* Gradient Overlay for Fade */}
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-[#0f0720]/0 dark:via-[#0f0720]/40 dark:to-[#0f0720]/90 pointer-events-none" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
                                    {/* Chip */}
                                    <div className="mb-4 md:mb-6">
                                        <span className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-[#DCD6F7] text-[#4c1d95] border border-[#6B46E5]/20 dark:bg-[#231242] dark:text-[#c084fc] dark:border-[#6B46E5]/30 shadow-sm">
                                            For Organizations
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-[#0f0720] dark:text-white mb-2 md:mb-3 tracking-tight group-hover:text-[#6B46E5] transition-colors">
                                        {card.title}
                                    </h3>

                                    <p className="text-[#1a1a2e] dark:text-gray-400 text-sm md:text-[15px] leading-relaxed font-semibold mb-4 md:mb-8">
                                        {card.description}
                                    </p>

                                    <ul className="space-y-2 md:space-y-4 mb-6 md:mb-10 w-full">
                                        {card.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2 md:gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6B46E5] dark:bg-[#8b5cf6] shrink-0 shadow-[0_0_10px_rgba(107,70,229,0.3)] dark:shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                                                <span className="text-[14px] md:text-[15px] font-bold text-[#0f0720] dark:text-gray-300">
                                                    {point}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto w-full">
                                        <button
                                            onClick={openEnquiry}
                                            className="w-full py-2.5 md:py-3 px-6 rounded-xl bg-[#6B46E5] hover:bg-[#5a3bc4] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95 border border-transparent hover:border-purple-400/30"
                                        >
                                            {card.cta}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

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
        </section>
    )
}
