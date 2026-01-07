"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import analystImage from './assets/b2b-analyst.png';

export default function B2BStats() {
    const stats = [
        { label: "CTF challenges", value: "100+" },
        { label: "Detection Labs", value: "200+" },
        { label: "Security Experts", value: "20+" },
        { label: "APT Scenarios", value: "50+" },
    ];

    return (
        <section className="relative py-24 bg-[#150833] text-white font-sans overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B46E5]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Card Area */}
                    <div className="w-full lg:w-1/2 flex">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#0B0420] rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden group shadow-2xl w-full flex items-center justify-center"
                        >
                            {/* Card Glow */}
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                                {/* Thumbnail Image */}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                                    <Image
                                        src={analystImage}
                                        alt="Work Process"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-[#6B46E5]/20 mix-blend-overlay"></div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
                                        Our Work Process <br /> With Clients
                                    </h3>

                                    <button className="flex items-center gap-3 text-[#6B46E5] font-bold tracking-wide text-sm group/btn hover:text-white transition-colors">
                                        <span className="w-10 h-10 rounded-full bg-[#6B46E5]/10 flex items-center justify-center group-hover/btn:bg-[#6B46E5] group-hover/btn:scale-110 transition-all duration-300">
                                            <Play className="w-4 h-4 fill-current" />
                                        </span>
                                        WATCH VIDEO
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Stats Grid */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center h-full">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-16">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 mb-2 font-mono tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <span className="text-gray-400 font-medium text-lg">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
