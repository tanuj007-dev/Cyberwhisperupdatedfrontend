"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEnquiry } from '../context/EnquiryContext'

// Using existing assets
import mapAsset from './assets/cyber_range_map_realistic_1768461852311.png'
import remindAsset from './assets/strategic_consulting_blueprint_realistic_1768461878616.png'
import { ShieldCheck } from 'lucide-react'
import cardBg from './assets/essentials_bg.png'

const essentialCards = [
    {
        title: 'Cyber Range & Simulation',
        description: 'Realistic attack simulations to test and improve your defenses in a safe environment.',
        points: [
            'Hands-on simulations mapped to real attacker behavior (safe & controlled)',
            'Red vs Blue exercises + blue-team defense drills',
            'Custom scenarios aligned to your tech stack and threat model'
        ],
        cta: 'Book a Demo'
    },
    {
        title: 'SOC Deployment + 24×7 Managed SOC',
        description: 'Build or upgrade your SOC, then operate it with continuous monitoring and rapid response.',
        points: [
            'SOC architecture + log onboarding + triage workflow',
            'High-signal detections + tuning to reduce false positives',
            'Investigation support with timelines, IOCs, and incident reporting'
        ],
        cta: 'Talk to an Expert'
    }
]

export default function Essentials() {
    const { openEnquiry } = useEnquiry();

    return (
        <section id="essentials" className="relative w-full bg-white dark:bg-black py-12 md:py-24 px-6 overflow-hidden font-sans transition-colors duration-300">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full -translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-16">

                {/* Left Section: Title & Subtext */}
                <div className="w-full lg:w-[30%] pt-0 md:pt-12 text-center lg:text-left ">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 md:space-y-6 "
                    >
                        <div className="inline-flex items-center justify-center lg:justify-start">
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                <ShieldCheck className="w-full h-full text-[#6B46E5] dark:text-white" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold text-[#1a1a2e] dark:text-white tracking-tight">
                            Essentials
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 text-base md:text-xl font-medium max-w-[280px] mx-auto lg:mx-0">
                            Core services that strengthen detection, response, and readiness.
                        </p>
                    </motion.div>
                </div>

                {/* Right Section: Cards Grid */}
                <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-5">
                    {essentialCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative p-[2px] rounded-3xl overflow-hidden group h-full"
                        >
                            {/* Moving Border Animation */}
                            <div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: "linear-gradient(90deg, #6932E2, #EBDFFF, #6932E2)",
                                    backgroundSize: "200% 100%",
                                    animation: "borderMove 3s linear infinite",
                                }}
                            />

                            {/* Card Content */}
                            <div className="relative bg-[#F5F3FF]/95 backdrop-blur-xl dark:bg-gray-900 rounded-[calc(1.5rem-2px)] p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.02)] flex flex-col items-start text-left h-full z-10 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(107,70,229,0.05)] overflow-hidden">

                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-50 pointer-events-none mix-blend-multiply dark:mix-blend-normal">
                                    <Image src={cardBg} alt="Background" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-black/60 dark:to-transparent pointer-events-none" />

                                <div className="relative z-10 w-full flex flex-col h-full">
                                    {/* Chip */}
                                    <div className="mb-3 md:mb-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-[#DCD6F7] text-[#4c1d95] border border-[#6B46E5]/20 dark:bg-[#6B46E5]/20 dark:text-purple-300 dark:border-[#6B46E5]/20 shadow-sm">
                                            For Organizations
                                        </span>
                                    </div>

                                    {/* Heading */}
                                    <h3 className="text-xl md:text-2xl font-bold text-[#0f0720] dark:text-white mb-2 md:mb-3 tracking-tight group-hover:text-[#6B46E5] transition-colors">
                                        {card.title}
                                    </h3>

                                    {/* Small Paragraph */}
                                    <p className="text-[#1a1a2e] dark:text-gray-400 text-sm md:text-[15px] leading-relaxed font-semibold mb-4 md:mb-6">
                                        {card.description}
                                    </p>

                                    {/* 3 Points */}
                                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 w-full">
                                        {card.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6B46E5] dark:bg-[#8b5cf6] shrink-0" />
                                                <span className="text-[14px] md:text-[15px] font-bold text-[#0f0720] dark:text-gray-300">
                                                    {point}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <div className="mt-auto w-full">
                                        <button
                                            onClick={openEnquiry}
                                            className="w-full py-2.5 md:py-3 px-6 rounded-xl bg-[#6B46E5] hover:bg-[#5a3bc4] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95">
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
