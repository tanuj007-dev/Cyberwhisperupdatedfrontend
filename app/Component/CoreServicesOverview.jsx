"use client"
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowLeft, ArrowRight, Zap, MessageCircle } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'

// Using newly generated high-quality 3D assets
import cyberRangeAsset from './assets/cyber_range.png'
import socDeploymentAsset from './assets/soc_deployment.png'
import threatIntelAsset from './assets/threat_intel.png'
import vaptAsset from './assets/vapt.png'
import consultingAsset from './assets/consulting.png'
import educationAsset from './assets/education.png'

const services = [
    {
        badge: 'Simulate Real Attacks',
        title: 'Cyber Range',
        description: 'Hands-on cyber range environments with real-world attack scenarios, Red vs Blue team exercises, and customizable labs mapped to MITRE ATT&CK.',
        image: cyberRangeAsset,
        color: '#8B5CF6', // Violet
        link: '/b2b' // Cyber Range is part of B2B services
    },
    {
        badge: 'Build SOC Capability',
        title: 'SOC Deployment & Readiness',
        description: 'Support for SOC setup, workflows, and analyst readiness through real alerts, detection use cases, and operational best practices.',
        image: socDeploymentAsset,
        color: '#8B5CF6', // Violet
        link: '/b2b' // SOC services are B2B
    },
    {
        badge: 'Threat Intelligence',
        title: 'Stay Ahead of Attackers',
        description: 'Monitor global threat patterns and leverage intelligence-driven insights to improve detection, response, and proactive defense.',
        image: threatIntelAsset,
        color: '#8B5CF6', // Violet
        link: '/b2b' // Threat Intelligence is B2B
    },
    {
        badge: 'Identify Critical Gaps',
        title: 'VAPT (Vulnerability Assessment & Pen Testing)',
        description: 'Identify vulnerabilities, assess risk exposure, and receive prioritized remediation guidance to strengthen security posture.',
        image: vaptAsset,
        color: '#8B5CF6', // Violet
        link: '/b2b' // VAPT is B2B service
    },
    {
        badge: 'Security Blueprint',
        title: 'Strategic Cyber Consulting',
        description: 'Tailored cybersecurity roadmaps, architecture reviews, and expert advisory aligned with business and compliance needs.',
        image: consultingAsset,
        color: '#8B5CF6', // Violet
        link: '/b2b' // Consulting is B2B
    },
    {
        badge: 'Learn by Doing',
        title: 'Cybersecurity Education & Workshops ',
        description: 'Instructor-led workshops, cyber drills, and practical training programs delivered across universities and professional communities.',
        image: educationAsset,
        color: '#8B5CF6', // Violet
        link: '/training' // Education is for individuals/training
    }
]

export default function CoreServicesOverview() {
    const [width, setWidth] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef();
    const x = useMotionValue(0);
    const { openEnquiry } = useEnquiry();

    // Scroll Indicator Logic
    const indicatorWidth = 40; // percent
    const trackWidth = 64; // px
    const indicatorX = useTransform(x, [0, -width], [0, trackWidth * (1 - indicatorWidth / 100)]);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                const isMobile = window.innerWidth < 768;
                const gap = isMobile ? 12 : 24;
                const padding = isMobile ? 8 : 16; // Account for px-1 (8px) or md:px-2 (16px) total horizontal padding
                const containerWidth = carouselRef.current.offsetWidth;
                const newCardWidth = isMobile ? containerWidth - padding : (containerWidth - (gap * 3) - padding) / 4;

                setCardWidth(newCardWidth);

                // Allow state and DOM to update before measuring scrollWidth
                setTimeout(() => {
                    if (carouselRef.current) {
                        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
                    }
                }, 50);
            }
        };

        // Initial calculation
        updateWidth();

        // Recalculate on resize
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            if (carouselRef.current && cardWidth > 0) {
                const isMobile = window.innerWidth < 768;
                const gap = isMobile ? 12 : 24;

                const newX = -(currentIndex * (cardWidth + gap));
                animate(x, newX, {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                });
            }
        };
        updatePosition();
    }, [currentIndex, x]);

    const slide = (direction) => {
        if (direction === 'next') {
            setCurrentIndex(prev => (prev < services.length - 1 ? prev + 1 : 0));
        } else {
            setCurrentIndex(prev => (prev > 0 ? prev - 1 : services.length - 1));
        }
    };

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        const swipeConfidenceThreshold = 10000;

        if (swipe < -swipeConfidenceThreshold) {
            slide('next');
        } else if (swipe > swipeConfidenceThreshold) {
            slide('prev');
        } else {
            const isMobile = window.innerWidth < 768;
            const gap = isMobile ? 12 : 24;
            const itemWidth = cardWidth + gap;

            const currentX = x.get();
            const projectedIndex = Math.round(-currentX / itemWidth);
            // Clamp isn't enough for looping logic in drag, so we stick to simple boundary clamping for free drag
            // but the buttons now allow full looping.
            const clampedIndex = Math.max(0, Math.min(projectedIndex, services.length - 1));

            setCurrentIndex(clampedIndex);
        }
    };

    // Cyber Grid Background Component
    const CyberGrid = () => (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
        </div>
    );

    return (
        <section className="relative w-full bg-slate-50 dark:bg-[#030014] py-16 md:py-24 overflow-hidden font-sans transition-colors duration-300">
            <CyberGrid />

            <div className="relative z-10 max-w-8xl mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1  "
                    >
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
                        <span className="text-[15px] font-semibold text-gray-800 dark:text-purple-200 tracking-wider uppercase">
                            Core Capabilities
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
                    >
                        Unlock Cyber Resilience with <span className="text-transparent bg-clip-text bg-purple-600">Cyber Whisper</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
                    >
                        Hands-on cyber ranges, SOC-focused training, and expert-led consulting to help organizations and individuals strengthen security readiness.
                    </motion.p>
                </div>

                {/* Carousel Wrapper with Desktop Navigation */}
                <div className="relative group">
                    {/* Infinite Carousel Logic */}
                    <div className="overflow-hidden">
                        <motion.div
                            ref={carouselRef}
                            className="cursor-grab active:cursor-grabbing outline-none flex gap-3 md:gap-6 py-4 px-1 md:px-2"
                            style={{ x }}
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            onDragEnd={handleDragEnd}
                        >
                            {/* Duplicate services 3 times for infinite feel */}
                            {[...services, ...services, ...services].map((service, idx) => (
                                <motion.div
                                    key={`${service.title}-${idx}`}
                                    className="relative rounded-2xl p-px group/card h-auto select-none pointer-events-auto shrink-0"
                                    style={{
                                        width: cardWidth > 0 ? `${cardWidth}px` : 'auto',
                                        minWidth: cardWidth > 0 ? `${cardWidth}px` : 'auto'
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: (idx % services.length) * 0.1 }}
                                >
                                    {/* Simplified Border - No blur during interaction */}
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-gray-200 via-white to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent opacity-50 group-hover/card:opacity-100 transition-opacity duration-300" />

                                    {/* Card Content - Solid backgrounds for performance */}
                                    <div className="relative h-full bg-white dark:bg-[#0F0720] rounded-2xl p-5 md:p-6 flex flex-col items-center text-center border border-gray-100 dark:border-white/5 overflow-hidden justify-between shadow-lg dark:shadow-none">

                                        {/* Simplified glow - no blur */}
                                        <div
                                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover/card:opacity-20 transition-opacity duration-300"
                                            style={{ background: service.color }}
                                        />

                                        {/* Top Content: Badge & Icon */}
                                        <div className="w-full flex flex-col items-center">
                                            {/* Badge */}
                                            <div className="w-full flex justify-between items-start mb-4">
                                                <span className="px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-700 border border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/5 transition-colors">
                                                    {service.badge}
                                                </span>
                                                <Zap className="w-4 h-4 text-gray-400 dark:text-gray-600 transition-colors" />
                                            </div>

                                            {/* 3D Icon */}
                                            <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 transition-transform duration-300 group-hover/card:scale-105">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Bottom Content: Text & Button */}
                                        <div className="w-full flex flex-col items-center">
                                            <h3
                                                className="text-base font-bold mb-3 transition-all text-center line-clamp-3 h-20 flex items-center justify-center px-2"
                                                style={{ color: service.color }}
                                            >
                                                {service.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-5 text-center line-clamp-3">
                                                {service.description}
                                            </p>

                                            <button
                                                onClick={openEnquiry}
                                                className="w-full py-2.5 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 shadow-sm dark:shadow-none dark:bg-white/5 dark:border-white/10 text-xs font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center gap-1 transition-all hover:gap-2 hover:border-purple-200 dark:hover:border-white/20"
                                            >
                                                Get a Quote
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Desktop Navigation Buttons */}
                    <button
                        onClick={() => slide('prev')}
                        className="hidden md:flex absolute top-1/2 -left-4 z-20 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white shadow-lg hover:scale-110 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 transition-all active:scale-95"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => slide('next')}
                        className="hidden md:flex absolute top-1/2 -right-4 z-20 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-[#1a0b2e] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white shadow-lg hover:scale-110 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 transition-all active:scale-95"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Navigation & Scroll Indicator */}
                <div className="flex flex-col items-center justify-center gap-6 mt-8">

                    {/* Mobile Navigation Buttons */}
                    <div className="flex md:hidden items-center gap-4">
                        <button
                            onClick={() => slide('prev')}
                            className="p-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 transition-all active:scale-95 shadow-sm"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Mobile Scroll Indicator */}
                        <div className="w-16 h-1 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-purple-500 to-blue-500"
                                style={{ width: `${indicatorWidth}%`, x: indicatorX }}
                            />
                        </div>

                        <button
                            onClick={() => slide('next')}
                            className="p-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 transition-all active:scale-95 shadow-sm"
                            aria-label="Next slide"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Desktop Scroll Indicator (Centered) */}
                    <div className="hidden md:flex items-center">
                        <div className="w-32 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-purple-500 to-blue-500"
                                style={{ width: `${indicatorWidth}%`, x: indicatorX }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
