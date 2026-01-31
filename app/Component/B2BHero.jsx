"use client";
import React from 'react';
import Particles from './Particles';

const BackgroundAnimations = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Static Gradient Orb 1 - Top Right */}
            <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px]  bg-[#6B46E5]/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />

            {/* Static Gradient Orb 2 - Bottom Left */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px]   bg-[#8B5CF6]/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />

            {/* Static Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(#6B46E5 1px, transparent 1px), linear-gradient(90deg, #6B46E5 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
                }}
            />
        </div>
    );
};

export default function B2BHero() {
    return (
        <section className="relative py-16 md:py-24 bg-gray-50 dark:bg-[#150833] text-gray-900 dark:text-[#FFFDFF] flex items-center justify-center p-6 md:p-12 overflow-hidden font-sans transition-colors duration-300">
            <BackgroundAnimations />

            {/* OGL Particles Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Particles
                    particleColors={['#ffffff', '#a855f7', '#6366f1']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    className="opacity-60 dark:opacity-80"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Left Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <div className="space-y-4">
                        <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mx-auto lg:mx-0 w-fit">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6B46E5_0%,#FFFFFF_50%,#6B46E5_100%)]" />
                            <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[#150833] px-4 py-1.5 text-sm font-medium text-gray-900 dark:text-white backdrop-blur-3xl gap-2 transition-colors duration-300">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#6B46E5] opacity-75 animate-ping"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B46E5]"></span>
                                </span>
                                Enterprise Solutions
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
                            Fortify Your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6B46E5] dark:from-[#FFFDFF] via-[#A78BFA] to-[#6B46E5] transition-all duration-300">
                                Organization
                            </span>
                        </h1>
                    </div>

                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light transition-colors duration-300">
                        Cyber Whisper helps teams reduce risk with SOC enablement, cyber range training, and detection engineering - so you detect faster, investigate cleaner, and respond with confidence.
                    </p>

                    <ul className="space-y-2 max-w-lg mx-auto lg:mx-0 text-sm md:text-base text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6B46E5] shrink-0"></span>
                            <span>SOC Deployment & Enablement (SIEM / Wazuh / detection workflows)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6B46E5] shrink-0"></span>
                            <span>Cyber Range + CTF Programs (role-based tracks, realistic simulations)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6B46E5] shrink-0"></span>
                            <span>Threat Intelligence (CTI) + Response Playbooks (actionable, SOC-ready)</span>
                        </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                        <button className="group relative px-6 py-3 bg-[#6B46E5] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(107,70,229,0.4)] hover:shadow-[0_0_35px_rgba(107,70,229,0.6)] hover:scale-105 active:scale-95 transition-all w-full sm:w-auto overflow-hidden text-sm uppercase tracking-wide">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Book a Demo
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </span>
                        </button>

                        <button className="px-6 py-3 bg-transparent border border-[#6B46E5]/50 text-[#6B46E5] dark:text-white font-bold rounded-xl hover:bg-[#6B46E5]/10 hover:border-[#6B46E5] hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-sm uppercase tracking-wide">
                            Get a Quote
                        </button>
                    </div>
                </div>

                {/* Right Image Content */}
                <div className="relative flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[400px] lg:max-w-[550px] aspect-square flex items-center justify-center">
                        {/* Animated Rings */}
                        <div className="absolute inset-0 bg-linear-to-tr from-[#6B46E5]/30 to-transparent blur-[80px] rounded-full opacity-40" />

                        {/* Outer Ring */}
                        <div className="absolute inset-4 border border-[#6B46E5]/10 rounded-full" />
                        <div className="absolute inset-4 rounded-full border border-transparent border-t-[#A78BFA] shadow-[0_0_10px_#A78BFA] animate-[spin_8s_linear_infinite]" />

                        {/* Inner Ring */}
                        <div className="absolute inset-12 border border-[#6B46E5]/10 rounded-full" />
                        <div className="absolute inset-12 rounded-full border border-transparent border-b-[#A78BFA] shadow-[0_0_10px_#A78BFA] animate-[spin_6s_linear_infinite_reverse]" />

                        {/* Server Video */}
                        <div className="relative z-10 w-[85%] md:w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                            <video
                                src="/assets/enterprise-fortress.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-cover w-full h-full rounded-full"
                                suppressHydrationWarning
                            />
                        </div>

                        {/* Static Tech Badges */}
                        <div className="absolute top-[20%] mt-8 -right-4 bg-white/90 dark:bg-[#1E1145]/90 backdrop-blur-md border border-[#6B46E5]/30 p-2.5 rounded-lg shadow-xl z-20 transition-colors duration-300">
                            <div className="absolute inset-0 rounded-lg border border-[#A78BFA] opacity-50 animate-pulse pointer-events-none"></div>
                            <div className="flex items-center gap-2 relative z-10">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B46E5] dark:text-[#A78BFA] transition-colors duration-300">System Secure</span>
                            </div>
                        </div>

                        <div className="absolute bottom-[20%] -left-4 bg-white/90 dark:bg-[#1E1145]/90 backdrop-blur-md border border-[#6B46E5]/30 p-2.5 rounded-lg shadow-xl z-20 transition-colors duration-300">
                            <div className="absolute inset-0 rounded-lg border border-[#A78BFA] opacity-50 animate-pulse pointer-events-none"></div>
                            <div className="flex items-center gap-2 relative z-10">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#6B46E5]"></div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B46E5] dark:text-[#A78BFA] transition-colors duration-300">AI Monitoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
