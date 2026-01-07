"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import customer logos
import drdo from './assets/drdo-logo-hd.webp';
import nfsu from './assets/National_Forensic_Sciences_University_Logo.png';
import mha from './assets/Ministry_of_Home_Affairs_India.svg';
import bsf from './assets/BSF_Logo.png';
import delhiUni from './assets/aazqsu2va.webp';
import cgc from './assets/CGC_Landran_Logo_1080.avif';

const OurCustomers = () => {
    const customers = [
        { image: drdo, name: 'DRDO' },
        { image: nfsu, name: 'National Forensic Sciences University' },
        { image: mha, name: 'Ministry of Home Affairs' },
        { image: bsf, name: 'Border Security Force' },
        { image: delhiUni, name: 'University of Delhi' },
        { image: cgc, name: 'CGC Landran' },
    ];

    // Triple the array for seamless looping
    const scrollingCustomers = [...customers, ...customers, ...customers];

    return (
        <section className="py-24 bg-white overflow-hidden font-sans">
            {/* Simple Divider */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-[50px] text-black font-semibold tracking-tight mb-4">
                        Our Customers
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        Trusted by leading government organizations, universities, and enterprises across India.
                    </p>
                </div>
            </div>

            <div className="relative flex overflow-hidden py-10">
                <motion.div
                    animate={{
                        x: ["-33.33%", "0%"]  // Opposite direction - moves right to left visually
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        }
                    }}
                    className="flex gap-8 whitespace-nowrap"
                >
                    {scrollingCustomers.map((customer, i) => (
                        <div
                            key={i}
                            className="flex-none p-8 rounded-4xl bg-white shadow-lg border border-slate-100 flex flex-col items-center justify-center min-w-[260px] h-[180px] group transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10"
                        >
                            <div className="w-32 h-32 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                                <Image
                                    src={customer.image}
                                    alt={customer.name}
                                    width={140}
                                    height={140}
                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Left/Right Overlays for smooth fade */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
};

export default OurCustomers;
