"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CloudLightning, Key, ShieldCheck } from 'lucide-react';

const ResilienceCard = ({ icon: Icon, title, description, buttonText, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#0B0420] border border-white/5 hover:border-[#3b82f6]/50 transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

            <div>
                <div className="w-14 h-14 rounded-xl bg-[#150833] border border-white/10 flex items-center justify-center mb-6 text-[#3b82f6] group-hover:text-white group-hover:bg-[#3b82f6] transition-colors duration-300">
                    <Icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#3b82f6] transition-colors">
                    {title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {description}
                </p>
            </div>

            <button className="w-full py-3 px-4 rounded-lg border border-[#3b82f6]/30 text-[#3b82f6] text-xs font-bold uppercase tracking-wider hover:bg-[#3b82f6] hover:text-white transition-all duration-300">
                {buttonText}
            </button>
        </motion.div>
    );
};

export default function B2BResilience() {
    const cards = [
        {
            icon: CloudLightning,
            title: "Immersive Cyber Range",
            description: "Spin up live, enterprise-grade networks riddled with APTs, DDoS storms exploits then practice neutralizing them in a safe sandbox. Every scenario is mapped to MITRE ATT&CK and scored so your team sees instant skill gains.",
            buttonText: "Launch A Test Attack"
        },
        {
            icon: Key,
            title: "Strategic Cyber Consulting",
            description: "Road-map reviews, architecture hardening, and board-level briefings tailored to your business size, risk appetite, and budget. We translate complex security gaps into clear, prioritized action plans.",
            buttonText: "Request A Security Blueprint"
        },
        {
            icon: ShieldCheck,
            title: "Hands-On Workshops",
            description: "One-day and multi-week bootcamps that swap slide decks for keyboard time. From 'SIEM Zero-to-Hero' to 'Red-Team Ops,' every workshop ends with a certifiable capstone exercise.",
            buttonText: "See Upcoming Dates"
        }
    ];

    return (
        <section className="relative py-20 bg-[#150833] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/assets/grid.png')] opacity-[0.03] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Unlock Cyber Resilience with Cyber Whisper
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        Real-world labs, round-the-clock defense, and expert guidance <br className="hidden md:block" /> everything you need to outsmart tomorrow's threats.
                    </p>
                </motion.div>

                {/* Compact Cards Grid - Scroll Optimized for Mobile */}
                <div className="flex flex-col md:grid md:grid-cols-3 gap-6 relative">
                    {cards.map((card, index) => (
                        <ResilienceCard
                            key={index}
                            {...card}
                            delay={index * 0.15}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
