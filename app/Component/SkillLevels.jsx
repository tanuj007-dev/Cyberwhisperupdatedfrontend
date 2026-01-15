"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Using existing assets
import okayAsset from './assets/streamline-plump_star-medal.webp'
import socAsset from './assets/managed_soc_center_realistic_1768461677370.png'
import complianceAsset from './assets/compliance_navigator_digital_realistic_1768461706632.png'

const skillCards = [
    {
        badge: 'Book a Threat Readiness Call',
        title: '24 × 7 Managed SOC',
        description: 'Our analysts watch your telemetry all day, every day, so you don’t have to. AI-driven correlation, human threat hunting, and two-minute escalation mean incidents are contained before they make the news.',
        image: socAsset
    },
    {
        badge: 'Start a Free Gap Assessment',
        title: 'Compliance Navigator',
        description: 'GDPR, ISO 27001, PCI DSS pick your acronym. Our automated evidence collection and policy templates audit prep from months to days, all while tightening real security.',
        image: complianceAsset
    }
]

export default function SkillLevels() {
    return (
        <section id="skill-levels" className="relative w-full bg-white dark:bg-black py-24 px-6 overflow-hidden font-sans transition-colors duration-300">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/20 blur-[140px] rounded-full -translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">

                {/* Left Section: Title & Subtext */}
                <div className="w-full lg:w-[30%] pt-12 text-center lg:text-left h-fit">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center justify-center lg:justify-start ">
                            <div className="w-12 h-12   flex items-center justify-center">
                                <Image src={okayAsset} alt="Okay" width={50} height={50} />
                            </div>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-semibold text-[#1a1a2e] dark:text-white tracking-tight">
                            Skill Levels
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 text-lg md:text-xl font-medium max-w-[280px] mx-auto lg:mx-0">
                            Progress from beginner to advanced.
                        </p>
                    </motion.div>
                </div>

                {/* Right Section: Cards Grid */}
                <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative p-[2px] rounded-[2.5rem] overflow-hidden group"
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

                            {/* Card Content */}
                            <div className="relative bg-white dark:bg-gray-900 rounded-[calc(2.5rem-2px)] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.02)] flex flex-col items-start text-left h-full z-10 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(107,70,229,0.05)]">
                                <span className="bg-[#EFEEFF] text-[#6B46E5] px-4 py-1.5 rounded-md text-[13px] font-bold mb-6">
                                    {card.badge}
                                </span>

                                <h3 className="text-[22px] font-semibold text-[#1a1a2e] dark:text-white mb-5 tracking-tight group-hover:text-[#6B46E5] transition-colors">
                                    {card.title}
                                </h3>

                                <p className="text-slate-500 dark:text-gray-400 text-[14px]   font-medium mb-12 min-h-[100px]">
                                    {card.description}
                                </p>

                                <div className="mt-auto w-full flex   justify-center">
                                    <div className="relative w-full bg-[#EDE2FF33] dark:bg-purple-900/20 aspect-16/10 flex items-center justify-center rounded-2xl p-4">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            className="object-contain   transition-transform duration-700 group-hover:scale-110"
                                        />
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
