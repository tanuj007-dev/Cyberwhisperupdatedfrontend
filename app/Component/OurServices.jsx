"use client"
import React from 'react'
import Image from 'next/image'
import resilienceImage from './assets/17e80ce5-64bf-4de9-a2d1-f742e5ece091 (1).png'
import socIcon from './assets/1b9008d1-d9bd-46d8-aad6-0e8ef3620e96.png'
import rangeIcon from './assets/78477923-fecc-4460-bec5-e17b477c7b51.png'
import insightsIcon from './assets/service_icon_insights - Edited.png'
import { useRef, useState, useEffect } from 'react';
export default function OurServices() {
    const ref = useRef(null);
    const [activeWords, setActiveWords] = useState(0);

    const text =
        "We help organizations build security capabilities that work in the real world. Our approach combines continuous monitoring, realistic simulations, and actionable reporting — so your team is prepared for modern threats.";

    const words = text.split(" ");

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // 🔥 very small scroll range = fast fill
            const start = windowHeight * 0.9;
            const end = windowHeight * 0.65;

            const progress =
                (start - rect.top) / (start - end);

            const clamped = Math.min(Math.max(progress, 0), 1);

            const filledWords = Math.floor(clamped * words.length);

            setActiveWords(filledWords);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [words.length]);

    return (
        <section className="relative w-full bg-white dark:bg-black py-12 md:py-20 lg:py-32 overflow-hidden font-sans transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 lg:gap-20">

                    {/* Left Content Column */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6 md:space-y-2 order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-1000">
                        {/* Tag Badge */}
                        <div className="flex items-center gap-3 animate-fade-in">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
                            <span className="text-sm font-black text-[#1a1a2e] dark:text-white uppercase tracking-[0.2em]">
                                OUR SERVICES
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[49px] font-semibold text-[#1a1a2e] dark:text-white tracking-tight leading-tight">
                            Unlock Cyber Resilience <br className="hidden md:block" />
                            with <span className="text-[#6B46E5]">Cyber Whisper</span>
                        </h2>

                        {/* Description Paragraph */}
                        <p
                            ref={ref}
                            className="text-base sm:text-lg md:text-xl font-medium leading-snug max-w-[550px]"
                        >
                            {words.map((word, index) => (
                                <span
                                    key={index}
                                    className={`transition-colors duration-150 ${index < activeWords
                                        ? "text-slate-900 dark:text-gray-100"
                                        : "text-slate-400 dark:text-gray-600"
                                        }`}
                                >
                                    {word}{" "}
                                </span>
                            ))}
                        </p>

                        <ul className="space-y-6 mt-6 max-w-[600px]">
                            <li className="flex items-center gap-4 group">
                                <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                    <Image src={socIcon} alt="SOC Icon" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-base sm:text-lg text-slate-700 dark:text-gray-300 font-medium leading-normal">
                                    SOC-ready processes: triage → investigation → response → reporting
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                    <Image src={rangeIcon} alt="Range Icon" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-base sm:text-lg text-slate-700 dark:text-gray-300 font-medium leading-normal">
                                    Cyber Range exercises to validate detection and response safely
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                    <Image src={insightsIcon} alt="Insights Icon" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-base sm:text-lg text-slate-700 dark:text-gray-300 font-medium leading-normal">
                                    Actionable insights: reduce noise, improve visibility, strengthen readiness
                                </span>
                            </li>
                        </ul>
                        {/* Optional CTA or List could go here if needed later, but following the image for now */}
                    </div>

                    {/* Right Image Column */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2 animate-in fade-in slide-in-from-right duration-1000">
                        <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] flex items-center justify-center">
                            {/* Shockwaves */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-indigo-500/30 rounded-full animate-shockwave" style={{ animationDelay: '0s' }}></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-indigo-500/30 rounded-full animate-shockwave" style={{ animationDelay: '0.8s' }}></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-indigo-500/30 rounded-full animate-shockwave" style={{ animationDelay: '1.6s' }}></div>
                            </div>
                            <Image
                                src={resilienceImage}
                                alt="Cyber Resilience Illustration"
                                className="w-full h-auto object-contain select-none"
                                priority
                            />
                            {/* Subtle background glow to add depth */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-100/30 blur-[100px] rounded-full" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
