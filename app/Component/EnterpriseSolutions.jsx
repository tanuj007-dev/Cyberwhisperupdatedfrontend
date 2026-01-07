"use client"
import React from 'react';
import Image from 'next/image';
import Enterprise1 from './assets/Enterprises/1758821366664.jpg';
import Enterprise2 from './assets/Enterprises/IMG_20250228_112127.jpg';
import Enterprise3 from './assets/Enterprises/IMG_20250228_120104.jpg';
import Enterprise4 from './assets/Enterprises/EnterpriseAction4.jpg';

export default function EnterpriseSolutions() {
    const screenshots = [
        "Workshops & Seminars",
        "Live Cyber Range Training",
        "SOC & Lab Environments",
        "CTF Challenges & Events",
        "University & Community Programs"
    ];

    const images = [
        Enterprise1,
        Enterprise2,
        Enterprise3,
        Enterprise4
    ];

    return (
        <section className="bg-white py-12 px-6 md:px-12 font-sans overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left Column: Content */}
                    <div className="space-y-6">
                        {/* Badge */}
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#6b46e5] rounded-md shadow-[0_0_10px_rgba(107,70,229,0.4)]"></div>
                            <span className="text-[15px] font-semibold text-[#1a1a2e] uppercase tracking-[0.15em]">
                                OUR WORK IN ACTION
                            </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-3">
                            <h2 className="text-2xl md:text-[25px] font-semibold text-[#1a1a2e]  tracking-tight">
                                Inside Cyber Whisper: Training, Labs & Live Events


                            </h2>
                            <p className="text-gray-500 text-[15px] font-medium max-w-lg leading-relaxed">
                                A look at our workshops, cyber range sessions, hands-on labs, and competitive learning environments.
                            </p>
                        </div>

                        {/* Feature List (Tabs) */}
                        <div className="space-y-2 pt-2">
                            {screenshots.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between bg-[#f6f1ff] hover:bg-[#6b46e5] rounded-xl px-6 py-3.5 transition-all duration-300 cursor-pointer border border-[#6b46e5]/5 hover:border-[#6b46e5]/20 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    <span className="text-[#6b46e5] group-hover:text-white font-medium text-[15px] transition-colors">
                                        {item}
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <svg className="w-4 h-4 text-[#6b46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Image Grid */}
                    <div className="relative">
                        {/* Decorative Background Glows */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-38  bg-purple-100/30 blur-[60px] -z-10 rounded-full"></div>

                        <div className="grid grid-cols-2 gap-4">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square overflow-hidden rounded-3xl shadow-xl group transition-all duration-500 border-2 border-transparent hover:border-[#6b46e5]/10"
                                >
                                    <Image
                                        src={img}
                                        alt={`Enterprise Scene ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Subtle Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-0 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
}