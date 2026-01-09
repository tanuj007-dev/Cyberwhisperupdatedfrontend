'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import mainImg from './assets/ctf-poster.webp';

const StatCounter = ({ end, suffix = '', label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const count = useSpring(0, {
        stiffness: 60,
        damping: 30,
    });

    const rounded = useTransform(count, (latest) => Math.floor(latest));

    React.useEffect(() => {
        if (isInView) {
            count.set(end);
        }
    }, [isInView, end, count]);

    return (
        <div ref={ref} className="space-y-1">
            <div className="flex items-baseline gap-1">
                <motion.span className="text-4xl md:text-5xl font-bold text-[#6B46E5]">
                    {rounded}
                </motion.span>
                <span className="text-2xl font-bold text-[#6B46E5]">{suffix}</span>
            </div>
            <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
                {label}
            </p>
        </div>
    );
};

const CyberRangeStats = () => {
    return (
        <section className="py-12 md:py-20 bg-linear-to-br from-secondary to-muted px-4 md:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-xl border border-border">
                    <div className="grid lg:grid-cols-2 gap-0 items-stretch">

                        {/* Left Side: Content & Stats */}
                        <div className="p-6 md:p-12 lg:p-16 space-y-8 md:space-y-10 order-2 lg:order-1 flex flex-col justify-center">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
                                    <span className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-widest">
                                        INDUSTRIES AND LEARNERS SERVED
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight">
                                    Hands-On Cybersecurity at Scale<br />
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-[15px] font-semibold leading-relaxed max-w-lg">
                                    From classrooms to cyber ranges, we support learners and organizations with practical labs, simulations, and real-world security scenarios.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-12 md:gap-y-10">
                                <StatCounter end={100} suffix="+" label="CTF Challenges" />
                                <StatCounter end={200} suffix="+" label="Detection Labs" />
                                <StatCounter end={500} suffix="+" label="Training Modules" />
                                <StatCounter end={50} suffix="+" label="APT & Attack Scenarios" />
                            </div>
                        </div>

                        {/* Right Side: Single Main Image */}
                        <div className="relative order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-auto min-h-0 lg:min-h-full">
                            <div className="absolute inset-4 sm:inset-6 lg:inset-8 overflow-hidden rounded-3xl md:rounded-4xl shadow-2xl border border-border">
                                <Image
                                    src={mainImg}
                                    alt="Cyber Range Main Action"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#6B46E5]/5 mix-blend-overlay pointer-events-none" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CyberRangeStats;