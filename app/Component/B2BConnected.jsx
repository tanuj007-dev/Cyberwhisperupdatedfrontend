"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import connectedImage from './assets/b2b-connected.png';

export default function B2BConnected() {
    const benefits = [
        "Plug-and-play access over a single link",
        "Real-time sync so every move appears instantly",
        "One dashboard joins red, blue, and observers together"
    ];

    return (
        <section className="relative py-24 bg-[#0B0420] text-white overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3b82f6]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-square max-w-[600px] mx-auto">
                            {/* Glow Effect */}
                            <div className="absolute inset-20 bg-[#3b82f6]/20 blur-[60px] rounded-full animate-pulse-slow"></div>

                            <Image
                                src={connectedImage}
                                alt="Stay Connected"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Stay Connected, Keep <br />
                            Training
                        </h2>

                        <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                            Your cyber-range sessions stay rock-solid anywhere your team logs in.
                        </p>

                        <ul className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                                    </div>
                                    <span className="text-lg font-medium text-gray-200">
                                        {benefit}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
