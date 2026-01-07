"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, MonitorSmartphone, Check } from 'lucide-react';

export default function B2BFeatures() {
    const features = [
        {
            icon: Shield,
            title: "Cyber Security Solutions",
            description: "Protect your entire digital ecosystem with end-to-end defenses, intelligence-driven threat detection, and proactive vulnerability management."
        },
        {
            icon: Server,
            title: "Cyber Range",
            description: "Immerse your teams in realistic, hands-on simulations that sharpen real-world defense strategies and build unshakeable cyber resilience."
        },
        {
            icon: MonitorSmartphone,
            title: "Cyber Security Consultation",
            description: "Discover your biggest vulnerabilities and explore tailored solutions—on us. Our experts will guide you through best practices to keep your business one step ahead of cyber threats."
        }
    ];

    return (
        <section className="relative py-24 bg-[#150833] text-white font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Column - Features List */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="flex gap-6 group"
                            >
                                {/* Icon Box */}
                                <div className="shrink-0 w-20 h-20 rounded-2xl bg-[#0B0420] border border-white/5 flex items-center justify-center shadow-lg group-hover:border-[#6B46E5]/50 group-hover:shadow-[0_0_20px_rgba(107,70,229,0.2)] transition-all duration-300">
                                    <feature.icon className="w-8 h-8 text-[#6B46E5] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                </div>
                                {/* Text */}
                                <div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#a855f7] transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-[15px]">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6B46E5]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                            We don’t just deploy and go <br className="hidden md:block" />
                            we partner with you for the long haul
                        </h2>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                            <p>
                                Our integrated approach goes beyond quick fixes, combining <strong className="text-white font-semibold">advanced AI</strong>, <strong className="text-white font-semibold">real-world simulations</strong>, and <strong className="text-white font-semibold">round-the-clock monitoring</strong> to keep you a step ahead of emerging threats.
                            </p>
                            <p>
                                Whether it’s <strong className="text-white font-semibold">incident response</strong>, <strong className="text-white font-semibold">malware removal</strong>, or <strong className="text-white font-semibold">staff training</strong>, we equip your team with the practical skills they need to spot and neutralize attacks before they escalate.
                            </p>
                            <p>
                                With <strong className="text-white font-semibold">99.9% Threat Coverage</strong> and a steadfast focus on continuous improvement, our solutions don’t just protect your business today—they pave the way for a secure, resilient future.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-8 mb-10">
                            <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </div>
                            <span className="text-white font-bold tracking-wide">99.9% Threat Coverage</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-5">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 bg-[#3b82f6] text-white font-bold rounded-lg shadow-lg hover:bg-[#2563eb] transition-colors uppercase text-sm tracking-wide"
                            >
                                Learn More
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 bg-transparent border border-[#3b82f6] text-white font-bold rounded-lg hover:bg-[#3b82f6]/10 transition-colors uppercase text-sm tracking-wide"
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
