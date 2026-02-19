"use client";
import React from 'react';
import { CloudLightning, Key, ShieldCheck } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
const ResilienceCard = ({ icon: Icon, title, description, bestFor, ctaLabel, onCtaClick }) => {
    return (
        <div className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0B0420] border border-gray-200 dark:border-white/5 hover:border-[#6B46E5]/50 transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(107,70,229,0.15)] shadow-lg dark:shadow-none">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-linear-to-b from-[#6B46E5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

            <div>
                <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-[#150833] border border-gray-200 dark:border-white/10 flex items-center justify-center mb-6 text-[#6B46E5] group-hover:text-white group-hover:bg-[#6B46E5] transition-colors duration-300">
                    <Icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#6B46E5] transition-colors text-left">
                    {title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 text-left">
                    {description}
                </p>

                <div className="mb-8 text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B46E5]">Best for:</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">
                        {bestFor}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onCtaClick}
                className="w-full py-3 px-4 rounded-lg border border-[#6B46E5]/30 text-[#6B46E5] text-xs font-bold uppercase tracking-wider hover:bg-[#6B46E5] hover:text-white transition-all duration-300"
            >
                {ctaLabel}
            </button>
        </div>
    );
};

export default function B2BResilience() {
    const { openEnquiry } = useEnquiry();
    const handleBookDemo = () => openEnquiry(true);

    const cards = [
        {
            icon: CloudLightning,
            title: "Immersive Cyber Range",
            description: "Your SOC team lacks live-fire experience? Our MITRE-mapped sandbox lets them battle APTs and ransomware safely, turning theory into battle-hardened reflexes.",
            bestFor: "SOC Teams, Universities & Cyber Defense Units",
            ctaLabel: "Book a Demo"
        },
        {
            icon: Key,
            title: "Strategic Cyber Consulting",
            description: "Security is costly when reactive. We provide architecture roadmaps and risk assessments tailored to your budget, translating technical gaps into a clear executive strategy.",
            bestFor: "CISOs, CTOs & Growth-Stage Startups",
            ctaLabel: "Book a Demo"
        },
        {
            icon: ShieldCheck,
            title: "Hands-On Workshops",
            description: "Slides don’t stop hackers—skills do. Our intensive bootcamps replace theory with keyboard time, delivering certifiable skills in SIEM, Red Teaming, and Forensics.",
            bestFor: "Corporate Training & Upskilling Teams",
            ctaLabel: "Book a Demo"
        }
    ];

    return (
        <section className="relative py-20 bg-gray-50 dark:bg-[#150833] overflow-hidden transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/assets/grid.webp')] opacity-[0.03] pointer-events-none invert dark:invert-0"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">

                <div className="mb-16">
                    <h1 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight transition-colors duration-300">
                        <span className="text-gray-900 dark:text-white">Unlock Cyber Resilience with </span>
                        <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent">Cyber Whisper</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light transition-colors duration-300">
                        Real-world labs, round-the-clock defense, and expert guidance <br className="hidden md:block" /> everything you need to outsmart tomorrow's threats.
                    </p>
                </div>

                {/* Compact Cards Grid - Scroll Optimized for Mobile */}
                <div className="flex flex-col md:grid md:grid-cols-3 gap-6 relative">
                    {cards.map((card, index) => (
                        <ResilienceCard
                            key={index}
                            {...card}
                            onCtaClick={handleBookDemo}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
