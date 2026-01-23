'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, Award, Users, TrendingUp } from 'lucide-react';
import placementImg from './assets/9c6955f8-5bcf-4724-9f2a-eae2b80ad8e5.png';

export default function PlacementCell() {
    return (
        <section className="w-full py-2 md:py-8 bg-[#0B0B15] overflow-hidden font-sans relative">
            {/* Tech Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.08]" style={{
                    backgroundImage: 'linear-gradient(#7B2CFF 1px, transparent 1px), linear-gradient(90deg, #7B2CFF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Smooth Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-4 md:mb-6">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400 leading-[1.1]"
                    >
                        Placement Cell
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
                    >
                        Connecting talent with opportunity through our dedicated placement portal.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

                    {/* Left Side: 3D Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex justify-center lg:justify-start relative"
                    >
                        <div className="relative w-full max-w-2xl">
                            {/* Image Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl scale-90"></div>

                            {/* The 3D Illustration */}
                            <div className="relative z-10 hover:scale-105 top-8 transition-transform duration-500 ease-in-out">
                                <Image
                                    src={placementImg}
                                    alt="Cybersecurity Placement Portal"
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                />
                            </div>





                        </div>
                    </motion.div>

                    {/* Right Side: Contact Card & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex flex-col gap-4"
                    >
                        {/* Main Glass Card */}
                        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B2CFF] to-purple-800 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-900/50">
                                        M
                                    </div>
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-1">Mansi Srivastava</h4>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                            <span className="text-purple-300 text-xs font-semibold tracking-wide uppercase">Placement Coordinator</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Phone Button */}
                                    <a href="tel:+919513805401" className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-800/30 border border-white/5 hover:border-purple-500/50 hover:from-purple-900/20 hover:to-purple-900/10 transition-all group/btn">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover/btn:scale-110 transition-transform">
                                                <Phone size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-purple-300/70 uppercase tracking-widest font-bold">Call Now</span>
                                                <span className="text-white font-semibold transition-colors">+91 9513805401</span>
                                            </div>
                                        </div>
                                    </a>

                                    {/* Email Button */}
                                    <a href="mailto:placement@craw.in" className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-800/30 border border-white/5 hover:border-purple-500/50 hover:from-purple-900/20 hover:to-purple-900/10 transition-all group/btn">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover/btn:scale-110 transition-transform">
                                                <Mail size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-purple-300/70 uppercase tracking-widest font-bold">Email Us</span>
                                                <span className="text-white font-semibold transition-colors">placement@craw.in</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Row - Compact */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-800/30 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-800/50 transition-colors">
                                <span className="text-2xl font-bold text-white mb-1">500+</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wide">Placements</span>
                            </div>
                            <div className="bg-gray-800/30 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-800/50 transition-colors">
                                <span className="text-2xl font-bold text-white mb-1">200+</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wide">Partners</span>
                            </div>
                            <div className="hidden md:flex bg-gray-800/30 border border-white/5 rounded-2xl p-4 flex-col items-center justify-center text-center hover:bg-gray-800/50 transition-colors">
                                <span className="text-2xl font-bold text-white mb-1">24/7</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wide">Support</span>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}
