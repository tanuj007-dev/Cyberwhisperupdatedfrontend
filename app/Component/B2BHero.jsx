"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import serverImage from './assets/b2b-server.png';

const BackgroundAnimations = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6B46E5]/20 blur-[120px] rounded-full mix-blend-screen"
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/15 blur-[100px] rounded-full mix-blend-screen"
            />

            {/* Moving Grid Lines */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: '100% 100%' }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(107, 70, 229, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 70, 229, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
        </div>
    );
};

export default function B2BHero() {
    return (
        <section className="relative min-h-screen bg-[#150833] text-[#FFFDFF] flex items-center justify-center p-6 md:p-12 overflow-hidden font-sans">
            <BackgroundAnimations />

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8 text-center lg:text-left"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                        Fortify Your Organization <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFFDFF] to-[#6B46E5]">
                            with Intelligent Cyber Defense
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                        From AI-powered threat detection to immersive Cyber Range training, we safeguard your digital future so you can focus on what you do best. In an ever-evolving threat landscape, trust Cyber Whisper to keep you one step ahead.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-[#6B46E5] text-white font-bold rounded-xl shadow-[0_0_25px_rgba(107,70,229,0.4)] hover:shadow-[0_0_40px_rgba(107,70,229,0.6)] transition-all w-full sm:w-auto uppercase tracking-wider text-sm"
                        >
                            Learn More
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-[#6B46E5] text-white font-bold rounded-xl hover:bg-[#6B46E5]/10 transition-all w-full sm:w-auto uppercase tracking-wider text-sm"
                        >
                            Contact Us
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Image Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
                        {/* Animated Glow Behind */}
                        <div className="absolute inset-0 bg-linear-to-tr from-[#6B46E5]/30 to-transparent blur-[100px] rounded-full animate-pulse"></div>

                        {/* Server Image */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full"
                        >
                            <Image
                                src={serverImage}
                                alt="Enterprise Server B2B"
                                width={800}
                                height={800}
                                className="object-contain drop-shadow-2xl w-full h-auto"
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
