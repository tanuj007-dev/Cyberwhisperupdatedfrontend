'use client';
import React from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';

// Use existing assets
import lab1 from './assets/work5.png';
import lab2 from './assets/work6.png';
import lab3 from './assets/work7.png';
import lab4 from './assets/work8.png';
import event1 from './assets/work1.png';
import event2 from './assets/work2.png';
import event3 from './assets/work3.png';
import event4 from './assets/work4.png';
import footerBg from './assets/footer-bg.png';

const techfestImages = [event1, event2, event3, event4, event1, event2, event3, event4, event1, event2, event3, event4]; // Duplicated for scrolling
const labImages = [lab1, lab2, lab3, lab4, lab1, lab2, lab3, lab4, lab1, lab2, lab3, lab4]; // Duplicated for scrolling

export default function HelpCenter() {
    return (
        <section className="w-full py-16 bg-[#FBF9FF] overflow-hidden font-sans relative">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${footerBg.src || footerBg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain'
                }}
            />
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* LEFT SIDE - Content & Carousels */}
                    <div className="lg:w-3/5 space-y-12">

                        {/* Section 1: Techfest */}
                        <div className="space-y-6">
                            <div className="relative">
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e] leading-tight">
                                    Immersive Tech Experiences in Our Workshop at Techfest 2025, IIT Bombay
                                </h2>
                                {/* Yellow Underline SVG */}
                                <svg className="w-40 h-3 mt-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="#FFD700" strokeWidth="3" fill="none" />
                                </svg>
                            </div>

                            {/* Infinite Horizontal Scroll */}
                            <div className="relative w-full overflow-hidden">


                                <div className="flex gap-4 animate-partner-scroll w-max">
                                    {techfestImages.map((img, i) => (
                                        <div key={i} className="relative min-w-[200px] h-[150px] md:min-w-[160px] md:h-[160px] rounded-xl overflow-hidden shrink-0">
                                            <Image src={img} alt="Techfest Workshop" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Learning Labs */}
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e]">
                                CyberWhisper High-End Learning Labs
                            </h2>

                            {/* Infinite Horizontal Scroll (Reverse or Same) */}
                            <div className="relative w-full overflow-hidden">



                                <div className="flex gap-4 animate-partner-scroll w-max">
                                    {labImages.map((img, i) => (
                                        <div key={i} className="relative min-w-[200px] h-[150px] md:min-w-[160px] md:h-[160px] rounded-xl overflow-hidden shrink-0">
                                            <Image src={img} alt="Learning Lab" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE - Sticky Form & Help */}
                    <div className="lg:w-2/5  space-y-8">

                        {/* Need Help Card */}
                        {/* Need Help Card with Moving Border */}
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
                            <div className="relative bg-white rounded-xl p-4 shadow-[0_2px_15px_rgba(0,0,0,0.05)] flex items-center justify-between h-full w-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#6B46E5]">
                                        <Phone size={24} />
                                    </div>
                                    <span className="font-semibold text-[#1a1a2e] text-lg">Need Help?</span>
                                </div>
                                <span className="text-[#6B46E5] font-bold text-lg">+91 9513805401</span>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="relative bg-white rounded-4xl p-8 shadow-[0_10px_40px_rgba(107,70,229,0.1)] border-2 border-[#6B46E5]">
                            <h3 className="text-2xl font-bold text-[#1a1a2e] mb-8">Get Free Demo Now</h3>

                            <form className="space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name *"
                                        className="w-full px-5 py-4 rounded-xl bg-[#F8F9FD] border border-gray-100 text-[#1a1a2e] focus:outline-none focus:border-[#6B46E5] focus:ring-1 focus:ring-[#6B46E5] transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone *"
                                        className="w-full px-5 py-4 rounded-xl bg-[#F8F9FD] border border-gray-100 text-[#1a1a2e] focus:outline-none focus:border-[#6B46E5] focus:ring-1 focus:ring-[#6B46E5] transition-all"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email *"
                                        className="w-full px-5 py-4 rounded-xl bg-[#F8F9FD] border border-gray-100 text-[#1a1a2e] focus:outline-none focus:border-[#6B46E5] focus:ring-1 focus:ring-[#6B46E5] transition-all"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button type="submit" className="w-full bg-[#1D0B2E] text-white font-bold py-4 rounded-full hover:bg-[#6B46E5] transition-all shadow-lg active:scale-95">
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
            animation: partner-scroll 30s linear infinite;
        }
        .animate-partner-scroll:hover {
            animation-play-state: paused;
        }

        @keyframes infinite-scroll-right {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes infinite-scroll-left {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
        }
        @keyframes borderMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
      `}</style>
        </section >
    );
}
