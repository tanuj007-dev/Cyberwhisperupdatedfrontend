'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import bannerLock from './assets/banner-lock.png';
import bannerAnalyst from './assets/banner-analyst.png';
import pathImg from './assets/path.png';

export default function Banner() {
    return (
        <section className="relative w-full py-12 md:py-20 bg-white overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Top Review Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-8 md:mb-12"
                >
                    <span className="text-[#1a1a2e] font-semibold text-base sm:text-lg">Review on</span>
                    <span className="text-[#1a1a2e] font-bold text-lg sm:text-xl flex items-center select-none">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                    </span>
                    <div className="flex items-center gap-0.5 mx-1 sm:mx-2">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                                <FaStar className="text-[#FBBC05] text-base sm:text-lg" />
                            </motion.div>
                        ))}
                    </div>
                    <span className="text-gray-600 font-medium text-xs sm:text-sm">2200+ reviews</span>
                </motion.div>

                {/* Main Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full bg-[#8B5CF6] rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl shadow-purple-200"
                >
                    {/* Background Texture Layers */}
                    <div className="absolute inset-0 z-0 opacity-50 mix-blend-overlay pointer-events-none">
                        <Image
                            src={pathImg}
                            alt="Background Pattern"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Floating Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />


                    {/* Images Container */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full">

                        {/* Image 1: Lock */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative w-full md:w-1/2 aspect-[16/10] bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-2xl sm:rounded-[1.5rem] shadow-lg border border-white/20"
                        >
                            <div className="relative w-full h-full rounded-xl sm:rounded-[1.2rem] overflow-hidden bg-gray-100">
                                <Image
                                    src={bannerLock}
                                    alt="Cyber Security Lock"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </motion.div>

                        {/* Image 2: Analyst */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative w-full md:w-1/2 aspect-[16/10] bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-2xl sm:rounded-[1.5rem] shadow-lg border border-white/20"
                        >
                            <div className="relative w-full h-full rounded-xl sm:rounded-[1.2rem] overflow-hidden bg-gray-100">
                                <Image
                                    src={bannerAnalyst}
                                    alt="Cyber Security Analyst"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </motion.div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}
