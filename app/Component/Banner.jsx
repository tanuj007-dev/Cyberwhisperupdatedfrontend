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
        <section className="relative w-full py-10 bg-white overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Review Section */}
                <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-left duration-700">
                    <span className="text-[#1a1a2e] font-semibold text-lg">Review on</span>
                    <span className="text-[#1a1a2e] font-bold text-xl flex items-center">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                    </span>
                    <div className="flex items-center gap-1 mx-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-[#FBBC05] text-lg" />
                        ))}
                    </div>
                    <span className="text-gray-600 font-medium text-sm">2200+ reviews</span>
                </div>

                {/* Main Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full h-[300px] md:h-[450px] bg-[#8B5CF6] rounded-[2.5rem] flex items-center justify-center overflow-hidden px-4 md:px-12"
                >
                    {/* Background Texture Lines */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(${pathImg?.src || pathImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',

                        }}
                    />

                    {/* Images Container */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full z-10">

                        {/* Image 1: Lock */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative w-full md:w-[45%] aspect-video bg-white p-2 rounded-[1.5rem] shadow-2xl"
                        >
                            <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden">
                                <Image
                                    src={bannerLock}
                                    alt="Cyber Security Lock"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Image 2: Analyst */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative w-full md:w-[45%] aspect-video bg-white p-2 rounded-[1.5rem] shadow-2xl"
                        >
                            <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden">
                                <Image
                                    src={bannerAnalyst}
                                    alt="Cyber Security Analyst"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}
