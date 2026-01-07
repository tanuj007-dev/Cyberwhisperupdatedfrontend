"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Using existing assets
import okayAsset from './assets/icon-park_okay.png'
import mapAsset from './assets/world.png'
import remindAsset from './assets/env.png'

const essentialCards = [
    {
        badge: 'Launch a test attack',
        title: 'Immersive Cyber Range',
        description: 'Spin up live, enterprise-grade networks riddled with APTs, DDoS storms exploits then practice neutralizing them in a safe sandbox. Every scenario is mapped to MITRE ATT&CK and scored so your team sees instant skill gains',
        image: mapAsset
    },
    {
        badge: 'Request a Security Blueprint',
        title: 'Strategic Cyber Consulting',
        description: 'Road-map reviews, architecture hardening, and board-level briefings tailored to your business size, risk appetite, and budget. We translate complex security gaps into clear, prioritized action plans.',
        image: remindAsset
    }
]

export default function Essentials() {
    return (
        <section className="relative w-full bg-white py-24 px-6 overflow-hidden font-sans">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full -translate-y-1/3 -translate-x-1/3 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/30 blur-[140px] rounded-full translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">

                {/* Left Section: Title & Subtext */}
                <div className="w-full lg:w-[30%] pt-12 text-center lg:text-left ">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 "
                    >
                        <div className="inline-flex items-center justify-center lg:justify-start">
                            <div className="w-12 h-12   flex items-center justify-center">
                                <Image src={okayAsset} alt="Okay" width={50} height={50} />
                            </div>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-semibold text-[#1a1a2e] tracking-tight">
                            Essentials
                        </h2>
                        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-[280px] mx-auto lg:mx-0">
                            Master everyday English basics.
                        </p>
                    </motion.div>
                </div>

                {/* Right Section: Cards Grid */}
                <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8">
                    {essentialCards.map((card, idx) => (
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
                            <div className="relative bg-white rounded-[calc(2.5rem-2px)] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.02)] flex flex-col items-start text-left h-full z-10 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(107,70,229,0.05)]">
                                <span className="bg-[#EFEEFF] text-[#6B46E5] px-4 py-1.5 rounded-md text-[13px] font-bold mb-6">
                                    {card.badge}
                                </span>

                                <h3 className="text-[22px] font-semibold text-[#1a1a2e] mb-5 tracking-tight group-hover:text-[#6B46E5] transition-colors">
                                    {card.title}
                                </h3>

                                <p className="text-slate-500 text-[14px] leading font-medium mb-12">
                                    {card.description}
                                </p>

                                <div className="mt-auto w-full flex justify-center">
                                    <div className="relative w-full aspect-16/10 bg-[#EDE2FF33]  flex items-center justify-center">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            className="object-contain transition-transform duration-700 group-hover:scale-110"
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
