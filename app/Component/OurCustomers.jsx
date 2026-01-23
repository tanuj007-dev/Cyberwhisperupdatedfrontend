"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import customer logos
import drdo from './assets/drdo-logo-hd.webp';
import nfsu from './assets/National_Forensic_Sciences_University_Logo.webp';
import mha from './assets/Ministry_of_Home_Affairs_India.svg';
import bsf from './assets/BSF_Logo.webp';
import delhiUni from './assets/68470838-8f33-488d-842f-21b1cedeefff.png';
import cgc from './assets/a75d76ef-5476-494f-a4ab-15d08d05ef0a.png';

const OurCustomers = () => {
    const customers = [
        { image: drdo, name: 'DRDO' },
        { image: nfsu, name: 'National Forensic Sciences University' },
        { image: mha, name: 'Ministry of Home Affairs' },
        { image: bsf, name: 'Border Security Force' },
        { image: delhiUni, name: 'University of Delhi' },
        { image: cgc, name: 'CGC Landran' }
    ];

    return (
        <section className="py-12 md:py-16 bg-background overflow-hidden font-sans transition-colors duration-300">
            {/* Elegant Divider */}
            <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
                <div className="w-full h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-[50px] text-foreground font-semibold tracking-tight mb-4  bg-linear-to-r from-primary via-foreground to-primary bg-clip-text text-transparent"
                    >
                        Our Customers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-muted-foreground text-lg font-medium max-w-3xl mx-auto"
                    >
                        Trusted by leading government organizations, universities, and enterprises across India.
                    </motion.p>
                </div>
            </div>

            {/* Infinite Scroll Container - Scrolling in opposite direction */}
            <div className="relative w-full overflow-hidden py-8 md:py-10">
                <div className="scroll-container-reverse">
                    {/* First set of logos */}
                    <div className="scroll-content-reverse">
                        {customers.map((customer, i) => (
                            <div
                                key={`original-${i}`}
                                className="customer-card group"
                            >
                                <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                    <Image
                                        src={customer.image}
                                        alt={customer.name}
                                        width={140}
                                        height={140}
                                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 relative z-10"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="scroll-content-reverse" aria-hidden="true">
                        {customers.map((customer, i) => (
                            <div
                                key={`duplicate-${i}`}
                                className="customer-card group"
                            >
                                <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                    <Image
                                        src={customer.image}
                                        alt={customer.name}
                                        width={140}
                                        height={140}
                                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 relative z-10"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient overlays */}
                <div className="absolute top-0 bottom-0 left-0 w-32 md:w-40 bg-linear-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-32 md:w-40 bg-linear-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />
            </div>

            <style jsx>{`
                .scroll-container-reverse {
                    display: flex;
                    width: max-content;
                    animation: scrollReverse 60s linear infinite;
                    will-change: transform;
                }

                .scroll-container-reverse:hover {
                    animation-play-state: paused;
                }

                .scroll-content-reverse {
                    display: flex;
                    gap: 1.5rem;
                    padding-right: 1.5rem;
                }

                @media (min-width: 768px) {
                    .scroll-content-reverse {
                        gap: 2.5rem;
                        padding-right: 2.5rem;
                    }
                }

                .customer-card {
                    flex-shrink: 0;
                    padding: 1.5rem;
                    border-radius: 1.5rem;
                    background: linear-gradient(135deg, var(--card) 0%, var(--card-foreground)/5 100%);
                    border: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 160px;
                    height: 130px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }

                @media (min-width: 768px) {
                    .customer-card {
                        padding: 2rem;
                        border-radius: 2rem;
                        min-width: 220px;
                        height: 160px;
                    }
                }

                .customer-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                    box-shadow: 0 15px 40px -15px var(--primary);
                }

                /* Reverse direction animation */
                @keyframes scrollReverse {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                /* Smooth hardware acceleration */
                .scroll-container-reverse,
                .customer-card,
                .customer-card img {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default OurCustomers;
