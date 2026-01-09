"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { StatsSection } from "../Component/stats-section"
import { ValuesSection } from "../Component/values-section"
import { AboutHero } from "../Component/about-hero"
import { AboutVision } from "../Component/about-vision"
import { ApproachSection } from "../Component/approach-section"
// import { TeamSection } from "../Component/team-section"
import TeamSpecialists from "../Component/team-specialists"
import { motion } from "framer-motion"

// const Particles = dynamic(() => import("../Component/Particles"), { ssr: false })
const CyberBackground = dynamic(() => import("../Component/cyber-background").then(mod => mod.CyberBackground), { ssr: false })
import AboutThemeWrapper from "../Component/AboutThemeWrapper"

export default function AboutUsPage() {
    return (
        <AboutThemeWrapper>
            <main className="relative overflow-hidden">
                {/* Global Background Effects */}
                {/* <div className="fixed inset-0 pointer-events-none z-0">
                    <Particles
                        particleColors={['#ffffff', '#a855f7', '#6366f1']}
                        particleCount={150} // Slightly reduced for performance
                        particleSpread={12}
                        speed={0.1}
                        particleBaseSize={100}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                        className="opacity-30"
                    />
                </div> */}

                <CyberBackground />

                {/* Content Sections */}
                <div className="relative z-10">
                    <AboutHero />
                    <AboutVision />
                    <ApproachSection />

                    {/* Experience Section - Refined for Cyber Whisper Theme */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="py-24 border-y border-gray-200 dark:border-white/5 relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="w-full max-w-7xl mx-auto px-4 relative">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-8 text-gray-800 dark:text-white">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="space-y-4 text-center md:text-left"
                                    >
                                        <span className="text-primary font-bold uppercase tracking-widest text-sm flex items-center justify-center md:justify-start gap-2">
                                            <span className="w-8 h-px bg-primary"></span>
                                            What We Do
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl md:text-[50px] font-semibold leading-tight text-gray-900 dark:text-white">
                                            Protecting, preventing, <br />
                                            <span className="text-primary ">securing your digital future</span>
                                        </h2>
                                    </motion.div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed text-center md:text-left"
                                    >
                                        Cyber Whisper provides comprehensive cybersecurity services to safeguard your digital assets,
                                        prevent potential threats, and ensure a secure environment through immersive training and
                                        advanced defense mechanisms.
                                    </motion.p>
                                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6 glass-panel rounded-2xl border-gray-200 dark:border-white/5 hover:border-primary/20 transition-all group bg-white/50 dark:bg-transparent"
                                        >
                                            <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">25+</div>
                                            <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">
                                                Years of <br />
                                                Experience
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6, duration: 0.5 }}
                                            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-4 md:p-6 glass-panel rounded-2xl border-gray-200 dark:border-white/5 hover:border-primary/20 transition-all group bg-white/50 dark:bg-transparent"
                                        >
                                            <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">15K+</div>
                                            <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">
                                                Projects <br />
                                                Completed
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="relative"
                                >
                                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl aspect-square">
                                        <Image
                                            src="/cyber_security_expert_analysis_1767456147793.webp"
                                            alt="Expert Analysis"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Floating badge */}
                                    <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary flex flex-col items-center justify-center text-white text-center shadow-[0_0_30px_rgba(168,85,247,0.5)] z-20">
                                        <span className="text-2xl font-bold leading-none">25+</span>
                                        <span className="text-[10px] uppercase font-bold tracking-tighter">Years Exp.</span>
                                    </div>
                                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>

                    <StatsSection />
                    {/* <TeamSection /> */}
                    <TeamSpecialists />
                    <ValuesSection />


                </div>
            </main>
        </AboutThemeWrapper>
    )
}
