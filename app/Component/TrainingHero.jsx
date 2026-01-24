'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaDownload, FaWhatsapp, FaCalendarAlt, FaLanguage, FaGlobe } from 'react-icons/fa';
// Assuming the image will be placed in assets
// For now using the generated path directly or a placeholder if path is tricky
import { IoLogoWhatsapp } from "react-icons/io";
import heroImg from './assets/cyber_classroom.png';
import crackImg from './assets/crack.webp';
import { FiDownload } from "react-icons/fi";
import Particles from './Particles';
import gridImage from './assets/grid.webp';
import essentialsBg from './assets/essentials_bg.png';
import Hyperspeed from './hyperspeedPresets';

export default function TrainingHero() {
    const [billingCycle, setBillingCycle] = React.useState('monthly');

    return (
        <section className="relative w-full pt-28 md:pt-12 pb-6 md:pb-8 overflow-hidden bg-[#02000d] font-sans transition-colors duration-500">

            {/* Premium Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Hyperspeed Background Effect - Base Layer */}
                <div className="absolute inset-0 z-0 opacity-80">
                    <Hyperspeed
                        effectOptions={{
                            "distortion": "turbulentDistortion",
                            "length": 400,
                            "roadWidth": 10,
                            "islandWidth": 2,
                            "lanesPerRoad": 3,
                            "fov": 90,
                            "fovSpeedUp": 150,
                            "speedUp": 2,
                            "carLightsFade": 0.4,
                            "totalSideLightSticks": 20,
                            "lightPairsPerRoadWay": 40,
                            "shoulderLinesWidthPercentage": 0.05,
                            "brokenLinesWidthPercentage": 0.1,
                            "brokenLinesLengthPercentage": 0.5,
                            "lightStickWidth": [0.12, 0.5],
                            "lightStickHeight": [1.3, 1.7],
                            "movingAwaySpeed": [60, 80],
                            "movingCloserSpeed": [-120, -160],
                            "carLightsLength": [12, 80],
                            "carLightsRadius": [0.05, 0.14],
                            "carWidthPercentage": [0.3, 0.5],
                            "carShiftX": [-0.8, 0.8],
                            "carFloorSeparation": [0, 5],
                            "colors": {
                                "roadColor": 0x080808,
                                "islandColor": 0x0a0a0a,
                                "background": 0x000000,
                                "shoulderLines": 0x131313,
                                "brokenLines": 0x131313,
                                "leftCars": [0xd856bf, 0x6750a2, 0xc247ac],
                                "rightCars": [0x03b3c3, 0x0e5ea5, 0x324555],
                                "sticks": 0x03b3c3
                            }
                        }}
                    />
                </div>

                {/* Main Background Image - Subtle Overlay */}
                {/* <Image
                        src={essentialsBg}
                        alt="Cyber Background"
                        fill
                        className="object-cover opacity-70 dark:opacity-70 mix-blend-overlay z-10"
                        priority
                    /> */}

                {/* Radial Overlays for Focus & Content Contrast */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#02000d]/60 to-[#02000d] z-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#6F2DFF15,transparent_70%)] z-20" />

                {/* Futuristic Grid */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] z-20" />

                {/* Scanlines Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] opacity-10 z-20" />
            </div>

            {/* OGL Particles Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Particles
                    particleColors={['#ffffff', '#a855f7', '#6366f1']}
                    particleCount={100}
                    particleSpread={20}
                    speed={0.04}
                    particleBaseSize={60}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    className="opacity-20 dark:opacity-30"
                />
            </div>

            {/* Dynamic Glows - Centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />


            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center space-y-4"
                >
                    {/* Admission Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0015]/60 border border-purple-500/30 backdrop-blur-md w-fit animate-fade-in shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                        <span className="text-white/90 font-bold uppercase tracking-[0.1em] text-[11px]">Admissions Now Open For 2026</span>
                    </div>

                    {/* High-Tech Heading */}
                    <div className="space-y-4 max-w-5xl">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                            1 Year Cyber Security <br />
                            Diploma Training <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400">Expert AI Skills</span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-600 rounded-full shadow-[0_4px_10px_rgba(251,191,36,0.5)]" />
                            </span>
                        </h1>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 pt-2">
                            <span className="text-purple-200/80 font-medium tracking-wide text-sm md:text-base">Get Premium Subscription of</span>
                            <div className="px-4 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 backdrop-blur-md text-white font-bold text-sm tracking-widest hover:border-purple-500/50 transition-colors cursor-pointer group">
                                WhisperRange
                                <span className="block h-px w-0 group-hover:w-full bg-purple-500 transition-all duration-300" />
                            </div>
                        </div>
                    </div>

                    {/* Program Metrics Row */}
                    <div className="flex flex-nowrap items-center justify-center gap-4 md:gap-6 w-full py-3 border-y border-white/5 bg-[#0a0015]/20 backdrop-blur-sm overflow-x-auto no-scrollbar px-4 md:px-0 scroll-smooth">
                        {[
                            { label: 'DURATION', value: '12 Months', icon: FaCalendarAlt, color: 'text-purple-400' },
                            { label: 'LANGUAGE', value: 'Hindi | English', icon: FaGlobe, color: 'text-white' },
                            { label: 'MODE', value: 'Online | Offline', icon: IoLogoWhatsapp, color: 'text-purple-300' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 group shrink-0">
                                <div className="p-2 md:p-3 rounded-2xl bg-purple-900/10 border border-purple-500/20 group-hover:border-purple-400/40 transition-all">
                                    <item.icon className={`w-4 h-4 md:w-6 md:h-6 ${item.color}`} />
                                </div>
                                <div className="text-center md:text-left">
                                    <span className="block text-[8px] md:text-[10px] text-purple-200/60 font-bold tracking-[0.2em]">{item.label}</span>
                                    <span className="text-white font-bold text-xs md:text-lg whitespace-nowrap">{item.value}</span>
                                </div>
                                {i < 2 && <div className="hidden lg:block w-px h-10 bg-white/10 ml-6" />}
                            </div>
                        ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-row items-center justify-center gap-2 md:gap-3 pt-3 w-full px-2 md:px-0">
                        <button className="relative px-3 md:px-6 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-white font-bold text-xs md:text-sm tracking-wide hover:bg-purple-600/30 transition-all flex items-center justify-center gap-2 md:gap-3 flex-1 md:flex-none">
                            <FiDownload className="text-purple-300 w-3 h-3 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">Download Content</span>
                        </button>
                        <button className="relative px-3 md:px-6 py-2.5 rounded-xl border border-purple-500/20 hover:border-purple-500/50 text-white font-bold text-xs md:text-sm tracking-wide transition-all bg-[#0a0015]/40 backdrop-blur-md flex-1 md:flex-none whitespace-nowrap">
                            Chat on WhatsApp
                        </button>
                    </div>

                    {/* Subscription Pricing Card */}
                    {/* Subscription Pricing Card */}
                    <div className="w-full max-w-4xl p-0.5 md:p-1 rounded-3xl bg-gradient-to-br from-primary/20 via-white/5 to-transparent backdrop-blur-xl mt-3 md:mt-4">
                        <div className="bg-[#02000d]/60 rounded-[1.4rem] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/5">
                            <div className="text-center md:text-left space-y-0.5 md:space-y-1">
                                <span className="text-purple-300 font-bold text-[10px] md:text-sm tracking-widest uppercase">Cyber Range</span>
                                <h4 className="text-white font-bold text-lg md:text-xl">Individual Subscription</h4>
                                <span className="text-purple-200/70 font-bold text-[10px] md:text-xs uppercase tracking-wider block">CTF included</span>
                            </div>

                            <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2">
                                <div className="flex items-baseline gap-1 md:gap-2">
                                    <span className="text-white font-bold text-lg md:text-3xl">
                                        {billingCycle === 'monthly' ? '₹1,999' : '₹19,999'}
                                    </span>
                                    <span className="text-purple-200/60 text-xs md:text-sm">
                                        {billingCycle === 'monthly' ? '/month' : '/year'}
                                    </span>
                                </div>
                                <div className="flex items-center bg-purple-900/20 rounded-full p-0.5 md:p-1 border border-purple-500/20 order-last md:order-none">
                                    <button
                                        onClick={() => setBillingCycle('monthly')}
                                        className={`px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold transition-all ${billingCycle === 'monthly'
                                            ? 'bg-purple-600/30 text-white shadow-lg'
                                            : 'text-purple-300/60 hover:text-white'
                                            }`}
                                    >
                                        M
                                    </button>
                                    <button
                                        onClick={() => setBillingCycle('yearly')}
                                        className={`px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold transition-all ${billingCycle === 'yearly'
                                            ? 'bg-purple-600/30 text-white shadow-lg'
                                            : 'text-purple-300/60 hover:text-white'
                                            }`}
                                    >
                                        Y
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-row items-center gap-2 md:gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-4 py-2 md:px-6 md:py-3 rounded-xl border border-purple-400/30 bg-purple-400/10 text-purple-300 font-bold text-xs md:text-sm hover:bg-purple-400/20 transition-all whitespace-nowrap">
                                    Subscribe
                                </button>
                                <Link href="/ctf-offline" className="flex-1 md:flex-none px-4 py-2 md:px-6 md:py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-white font-bold text-xs md:text-sm hover:bg-purple-600/40 transition-all text-center whitespace-nowrap">
                                    Play CTF
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>



            {/* Custom Animations */}
            < style jsx > {`
                @keyframes beam-slow {
                    0% { transform: translateX(-100%) rotate(-12deg); }
                    100% { transform: translateX(100%) rotate(-12deg); }
                }
                @keyframes beam-fast {
                    0% { transform: translateX(-100%) rotate(12deg); }
                    100% { transform: translateX(100%) rotate(12deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse-slow {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-beam-slow { animation: beam-slow 15s linear infinite; }
                .animate-beam-fast { animation: beam-fast 10s linear infinite; }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .animate-spin-reverse-slow { animation: spin-reverse-slow 12s linear infinite; }
            `}</style >
        </section >
    );
}

