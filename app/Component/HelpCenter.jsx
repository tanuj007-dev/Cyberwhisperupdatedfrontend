'use client';
import React from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';

// Use existing assets
import lab1 from './assets/work5.webp';
import lab2 from './assets/work6.webp';
import lab3 from './assets/work7.webp';
import lab4 from './assets/work8.webp';
import event1 from './assets/work1.webp';
import event2 from './assets/work2.webp';
import event3 from './assets/work3.webp';
import event4 from './assets/work4.webp';
import footerBg from './assets/footer-bg.webp';

const techfestImages = [event1, event2, event3, event4, event1, event2, event3, event4, event1, event2, event3, event4]; // Duplicated for scrolling
const labImages = [lab1, lab2, lab3, lab4, lab1, lab2, lab3, lab4, lab1, lab2, lab3, lab4]; // Duplicated for scrolling

export default function HelpCenter() {
    return (
        <section className="w-full py-12 md:py-20 bg-[#FBF9FF] dark:bg-black overflow-hidden font-sans relative transition-colors duration-300">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${footerBg.src || footerBg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain'
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* LEFT SIDE - Content & Carousels */}
                    <div className="w-full lg:w-3/5 space-y-10 md:space-y-12 order-2 lg:order-1">

                        {/* Section 1: Techfest */}
                        <div className="space-y-6">
                            <div className="relative">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1a1a2e] dark:text-white leading-tight max-w-[90%]">
                                    Immersive Tech Experiences in Our Workshop at Techfest 2025, IIT Bombay
                                </h2>
                                {/* Yellow Underline SVG */}
                                <svg className="w-32 md:w-40 h-2 md:h-3 mt-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="#FFD700" strokeWidth="3" fill="none" />
                                </svg>
                            </div>

                            {/* Infinite Horizontal Scroll */}
                            <div className="relative w-full overflow-hidden mask-linear-fade">
                                <div className="flex gap-3 md:gap-4 animate-partner-scroll w-max">
                                    {techfestImages.map((img, i) => (
                                        <div key={i} className="relative w-[180px] h-[120px] sm:w-[200px] sm:h-[140px] md:w-[220px] md:h-[160px] rounded-xl overflow-hidden shrink-0 shadow-md">
                                            <Image src={img} alt="Techfest Workshop" fill className="object-cover hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 180px, 220px" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Learning Labs */}
                        <div className="space-y-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1a1a2e] dark:text-white">
                                CyberWhisper High-End Learning Labs
                            </h2>

                            {/* Infinite Horizontal Scroll */}
                            <div className="relative w-full overflow-hidden mask-linear-fade">
                                <div className="flex gap-3 md:gap-4 animate-partner-scroll w-max" style={{ animationDirection: 'reverse' }}>
                                    {labImages.map((img, i) => (
                                        <div key={i} className="relative w-[180px] h-[120px] sm:w-[200px] sm:h-[140px] md:w-[220px] md:h-[160px] rounded-xl overflow-hidden shrink-0 shadow-md">
                                            <Image src={img} alt="Learning Lab" fill className="object-cover hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 180px, 220px" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE - Sticky Form & Help */}
                    <div className="w-full lg:w-2/5 space-y-6 md:space-y-8 order-1 lg:order-2">

                        {/* Need Help Card */}
                        <div className="relative rounded-xl p-[2px] overflow-hidden group">
                            {/* Animated Gradient Background */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #6932E2, #EBDFFF, #6932E2)",
                                    backgroundSize: "200% 100%",
                                    animation: "borderMove 3s linear infinite",
                                }}
                            />

                            {/* Inner Content */}
                            <div className="relative bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 shadow-sm flex flex-row items-center justify-between gap-4 h-full w-full">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-[#6B46E5] dark:text-purple-300 shrink-0">
                                        <Phone className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <span className="font-semibold text-[#1a1a2e] dark:text-white text-base md:text-lg whitespace-nowrap">Need Help?</span>
                                </div>
                                <a href="tel:+919513805401" className="text-[#6B46E5] dark:text-purple-300 font-bold text-base md:text-lg hover:underline whitespace-nowrap">+91 9513805401</a>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="relative bg-white dark:bg-gray-900 rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-[0_10px_40px_rgba(107,70,229,0.1)] border-2 border-[#6B46E5]">
                            <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] dark:text-white mb-6 md:mb-8 text-center md:text-left">Get Free Demo Now</h3>

                            <form className="space-y-4 md:space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name *"
                                        className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-[#F8F9FD] dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#1a1a2e] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base focus:outline-none focus:border-[#6B46E5] focus:ring-1 focus:ring-[#6B46E5] transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone *"
                                        className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-[#F8F9FD] dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#1a1a2e] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base focus:outline-none focus:border-[#6B46E5] focus:ring-1 focus:ring-[#6B46E5] transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email *"
                                        className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-[#F8F9FD] dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#1a1a2e] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base focus:outline-none focus:border-[#6B46E5] focus:ring-1 focus:ring-[#6B46E5] transition-all"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button type="submit" className="w-full bg-[#1D0B2E] dark:bg-purple-700 text-white font-bold py-3 md:py-4 rounded-full text-sm md:text-base hover:bg-[#6B46E5] dark:hover:bg-purple-600 transition-all shadow-lg active:scale-95">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>

            {/* Tailwind Custom Animations for Scrolling */}
            <style jsx global>{`
        @keyframes partner-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        .animate-partner-scroll {
            animation: partner-scroll 40s linear infinite; /* Slowed down for better view */
        }
        .animate-partner-scroll:hover {
            animation-play-state: paused;
        }
        @keyframes borderMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
      `}</style>
        </section >
    );
}
