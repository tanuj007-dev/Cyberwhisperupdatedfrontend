"use client";
import React from 'react';
import { Shield, Server, MonitorSmartphone, Check, Lock, Cloud } from 'lucide-react';

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
        },
        {
            icon: Lock,
            title: "Data Loss Prevention",
            description: "Secure your critical assets with advanced encryption and real-time monitoring to prevent unauthorized access and data leaks."
        },
        {
            icon: Cloud,
            title: "Cloud Security",
            description: "Design and implement robust cloud security frameworks that scale with your business while maintaining compliance and data integrity."
        }
    ];

    return (
        <section className="relative py-24 bg-gray-50 dark:bg-[#150833] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Column - Features List */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-10">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex gap-6 group"
                            >
                                {/* Icon Box */}
                                <div className="shrink-0 w-20 h-20 rounded-2xl bg-white dark:bg-[#0B0420] border border-gray-200 dark:border-white/5 flex items-center justify-center shadow-lg group-hover:border-[#6B46E5]/50 group-hover:shadow-[0_0_20px_rgba(107,70,229,0.2)] transition-all duration-300">
                                    <feature.icon className="w-8 h-8 text-[#6B46E5] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                </div>
                                {/* Text */}
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#a855f7] transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Content */}
                    <div className="w-full lg:w-1/2">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6B46E5]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                        <h2 className="text-4xl md:text-[50px] font-semibold leading-tight mb-8 text-gray-900 dark:text-white transition-colors duration-300">
                            We don’t just deploy and go
                            we partner with you for the long haul
                        </h2>

                        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-light transition-colors duration-300">
                            <p>
                                Our integrated approach goes beyond quick fixes, combining <strong className="text-gray-900 dark:text-white font-semibold">advanced AI</strong>, <strong className="text-gray-900 dark:text-white font-semibold">real-world simulations</strong>, and <strong className="text-gray-900 dark:text-white font-semibold">round-the-clock monitoring</strong> to keep you a step ahead of emerging threats.
                            </p>
                            <p>
                                Whether it’s <strong className="text-gray-900 dark:text-white font-semibold">incident response</strong>, <strong className="text-gray-900 dark:text-white font-semibold">malware removal</strong>, or <strong className="text-gray-900 dark:text-white font-semibold">staff training</strong>, we equip your team with the practical skills they need to spot and neutralize attacks before they escalate.
                            </p>
                            <p>
                                With <strong className="text-gray-900 dark:text-white font-semibold">99.9% Threat Coverage</strong> and a steadfast focus on continuous improvement, our solutions don’t just protect your business today—they pave the way for a secure, resilient future.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-8 mb-10">
                            <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </div>
                            <span className="text-gray-900 dark:text-white font-bold tracking-wide transition-colors duration-300">99.9% Threat Coverage</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-5">
                            <button
                                className="px-8 py-3.5 bg-[#3b82f6] text-white font-bold rounded-lg shadow-lg hover:bg-[#2563eb] hover:scale-105 active:scale-95 transition-all uppercase text-sm tracking-wide"
                            >
                                Learn More
                            </button>
                            <button
                                className="px-8 py-3.5 bg-transparent border border-[#3b82f6] text-[#3b82f6] dark:text-white font-bold rounded-lg hover:bg-[#3b82f6]/10 hover:scale-105 active:scale-95 transition-all uppercase text-sm tracking-wide"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
