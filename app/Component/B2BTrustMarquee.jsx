"use client";
import React from 'react';

export default function B2BTrustMarquee() {
    const trustPoints = [
        "Include only items approved for public use",
        "Client/institution logos (4-8 max)",
        "Workshop partners (e.g., universities, institutes) if approved",
        "One short testimonial (single line) with name/title if approved",
        "Include only items approved for public use",
        "Client/institution logos (4-8 max)",
        "Workshop partners (e.g., universities, institutes) if approved",
        "One short testimonial (single line) with name/title if approved",
        "Include only items approved for public use",
        "Client/institution logos (4-8 max)",
        "Workshop partners (e.g., universities, institutes) if approved",
        "One short testimonial (single line) with name/title if approved"
    ];

    return (
        <section className="relative py-8 bg-white dark:bg-[#0B0420] border-y border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-300">
            {/* Marquee Container */}
            <div className="relative flex overflow-hidden">
                {/* First set of items */}
                <div className="flex items-center animate-marquee-slow whitespace-nowrap gap-6">
                    {trustPoints.map((point, index) => (
                        <div
                            key={`first-${index}`}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 min-w-fit"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shrink-0"></div>
                            <span className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                {point}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex items-center animate-marquee-slow whitespace-nowrap gap-6" aria-hidden="true">
                    {trustPoints.map((point, index) => (
                        <div
                            key={`second-${index}`}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 min-w-fit"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shrink-0"></div>
                            <span className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                {point}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

           

            {/* CSS for marquee animation */}
            <style jsx>{`
                @keyframes marquee-slow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% - 1.5rem));
                    }
                }
                
                .animate-marquee-slow {
                    animation: marquee-slow 70s linear infinite;
                }
                
                .animate-marquee-slow:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
