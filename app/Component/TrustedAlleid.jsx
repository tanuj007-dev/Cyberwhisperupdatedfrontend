'use client';
import React from 'react';
import Image from 'next/image';

// Placeholder imports - In a real scenario, these would be the specific partner logos
// User should replace these with: ec_council.webp, offsec.webp, redhat.webp, cisco.webp, comptia.webp
import p1 from './assets/8c2bb507-5813-4116-8161-d54bd127ff60.png';
import p2 from './assets/off.webp';
import p3 from './assets/redhat.webp';
import p4 from './assets/cisco.webp';
import p5 from './assets/d435261e-363a-4d68-8ced-c635a6df096a.png';

const partners = [
    { name: 'EC-Council', logo: p1, glowColor: '#9f1d22' },
    { name: 'OffSec', logo: p2, glowColor: '#0088cc' },
    { name: 'Red Hat', logo: p3, glowColor: '#ee0000' },
    { name: 'CISCO', logo: p4, glowColor: '#00bceb' },
    { name: 'CompTIA', logo: p5, glowColor: '#ff0000' },
    // Duplicates for seamless scroll
    { name: 'EC-Council', logo: p1, glowColor: '#9f1d22' },
    { name: 'OffSec', logo: p2, glowColor: '#0088cc' },
    { name: 'Red Hat', logo: p3, glowColor: '#ee0000' },
    { name: 'CISCO', logo: p4, glowColor: '#00bceb' },
    { name: 'CompTIA', logo: p5, glowColor: '#ff0000' },
];

export default function TrustedAlleid() {
    return (
        <section className="w-full py-10 md:py-16 bg-white dark:bg-black overflow-hidden font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8 md:mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-600 rounded-[1px] shadow-[0_0_12px_rgba(147,51,234,0.5)]" />
                    <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-[0.25em]">
                        Trusted Allies
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400 leading-tight pb-2">
                    Global Learning Partners
                </h2>
            </div>

            <div className="relative w-full overflow-hidden px-0 md:px-6">
                {/* Gradient Masks for fading effect */}
                <div className="absolute top-0 left-0 h-full w-12 sm:w-20 md:w-40 bg-linear-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-12 sm:w-20 md:w-40 bg-linear-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

                {/* Carousel Track */}
                <div className="flex gap-8 sm:gap-16 md:gap-24 animate-partner-scroll w-max items-center">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="relative w-28 h-14 sm:w-36 sm:h-16 md:w-48 md:h-24 transition-transform duration-300 ease-out hover:scale-110 flex items-center justify-center cursor-pointer group"
                            style={{ '--glow-color': partner.glowColor }}
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                className="object-contain w-full h-full dark:drop-shadow-[0_0_15px_var(--glow-color)] transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
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
      `}</style>
        </section>
    );
}
