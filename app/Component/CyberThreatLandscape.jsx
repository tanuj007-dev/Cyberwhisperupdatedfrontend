"use client"
import React from 'react';
import Image from 'next/image';
import mapImg from "./assets/c2afcf94-e678-4aa2-8ceb-a6d37be4443e.png";
import footerBg from "./assets/footer-bg.webp";

// Extensive attack line routes for a busy, global look
const attackRoutes = [
    // Asia to Americas (Trans-Pacific)
    { id: 1, from: { x: 76, y: 38 }, to: { x: 20, y: 35 }, color: '#8b5cf6', delay: 0, speed: 1 }, // China -> US West
    { id: 2, from: { x: 82, y: 40 }, to: { x: 22, y: 32 }, color: '#a855f7', delay: 0.5, speed: 1.2 }, // Japan -> US West
    { id: 3, from: { x: 70, y: 45 }, to: { x: 24, y: 38 }, color: '#7c3aed', delay: 1.1, speed: 0.9 }, // India -> US
    { id: 4, from: { x: 78, y: 55 }, to: { x: 25, y: 45 }, color: '#c4b5fd', delay: 2.3, speed: 1.5 }, // Singapore -> Mexico
    { id: 5, from: { x: 85, y: 38 }, to: { x: 18, y: 30 }, color: '#818cf8', delay: 3.1, speed: 1.1 }, // Korea -> Canada

    // Europe to Americas (Trans-Atlantic)
    { id: 6, from: { x: 48, y: 30 }, to: { x: 28, y: 35 }, color: '#6366f1', delay: 0.2, speed: 0.8 }, // UK -> US East
    { id: 7, from: { x: 52, y: 32 }, to: { x: 30, y: 38 }, color: '#8b5cf6', delay: 0.8, speed: 1 }, // Germany -> US East
    { id: 8, from: { x: 50, y: 28 }, to: { x: 25, y: 32 }, color: '#a78bfa', delay: 1.5, speed: 1.3 }, // France -> Canada
    { id: 9, from: { x: 46, y: 35 }, to: { x: 32, y: 60 }, color: '#c084fc', delay: 2.1, speed: 1.4 }, // Spain -> Brazil
    { id: 10, from: { x: 54, y: 30 }, to: { x: 26, y: 40 }, color: '#6366f1', delay: 3.5, speed: 0.9 }, // Italy -> US South

    // Europe to Asia/Middle East
    { id: 11, from: { x: 50, y: 30 }, to: { x: 68, y: 42 }, color: '#a78bfa', delay: 1.2, speed: 1.1 }, // Europe -> India
    { id: 12, from: { x: 52, y: 32 }, to: { x: 75, y: 38 }, color: '#818cf8', delay: 2.0, speed: 1.6 }, // Europe -> China
    { id: 13, from: { x: 48, y: 32 }, to: { x: 58, y: 40 }, color: '#c4b5fd', delay: 0.7, speed: 0.9 }, // UK -> Middle East

    // Intra-Asia & Oceania
    { id: 14, from: { x: 75, y: 38 }, to: { x: 82, y: 68 }, color: '#7c3aed', delay: 1.8, speed: 1.2 }, // China -> Australia
    { id: 15, from: { x: 82, y: 40 }, to: { x: 78, y: 55 }, color: '#a855f7', delay: 0.4, speed: 0.8 }, // Japan -> Singapore
    { id: 16, from: { x: 70, y: 45 }, to: { x: 76, y: 38 }, color: '#8b5cf6', delay: 2.5, speed: 1 }, // India -> China
    { id: 17, from: { x: 82, y: 68 }, to: { x: 55, y: 50 }, color: '#6366f1', delay: 3.0, speed: 1.4 }, // Australia -> Africa

    // South America & Africa
    { id: 18, from: { x: 32, y: 60 }, to: { x: 52, y: 55 }, color: '#818cf8', delay: 1.3, speed: 1.1 }, // Brazil -> S. Africa
    { id: 19, from: { x: 30, y: 65 }, to: { x: 28, y: 38 }, color: '#a78bfa', delay: 2.8, speed: 1.3 }, // Argentina -> US
    { id: 20, from: { x: 55, y: 48 }, to: { x: 50, y: 32 }, color: '#c4b5fd', delay: 0.9, speed: 0.9 }, // Africa -> Europe

    // Cross-World Long Haul
    { id: 21, from: { x: 22, y: 35 }, to: { x: 82, y: 68 }, color: '#8b5cf6', delay: 4.0, speed: 1.8 }, // US -> Australia
    { id: 22, from: { x: 85, y: 35 }, to: { x: 48, y: 30 }, color: '#a855f7', delay: 3.8, speed: 1.7 }, // Russia -> UK
    { id: 23, from: { x: 32, y: 60 }, to: { x: 75, y: 38 }, color: '#6366f1', delay: 4.5, speed: 1.9 }, // Brazil -> China
    { id: 24, from: { x: 25, y: 35 }, to: { x: 70, y: 45 }, color: '#7c3aed', delay: 1.6, speed: 1.2 }, // US -> India
];

// Major Hubs (Hotspots)
const hotspots = [
    { x: 22, y: 32, r: 1.2 }, // US West
    { x: 28, y: 38, r: 1.5 }, // US East
    { x: 50, y: 30, r: 1.5 }, // Europe Central
    { x: 48, y: 28, r: 1.0 }, // UK
    { x: 75, y: 38, r: 1.5 }, // China
    { x: 82, y: 40, r: 1.2 }, // Japan
    { x: 70, y: 45, r: 1.3 }, // India
    { x: 82, y: 68, r: 1.0 }, // Australia
    { x: 32, y: 60, r: 1.2 }, // Brazil
    { x: 52, y: 55, r: 1.0 }, // S. Africa
    { x: 58, y: 40, r: 1.0 }, // Middle East
    { x: 78, y: 55, r: 0.8 }, // Singapore
];

export default function CyberThreatLandscape() {
    return (
        <section className="relative w-full bg-background py-4 md:py-8 px-4 md:px-6 overflow-hidden font-sans transition-colors duration-300">

            {/* Background Layer: footer-bg.webp */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                <Image
                    src={footerBg}
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Corner Gradients */}
            <div className="hidden md:block absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="hidden md:block absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Header Tag - Positioned with overlaying/negative margin logic */}
                <div className="relative z-20 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-lg md:text-xl font-semibold text-foreground tracking-tight">
                            Cyber Attacks Don't Stop. Training Shouldn't Either
                        </span>
                    </div>

                    {/* Description */}
                    <p className="max-w-4xl text-muted-foreground text-sm md:text-base font-medium leading-[1.6] mb-0">
                        Cyber attacks happen globally every minute. From ransomware and phishing to advanced persistent threats, modern attacks move fast and cross borders. Understanding how these attacks work is the first step to defending against them.
                    </p>
                </div>

                {/* Map Image container with SVG overlay - Pulled up to overlay */}
                <div className="w-full flex justify-center -mt-16 md:-mt-24 pointer-events-none">
                    <div className="w-full max-w-5xl relative">
                        {/* Map Image */}
                        <Image
                            src={mapImg}
                            alt="Cyber Threat Landscape Map"
                            width={1200}
                            height={600}
                            className="w-full h-auto object-contain opacity-90"
                            priority
                        />

                        {/* SVG Attack Lines Overlay */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <defs>
                                {/* Refined glow filter */}
                                <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="0.4" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Render attack lines */}
                            {attackRoutes.map((route, index) => {
                                const dx = route.to.x - route.from.x;
                                const dy = route.to.y - route.from.y;
                                const distance = Math.sqrt(dx * dx + dy * dy);

                                // Dynamic curve height based on distance
                                const curveHeight = Math.min(distance * 0.25, 20);
                                const midX = (route.from.x + route.to.x) / 2;
                                const midY = Math.min(route.from.y, route.to.y) - curveHeight;

                                const path = `M ${route.from.x} ${route.from.y} Q ${midX} ${midY} ${route.to.x} ${route.to.y}`;
                                const duration = (2.5 + (distance / 30)) / route.speed;

                                // Hide every 3rd line on mobile to improve performance
                                const mobileVisibilityClass = index % 3 === 0 ? "hidden md:block" : "";

                                return (
                                    <g key={route.id} className={mobileVisibilityClass}>
                                        {/* Static ultra-thin trail */}
                                        <path
                                            d={path}
                                            fill="none"
                                            stroke={route.color}
                                            strokeWidth="0.08"
                                            strokeOpacity="0.2"
                                            strokeLinecap="round"
                                        />

                                        {/* Animated dashing line */}
                                        <path
                                            d={path}
                                            fill="none"
                                            stroke={route.color}
                                            strokeWidth="0.2"
                                            strokeLinecap="round"
                                            strokeDasharray="4 60"
                                            strokeOpacity="0.6"
                                            className="glow-effect"
                                        >
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                values="0;-64"
                                                dur={`${duration}s`}
                                                repeatCount="indefinite"
                                                begin={`${route.delay}s`}
                                            />
                                        </path>

                                        {/* Primary moving particle */}
                                        <circle
                                            r="0.3"
                                            fill={route.color}
                                            opacity="0.9"
                                            className="glow-effect"
                                        >
                                            <animateMotion
                                                dur={`${duration}s`}
                                                repeatCount="indefinite"
                                                begin={`${route.delay}s`}
                                                path={path}
                                            />
                                        </circle>
                                    </g>
                                );
                            })}

                            {/* Hotspot markers */}
                            {hotspots.map((spot, i) => (
                                <g key={i}>
                                    {/* Expanding pulse ring */}
                                    <circle
                                        cx={spot.x}
                                        cy={spot.y}
                                        r={spot.r}
                                        fill="none"
                                        stroke="#8b5cf6"
                                        strokeWidth="0.1"
                                        opacity="0"
                                    >
                                        <animate
                                            attributeName="r"
                                            values={`${spot.r};${spot.r * 2.5}`}
                                            dur="2.5s"
                                            repeatCount="indefinite"
                                            begin={`${i * 0.1}s`}
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0.4;0"
                                            dur="2.5s"
                                            repeatCount="indefinite"
                                            begin={`${i * 0.1}s`}
                                        />
                                    </circle>

                                    {/* Static glow ring */}
                                    <circle
                                        cx={spot.x}
                                        cy={spot.y}
                                        r={spot.r}
                                        fill="#8b5cf6"
                                        opacity="0.1"
                                    />

                                    {/* Core dot */}
                                    <circle
                                        cx={spot.x}
                                        cy={spot.y}
                                        r={spot.r * 0.4}
                                        fill="#8b5cf6"
                                        className="glow-effect"
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Animated Marquee Section - Overlaid on Map Bottom Area */}
                <div className="w-full relative z-20 -mt-16 md:-mt-24 lg:-mt-32 overflow-hidden pb-8">
                    {/* Gradient overlays for fade effect - subtle and blending */}
                    <div className="absolute left-0 top-0 bottom-8 w-16 md:w-32 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-8 w-16 md:w-32 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

                    {/* Marquee Container */}
                    <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 animate-marquee whitespace-nowrap py-4 items-center">
                        {/* First set of items */}
                        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">2.3M+ Attacks Blocked Daily</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">99.9% Threat Detection Rate</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">150+ Countries Protected</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">24/7 Real-Time Monitoring</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">5000+ Pros Trained</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Zero-Day Response</span>
                            </div>
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 backdrop-blur-sm border border-purple-200/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800">2.3M+ Attacks Blocked Daily</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 backdrop-blur-sm border border-indigo-200/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800">99.9% Threat Detection Rate</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 backdrop-blur-sm border border-purple-200/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purp    le-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800">150+ Countries Protected</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 backdrop-blur-sm border border-indigo-200/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800">24/7 Real-Time Monitoring</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 backdrop-blur-sm border border-purple-200/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800">5000+ Pros Trained</span>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 bg-white/50 backdrop-blur-sm border border-indigo-200/50 shadow-lg rounded-full">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800">Zero-Day Response</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animation for Marquee & Glow Optimizations */}
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                .animate-marquee:hover {
                    animation-play-state: paused;
                }

                /* Only apply expensive SVG filters on non-mobile devices */
                .glow-effect {
                    filter: none;
                }
                @media (min-width: 768px) {
                    .glow-effect {
                        filter: url(#lineGlow);
                    }
                }
            `}</style>
        </section>
    );
}
