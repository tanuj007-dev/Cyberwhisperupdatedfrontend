"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Using existing assets
import okayAsset from './assets/mynaui_briefcase.webp'
import workshopAsset from './assets/workshop_keyboard_cyber_realistic_1768461443143.png'
import mentorshipAsset from './assets/mentorship_collaboration_cyber_realistic_1768461459740.png'
import cyberRangeAsset from './assets/cyber_range_network_3d_render_1768461480085.png'
import simulationAsset from './assets/digital_forensics_lab_3d_render_1768461501466.png'

const careerCards = [
    {
        badge: 'See Upcoming Dates',
        title: 'Hands-On Workshops',
        description: 'One-day and multi-week bootcamps that swap slide decks for keyboard time. From "SIEM Zero-to-Hero" to "Red-Team Ops," every workshop ends with a certifiable capstone exercise.',
        image: workshopAsset
    },
    {
        badge: 'Find Your Mentor',
        title: '1-to-1 Mentorship',
        description: 'Bridge the theory-to-practice gap with personal guidance from industry veterans. Perfect for SOC analysts, DevSecOps engineers, or managers stepping into cybersecurity leadership.',
        image: mentorshipAsset
    },
    {
        badge: 'Launch a test attack',
        title: 'Immersive Cyber Range',
        description: 'Spin up live, enterprise-grade networks riddled with APTs, DDoS storms exploits then practice neutralizing them in a safe sandbox. Every scenario is mapped to MITRE ATT&CK and scored so your team sees instant skill gains',
        image: cyberRangeAsset
    },
    {
        badge: 'Launch a test attack',
        title: 'Advanced Threat Labs',
        description: 'Dive into advanced threat simulation labs. Practice real-world incident response and forensic analysis in a controlled environment to sharpen your enterprise defense skills.',
        image: simulationAsset
    }
]

export default function CareerFocus() {
    return (
        <section id="career-focus" className="relative w-full bg-white dark:bg-black py-24 px-6 overflow-hidden font-sans transition-colors duration-300">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/20 blur-[140px] rounded-full -translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Section: Title & Subtext */}
                <div className="w-full lg:w-[30%] lg:sticky lg:top-24 h-fit text-center lg:text-left">
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
                        <h2 className="text-5xl md:text-5xl font-semibold  text-[#1a1a2e] dark:text-white tracking-tight">
                            Career Focus
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 text-lg md:text-xl font-medium max-w-[280px] mx-auto lg:mx-0">
                            Boost work communication skills.
                        </p>
                    </motion.div>
                </div>

                {/* Right Section: Cards Grid */}
                <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8">
                    {careerCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
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
                            <div className="relative bg-white dark:bg-gray-900 rounded-[calc(2.5rem-2px)] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.02)] flex flex-col items-start text-left h-full z-10 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(107,70,229,0.04)]">
                                <span className="bg-[#EFEEFF] text-[#6B46E5] px-4 py-1.5 rounded-md text-[13px] font-bold mb-6">
                                    {card.badge}
                                </span>

                                <h3 className="text-[22px] font-semibold text-[#1a1a2e] dark:text-white mb-5 tracking-tight group-hover:text-[#6B46E5] transition-colors">
                                    {card.title}
                                </h3>

                                <p className="text-slate-500 dark:text-gray-400 text-[14px]  font-medium mb-12">
                                    {card.description}
                                </p>

                                <div className="mt-auto w-full flex justify-center">
                                    <div className="relative w-full aspect-16/10 flex items-center justify-center bg-[#EDE2FF33] dark:bg-purple-900/20 rounded-2xl overflow-hidden p-4">
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
