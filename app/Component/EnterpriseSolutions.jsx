"use client"
import React from 'react';
import Image from 'next/image';
import Enterprise1 from './assets/Enterprises/1758821366664.webp';
import Enterprise2 from './assets/Enterprises/IMG_20250228_112127.webp';
import Enterprise3 from './assets/Enterprises/IMG_20250228_120104.webp';
import Enterprise4 from './assets/Enterprises/EnterpriseAction4.webp';

// Gallery Images
import Gallery1 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (1).webp';
import Gallery2 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (4).webp';
import Gallery3 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (12).webp';
import Gallery4 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.47 PM.webp';
import Gallery5 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.48 PM.webp';
import Gallery6 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.49 PM.webp';
import Gallery7 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.50 PM.webp';
import Gallery8 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (10).webp';

export default function EnterpriseSolutions() {
    const [activeTab, setActiveTab] = React.useState(0);

    const screenshots = [
        "Workshops & Seminars",
        "Live Cyber Range Training",
        "SOC & Lab Environments",
        "CTF Challenges & Events",
        "University & Community Programs"
    ];

    // Rotating the 4 images to creates distinct sets for each category
    const categoryImages = {
        0: [Gallery1, Gallery2, Gallery3, Gallery4],
        1: [Gallery5, Gallery6, Gallery7, Gallery8],
        2: [Enterprise1, Enterprise2, Enterprise3, Enterprise4],
        3: [Gallery1, Gallery3, Gallery5, Gallery7],
        4: [Gallery2, Gallery4, Gallery6, Gallery8]
    };

    return (
        <section className="bg-background py-12 px-6 md:px-12 font-sans overflow-hidden transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left Column: Content */}
                    <div className="space-y-6">
                        {/* Badge */}
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
                            <span className="text-[15px] font-semibold text-foreground uppercase tracking-[0.15em]">
                                OUR WORK IN ACTION
                            </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-3">
                            <h2 className="text-2xl md:text-[25px] font-semibold text-foreground  tracking-tight">
                                Inside Cyber Whisper: Training, Labs & Live Events
                            </h2>
                            <p className="text-muted-foreground text-[15px] font-medium max-w-lg leading-relaxed">
                                A look at our workshops, cyber range sessions, hands-on labs, and competitive learning environments.
                            </p>
                        </div>

                        {/* Feature List (Tabs) */}
                        <div className="space-y-2 pt-2">
                            {screenshots.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`group flex items-center justify-between rounded-xl px-6 py-3.5 transition-all duration-300 cursor-pointer border shadow-sm hover:shadow-lg hover:-translate-y-0.5
                                        ${activeTab === index
                                            ? 'bg-primary border-primary text-primary-foreground'
                                            : 'bg-secondary border-primary/5 hover:border-primary/20 text-primary'
                                        }`}
                                >
                                    <span className={`font-medium text-[15px] transition-colors ${activeTab === index ? 'text-primary-foreground' : 'text-primary group-hover:text-primary'}`}>
                                        {/* Adjusted hover text color to be consistent or just keep it simeple */}
                                        {item}
                                    </span>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${activeTab === index ? 'bg-primary-foreground/20 opacity-100' : 'bg-primary/10 opacity-0 group-hover:opacity-100'
                                        }`}>
                                        <svg className={`w-4 h-4 ${activeTab === index ? 'text-primary-foreground' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            {categoryImages[activeTab].map((img, index) => (
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