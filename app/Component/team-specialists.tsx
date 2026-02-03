"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGlobe } from 'react-icons/fa'

import imgSonu from './assets/vikas.png'
import imgVikas from './assets/sonu.png'
import { useEnquiry } from '../context/EnquiryContext'

const teamMembers = [
    {
        name: "Sonu Mandecha",
        role: "Co-Founder | Director – Sales & Growth",
        image: imgVikas,
        bio: "Leads partnerships, client success, and growth at Cyber Whisper while also driving core delivery across Cyber Threat Intelligence (CTI) and Cyber Range operations. Ensures training and security programs align with real customer needs and measurable outcomes.",
        focusAreas: ["Sales & Partnerships", "Client Success", "CTI Programs", "Cyber Range Operations"],
        socials: {
            linkedin: "https://www.linkedin.com/in/sonu-mandecha-28a6aa16a/"
        }
    },
    {
        name: "Vikas Chauhan",
        role: "Co-Founder | Training Head | Cybersecurity Researcher & Speaker",
        image: imgSonu,
        bio: "Leads Cyber Whisper’s technical vision across Cyber Range, SOC enablement, and hands-on security training. Cybersecurity researcher and speaker focused on building analyst “muscle memory” through realistic labs, detection engineering, and investigation workflows.",
        focusAreas: ["Cyber Range", "SOC Operations", "Training & Enablement", "Research", "Public Speaking"],
        socials: {
            linkedin: "https://www.linkedin.com/in/vikas-chauhan-229786197"
        }
    }
]

export default function TeamSpecialists() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const { openEnquiry } = useEnquiry();

    return (
        <section className="py-24 bg-white dark:bg-[#0E0429] relative overflow-hidden transition-colors duration-300">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-50/50 dark:bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Section Heading */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-[48px] font-semibold text-[#1C0F2D] dark:text-white leading-tight md:leading-[1.1] max-w-7xl mx-auto tracking-tight px-2 md:px-0"
                    >
                        The minds, innovators, and problem-solvers driving our mission <span className="text-[#A855F7]">to create safer digital ecosystems</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-5xl lg:max-w-5xl mx-auto leading-tight px-2 md:px-0"
                    >
                        We are a team of security practitioners, researchers, and trainers who care about capability. Whether it is SOC readiness, detection engineering, threat intelligence, or incident response, the focus stays practical: clear workflows, strong fundamentals, and repeatable execution in real tools and real scenarios.
                    </motion.p>
                </div>

                {/* Team Grid - Centered 2 cols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="w-full">
                            {/* DESKTOP CARD (Hover Expand) - hidden on mobile */}
                            <DesktopTeamCard member={member} index={index} setHoveredId={setHoveredId} hoveredId={hoveredId} />

                            {/* MOBILE CARD (Tap Flip) - visible on mobile */}
                            <MobileTeamCard member={member} />
                        </div>
                    ))}
                </div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 flex flex-wrap items-center justify-center gap-4 text-center"
                >
                    <span className="bg-[#6B46E5] text-white text-[11px] font-black uppercase px-3 py-1 rounded-md shadow-lg shadow-blue-500/20">Free</span>
                    <p className="text-[#1C0F2D] dark:text-white text-lg font-medium">
                        Let's Create Something Better Together -
                        <a
                            onClick={openEnquiry}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-[#6B46E5] underline decoration-2 underline-offset-4 hover:text-[#6B46E5] transition-colors font-extrabold"
                        >
                            Contact Us Today!
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

function MobileTeamCard({ member }: { member: typeof teamMembers[0] }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="block md:hidden w-full aspect-[3/4] [perspective:1000px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2.5rem] overflow-hidden shadow-xl">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-wide">{member.name}</h3>
                        <p className="text-sm text-purple-300 font-medium uppercase tracking-wider mt-1">{member.role.split('|')[0]}</p>
                        <div className="mt-3 flex items-center gap-2 text-white/60 text-xs">
                            <span className="bg-white/20 p-1.5 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></span>
                            Tap to view details
                        </div>
                    </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1C1F2E] rounded-[2.5rem] overflow-hidden p-6 flex flex-col items-center justify-center text-center border border-purple-500/20 shadow-xl">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full bg-purple-900/10 pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wide">{member.name}</h3>
                            <p className="text-xs text-purple-300 font-medium uppercase tracking-wider mt-1">{member.role}</p>
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                            {member.bio}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {member.focusAreas.map((area, i) => (
                                <span key={i} className="text-[10px] uppercase font-bold text-[#A855F7] bg-[#A855F7]/10 px-2 py-1 rounded-full border border-[#A855F7]/20">
                                    {area}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-2 pt-4 justify-center">
                            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-widest">Connect on LinkedIn</span>
                            <SocialIcon href={member.socials.linkedin} icon={<FaLinkedinIn size={16} />} />
                        </div>
                    </div>

                    {/* Close hint */}
                    <div className="absolute bottom-4 text-white/30 text-xs">Tap to flip back</div>
                </div>
            </motion.div>
        </div>
    );
}

function DesktopTeamCard({ member, index, setHoveredId, hoveredId }: { member: typeof teamMembers[0], index: number, setHoveredId: any, hoveredId: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            className="hidden md:block relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500 w-full"
        >
            {/* Profile Image */}
            <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />

            {/* Animated Detail Box */}
            <div className="absolute inset-x-4 bottom-4 z-20">
                <motion.div
                    className="bg-[#1C1F2E]/95 backdrop-blur-xl rounded-3xl overflow-hidden relative border border-white/10"
                    animate={{
                        height: hoveredId === index ? 'auto' : 100,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                    style={{ minHeight: '100px' }}
                >
                    <div className="h-full flex flex-col items-center justify-start p-6 text-center w-full">
                        {/* Name and Role */}
                        <motion.div
                            className="space-y-1"
                        >
                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                                {member.name}
                            </h3>
                            <p className="text-xs text-purple-300 font-medium uppercase tracking-wider">
                                {member.role.split('|')[0]}
                            </p>
                        </motion.div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {hoveredId === index && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col items-center mt-4 space-y-4 w-full"
                                >
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {member.bio}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        {member.focusAreas.map((area, i) => (
                                            <span key={i} className="text-[10px] uppercase font-bold text-[#A855F7] bg-[#A855F7]/10 px-2 py-1 rounded-full border border-[#A855F7]/20">
                                                {area}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col items-center gap-2 pt-2">
                                        <span className="text-[10px] text-purple-300 font-bold uppercase tracking-widest">Connect on LinkedIn</span>
                                        <SocialIcon href={member.socials.linkedin} icon={<FaLinkedinIn size={14} />} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity duration-500" />
        </motion.div>
    );
}

function SocialIcon({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <motion.a
            whileHover={{ scale: 1.1, backgroundColor: "#6B46E5" }}
            whileTap={{ scale: 0.9 }}
            href={href}
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white transition-colors"
        >
            {icon}
        </motion.a>
    )
}
