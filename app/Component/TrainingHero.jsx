'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaDownload, FaWhatsapp, FaCalendarAlt, FaLanguage, FaGlobe, FaLaptopCode, FaCertificate, FaBriefcase } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";
import heroImg from './assets/cyber_classroom.png';
import crackImg from './assets/crack.webp';
import { FiDownload } from "react-icons/fi";
import Particles from './Particles';
import gridImage from './assets/grid.webp';
import essentialsBg from './assets/essentials_bg.png';
import Hyperspeed from './hyperspeedPresets';
import EnrollModal from './EnrollModal';

const TRAINING_TITLE = '1 Year Cyber Security Diploma Training';

export default function TrainingHero() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [enrollModalOpen, setEnrollModalOpen] = useState(false);

    return (
        <section className="relative w-full pt-20 md:pt-12 pb-8 md:pb-12 overflow-hidden bg-[#02000d] font-sans transition-colors duration-500">

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

                {/* Radial Overlays for Focus & Content Contrast */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#02000d]/60 to-[#02000d] z-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#6F2DFF15,transparent_70%)] z-20" />

                {/* Futuristic Grid - dark theme only */}
                <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] z-20" />

                {/* Scanlines Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] opacity-10 z-20" />
            </div>

            {/* OGL Particles Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Particles
                    particleColors={['#ffffff', '#a855f7', '#6366f1']}
                    particleCount={80}
                    particleSpread={20}
                    speed={0.04}
                    particleBaseSize={50}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    className="opacity-30"
                />
            </div>

            {/* Dynamic Glows - Centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center space-y-5 md:space-y-6"
                >
                    {/* Admission Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mt-10 rounded-full bg-[#0a0015]/70 border border-purple-500/30 backdrop-blur-md w-fit animate-fade-in shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                        <span className="text-white font-bold uppercase tracking-[0.05em] text-[11px] md:text-[11px]">12-Months Diploma Program</span>
                    </div>

                    {/* High-Tech Heading */}
                    <div className="space-y-5 max-w-7xl">
                            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-white drop-shadow-2xl px-2">
                            1 Year Cyber Security <br className="hidden md:block" />
                            Diploma Training + <span className="relative inline-block mt-1 md:mt-0">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">Expert AI Skills</span>
                                <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 bg-purple-600 rounded-full shadow-[0_4px_10px_rgba(251,191,36,0.5)]" />
                            </span>
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-4 md:pt-6 w-full max-w-7xl mx-auto px-2">
                            {/* Practical Tracks Info */}
                            <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs md:text-sm lg:text-base text-purple-200/80">
                                <span className="font-medium">Practical tracks:</span>
                                <span className="text-white font-black">SOC L1–L3,</span>
                                <span className="text-white/80 font-medium">Network Security, Cloud Security, AI Security</span>
                            </div>

                            {/* Subscription Badge */}
                            <div className="flex items-center gap-2 md:gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                                <span className="text-[11px] md:text-xs lg:text-sm text-purple-200/90 font-medium whitespace-nowrap">Get Premium Subscription of</span>
                                <div className="px-2.5 py-0.5 rounded-full bg-purple-600/40 border border-purple-500/40 text-white font-black text-[10px] md:text-xs lg:text-sm tracking-tight shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                    WhisperRange
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Metrics Row */}
                    <div className="flex flex-nowrap items-center justify-start md:justify-center gap-4 md:gap-10 w-full py-4 md:py-5 border-y border-white/5 bg-[#0a0015]/30 backdrop-blur-sm px-4 overflow-x-auto no-scrollbar scroll-smooth">
                        {[
                            { label: 'DURATION', value: '12 Months', icon: FaCalendarAlt, color: 'text-purple-400' },
                            { label: 'LANGUAGE', value: 'Hindi | English', icon: FaGlobe, color: 'text-white' },
                            { label: 'MODE', value: 'Online | Offline', icon: IoLogoWhatsapp, color: 'text-purple-300' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-row items-center gap-2 md:gap-4 group shrink-0">
                                <div className="p-1.5 md:p-3 rounded-lg md:rounded-2xl bg-purple-900/10 border border-purple-500/20 group-hover:border-purple-400/40 transition-all">
                                    <item.icon className="w-4 h-4 md:w-6 md:h-6 text-purple-400" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[8px] md:text-[10px] text-purple-200/70 font-bold tracking-[0.1em] md:tracking-[0.15em]">{item.label}</span>
                                    <span className="text-white font-bold text-[11px] md:text-lg whitespace-nowrap">{item.value === 'Online/Offline' ? 'Online | Offline' : item.value}</span>
                                </div>
                                {i < 2 && <div className="hidden md:block w-px h-8 bg-white/10 ml-4 md:ml-6" />}
                            </div>
                        ))}
                    </div>



                    {/* Subscription Pricing Card */}
                    <div className="w-full max-w-4xl p-px rounded-2xl md:rounded-3xl bg-linear-to-br from-primary/30 via-white/10 to-transparent backdrop-blur-xl mt-3 md:mt-4 px-2 md:px-0">
                        <div className="bg-[#02000d]/80 rounded-[0.95rem] md:rounded-[1.4rem] p-3.5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5 border border-white/5">
                            <div className="text-center md:text-left space-y-0.5 md:space-y-1">
                                <span className="text-purple-400 font-bold text-[9px] md:text-xs tracking-[0.2em] uppercase">Cyber Range</span>
                                <h4 className="text-white font-bold text-[17px] md:text-xl leading-tight">Individual Subscription</h4>
                                <span className="text-purple-200/70 font-bold text-[9px] md:text-xs uppercase tracking-wider block">CTF included</span>
                            </div>

                            <div className="flex items-center gap-4 md:gap-5">
                                <div className="flex items-baseline gap-1.5 md:gap-2">
                                    <span className="text-white font-black text-2xl md:text-3xl">
                                        {billingCycle === 'monthly' ? '₹1,999' : '₹19,999'}
                                    </span>
                                    <span className="text-purple-200/50 text-[11px] md:text-sm">
                                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                    </span>
                                </div>
                                <div className="flex items-center bg-white/5 rounded-lg p-0.5 md:p-1 border border-white/10 shrink-0">
                                    <button
                                        onClick={() => setBillingCycle('monthly')}
                                        className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-md text-[10px] md:text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-300/60'}`}
                                    >
                                        M
                                    </button>
                                    <button
                                        onClick={() => setBillingCycle('yearly')}
                                        className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-md text-[10px] md:text-xs font-bold transition-all ${billingCycle === 'yearly' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-300/60'}`}
                                    >
                                        Y
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setEnrollModalOpen(true)}
                                    className="flex-1 md:flex-none px-4 py-2.5 rounded-lg bg-purple-600 text-white font-bold text-[13px] md:text-sm hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                                >
                                    Join Now
                                </button>
                                <Link href="https://ctf.cyberwhisper.in/" className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-purple-500/30 text-white font-bold text-[13px] md:text-sm hover:bg-white/5 transition-all text-center">
                                    CTF
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section - Interactive Grid */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-5xl mx-auto px-2">
                        {/* Card 1: Labs */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex flex-col items-center text-center gap-2">
                                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    <FaLaptopCode className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <h5 className="text-white font-bold text-xs md:text-sm tracking-wide">Cyber Range Included</h5>
                                <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                                    Hands-on simulation labs integrated directly into the curriculum for real-world experience.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2: Certifications */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex flex-col items-center text-center gap-2">
                                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    <FaCertificate className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <h5 className="text-white font-bold text-xs md:text-sm tracking-wide">4+ Certification Tracks</h5>
                                <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                                    <span className="text-white/90">CCNA, CEH, Security+/CySA+, AWS Cloud</span> + Electives based on your goals.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3: Placement */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex flex-col items-center text-center gap-2">
                                <div className="p-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30">
                                    <FaBriefcase className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <h5 className="text-white font-bold text-xs md:text-sm tracking-wide">Career Support</h5>
                                <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                                    Internship letters & placement support for <span className="text-white/90 font-semibold">Big 4</span> & other top firms.
                                </p>
                            </div>
                        </motion.div>

                        <div className="col-span-full text-center mt-1">
                            <p className="text-purple-300/40 text-[10px] font-medium italic">
                                * Exam vouchers not included unless explicitly stated in your package.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <EnrollModal
                open={enrollModalOpen}
                onClose={() => setEnrollModalOpen(false)}
                courseTitle={TRAINING_TITLE}
                modalTitle="Join Now"
                submitLabel="Join Now"
            />

            {/* Custom Animations */}
            <style jsx>{`
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
            `}</style>
        </section>
    );
}

