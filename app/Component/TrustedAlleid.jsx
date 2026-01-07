'use client';
import React from 'react';
import Image from 'next/image';

// Placeholder imports - In a real scenario, these would be the specific partner logos
// User should replace these with: ec_council.png, offsec.png, redhat.png, cisco.png, comptia.png
import p1 from './assets/ec.png';
import p2 from './assets/off.png';
import p3 from './assets/redhat.png';
import p4 from './assets/cisco.png';
import p5 from './assets/comptia.png';

const partners = [
    { name: 'EC-Council', logo: p1 },
    { name: 'OffSec', logo: p2 },
    { name: 'Red Hat', logo: p3 },
    { name: 'CISCO', logo: p4 },
    { name: 'CompTIA', logo: p5 },
    // Duplicates for seamless scroll
    { name: 'EC-Council', logo: p1 },
    { name: 'OffSec', logo: p2 },
    { name: 'Red Hat', logo: p3 },
    { name: 'CISCO', logo: p4 },
    { name: 'CompTIA', logo: p5 },
];

export default function TrustedAlleid() {
    return (
        <section className="w-full py-16 bg-white overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-3">
                    TRUSTED ALLIES IN PROGRESS
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
                    Our Valued Global Learning Partners
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for fading effect */}
                <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Carousel Track */}
                <div className="flex gap-16 md:gap-24 animate-partner-scroll w-max items-center">
                    {partners.map((partner, index) => (
                        <div key={index} className="relative w-40 h-20 md:w-48 md:h-24   transition-all duration-300    flex items-center justify-center">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                className="object-contain w-full h-full"
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
