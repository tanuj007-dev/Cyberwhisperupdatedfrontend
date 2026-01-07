"use client"
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Using existing assets that match the visual style
import mapAsset from './assets/map.png'
import remindAsset from './assets/remind.png'
import pcAsset from './assets/pc.png'
import defenceAsset from './assets/map.png'
import offAsset from './assets/remind.png'
import auditAsset from './assets/pc.png'

const services = [
    {
        badge: 'Simulate Real Attacks',
        title: 'Cyber Range',
        description: 'Hands-on cyber range environments with real-world attack scenarios, Red vs Blue team exercises, and customizable labs mapped to MITRE ATT&CK.',
        image: mapAsset
    },
    {
        badge: 'Build SOC Capability',
        title: 'SOC Deployment & Readiness',
        description: 'Support for SOC setup, workflows, and analyst readiness through real alerts, detection use cases, and operational best practices.',
        image: remindAsset
    },
    {
        badge: 'Threat Intelligence',
        title: 'Stay Ahead of Attackers',
        description: 'Monitor global threat patterns and leverage intelligence-driven insights to improve detection, response, and proactive defense.',
        image: pcAsset
    },
    {
        badge: 'Identify Critical Gaps',
        title: 'VAPT (Vulnerability Assessment & Pen Testing)',
        description: 'Identify vulnerabilities, assess risk exposure, and receive prioritized remediation guidance to strengthen security posture.',
        image: defenceAsset
    },
    {
        badge: 'Security Blueprint',
        title: 'Strategic Cyber Consulting',
        description: 'Tailored cybersecurity roadmaps, architecture reviews, and expert advisory aligned with business and compliance needs.',
        image: offAsset
    },
    {
        badge: 'Learn by Doing',
        title: 'Cybersecurity Education & Workshops ',
        description: 'Instructor-led workshops, cyber drills, and practical training programs delivered across universities and professional communities.',
        image: auditAsset
    }
]

export default function CoreServicesOverview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleCards(1);
            else if (window.innerWidth < 1024) setVisibleCards(2);
            else setVisibleCards(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % (services.length - visibleCards + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? services.length - visibleCards : prev - 1));
    };

    return (
        <section className="relative w-full bg-[#FBFAFF] py-12 md:py-24 px-4 md:px-6 overflow-hidden font-sans">
            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-xs md:text-[15px] font-semibold text-[#1a1a2e] uppercase tracking-[0.2em]">
                            CORE SERVICES OVERVIEW
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-[50px] font-semibold text-[#1a1a2e] tracking-tight leading-tight px-4"
                    >
                        Unlock Cyber Resilience with Cyber Whisper
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-slate-500 text-sm md:text-lg font-medium max-w-3xl mx-auto leading-relaxed px-4"
                    >
                        Hands-on cyber ranges, SOC-focused training, and expert-led consulting to help organizations and individuals strengthen security readiness.
                    </motion.p>
                </div>

                {/* Services Slider */}
                <div className="relative mb-12 overflow-hidden px-4">
                    <motion.div
                        className="flex"
                        animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className="px-4 shrink-0"
                                style={{ width: `${100 / visibleCards}%` }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative p-[2px] rounded-[2.5rem] overflow-hidden group h-full"
                                >
                                    {/* Moving Border Animation */}
                                    <div
                                        className="absolute inset-0 rounded-[2.5rem]"
                                        style={{
                                            background: "linear-gradient(90deg, #6932E2, #EBDFFF, #6932E2)",
                                            backgroundSize: "200% 100%",
                                            animation: "borderMove 3s linear infinite",
                                        }}
                                    />

                                    {/* Card Content */}
                                    <div className="relative bg-white rounded-[calc(2.5rem-2px)] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-start text-left min-h-[400px] md:min-h-[500px] h-full z-10">
                                        <span className="bg-[#E9E4FF] text-[#6B46E5] px-4 py-1.5 rounded-md text-xs md:text-[13px] font-bold mb-6">
                                            {service.badge}
                                        </span>

                                        <h3 className="text-lg md:text-xl font-semibold text-[#1a1a2e] mb-4 md:mb-5 tracking-tight">
                                            {service.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm md:text-[15px] mb-8 md:mb-12">
                                            {service.description}
                                        </p>

                                        <div className="mt-auto w-full bg-[#EDE2FF33] rounded-xl flex justify-center">
                                            <div className="relative w-full aspect-16/10 flex items-center justify-center">
                                                {service.image && (
                                                    <Image
                                                        src={service.image}
                                                        alt={service.title}
                                                        className="object-contain transition-transform duration-500 hover:scale-105"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full border border-purple-200 flex items-center justify-center text-[#6B46E5] hover:bg-[#6B46E5] hover:text-white transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-16 h-12 rounded-full border border-[#6B46E5] flex items-center justify-center text-[#6B46E5] hover:bg-[#6B46E5] hover:text-white transition-all active:scale-95 shadow-lg"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

            </div>

            {/* Keyframes for the border animation */}
            <style jsx>{`
                @keyframes borderMove {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 200% 50%;
                    }
                }
            `}</style>
        </section>
    )
}
