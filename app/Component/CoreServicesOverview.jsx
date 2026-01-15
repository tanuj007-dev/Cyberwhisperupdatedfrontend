"use client"
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
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
        color: '#8B5CF6' // Violet
    },
    {
        badge: 'Build SOC Capability',
        title: 'SOC Deployment & Readiness',
        description: 'Support for SOC setup, workflows, and analyst readiness through real alerts, detection use cases, and operational best practices.',
        image: socDeploymentAsset,
        color: '#8B5CF6' // Violet
    },
    {
        badge: 'Threat Intelligence',
        title: 'Stay Ahead of Attackers',
        description: 'Monitor global threat patterns and leverage intelligence-driven insights to improve detection, response, and proactive defense.',
        image: threatIntelAsset,
        color: '#8B5CF6' // Violet
    },
    {
        badge: 'Identify Critical Gaps',
        title: 'VAPT (Vulnerability Assessment & Pen Testing)',
        description: 'Identify vulnerabilities, assess risk exposure, and receive prioritized remediation guidance to strengthen security posture.',
        image: vaptAsset,
        color: '#8B5CF6' // Violet
    },
    {
        badge: 'Security Blueprint',
        title: 'Strategic Cyber Consulting',
        description: 'Tailored cybersecurity roadmaps, architecture reviews, and expert advisory aligned with business and compliance needs.',
        image: consultingAsset,
        color: '#8B5CF6' // Violet
    },
    {
        badge: 'Learn by Doing',
        title: 'Cybersecurity Education & Workshops ',
        description: 'Instructor-led workshops, cyber drills, and practical training programs delivered across universities and professional communities.',
        image: educationAsset,
        color: '#8B5CF6' // Violet
    }
]

export default function CoreServicesOverview() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef();
    const x = useMotionValue(0);
    const { openEnquiry } = useEnquiry();

    // Scroll Indicator Logic
    const indicatorWidth = 40; // percent
    const trackWidth = 64; // px
    const indicatorX = useTransform(x, [0, -width], [0, trackWidth * (1 - indicatorWidth / 100)]);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    // Cyber Grid Background Component
    const CyberGrid = () => (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
        </div>
    );

    return (
        <section className="relative w-full bg-slate-50 dark:bg-[#030014] py-16 md:py-24 overflow-hidden font-sans transition-colors duration-300">
            <CyberGrid />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-gray-800 dark:text-purple-200 tracking-wider uppercase">
                            Core Capabilities
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
                    >
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Cyber Security</span> Solutions
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
                    >
                        Advanced defense mechanisms simulated in real-time environments to prepare your organization for modern threats.
                    </motion.p>
                </div>

                {/* Smooth Drag Carousel */}
                <motion.div
                    ref={carouselRef}
                    className="cursor-grab active:cursor-grabbing overflow-hidden"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        dragElastic={0.1} // Adds a nice rubber-band effect
                        dragTransition={{ power: 0.2, timeConstant: 600 }} // Ultra smooth inertia
                        style={{ x }}
                        whileTap={{ cursor: "grabbing" }}
                        className="flex gap-4 md:gap-6 py-4 px-2 items-stretch" // Ensure equal height
                    >
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                className="relative min-w-[280px] md:min-w-[320px] rounded-2xl p-[1px] group h-auto" // Auto height for content
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                                {/* Neon Gradient Border */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-200 via-white to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                                    style={{ background: `linear-gradient(to bottom, ${service.color}40, transparent)` }}
                                />

                                {/* Card Content */}
                                <div className="relative h-full bg-white/80 dark:bg-[#0F0720]/90 backdrop-blur-xl rounded-2xl p-5 md:p-6 flex flex-col items-center text-center border border-gray-100 dark:border-white/5 overflow-hidden justify-between shadow-sm dark:shadow-none">

                                    {/* Top glow effect */}
                                    <div
                                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                                        style={{ background: service.color }}
                                    />

                                    {/* Top Content: Badge & Icon */}
                                    <div className="w-full flex flex-col items-center">
                                        {/* Badge */}
                                        <div className="w-full flex justify-between items-start mb-4">
                                            <span className="px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-700 border border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/5 group-hover:border-white/20 transition-colors">
                                                {service.badge}
                                            </span>
                                            <Zap className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-purple-600 dark:group-hover:text-white transition-colors" />
                                        </div>

                                        {/* 3D Icon - Slightly Smaller for Compactness */}
                                        <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 group-hover:scale-110 transition-transform duration-500 ease-out">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom Content: Text & Button */}
                                    <div className="w-full flex flex-col items-center">
                                        <h3
                                            className="text-lg font-bold mb-3 transition-all text-center"
                                            style={{ color: service.color }}
                                        >
                                            {service.title}
                                        </h3>
                                        {/* Full Text - No Line Clamp */}
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-5 group-hover:text-gray-800 dark:group-hover:text-gray-300 text-center">
                                            {service.description}
                                        </p>

                                        <button
                                            onClick={openEnquiry}
                                            className="w-full py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 shadow-sm dark:shadow-none dark:bg-white/5 dark:border-white/10 text-xs font-semibold dark:text-white group-hover:bg-gray-100 dark:group-hover:bg-white/10 flex items-center justify-center gap-1 transition-all group-hover:gap-2 hover:border-purple-200 dark:hover:border-white/20"
                                        >
                                            Enquire Now
                                            <MessageCircle className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="hidden md:flex justify-center mt-8 gap-2">
                    <div className="w-16 h-1 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                            style={{ width: `${indicatorWidth}%`, x: indicatorX }}
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}
