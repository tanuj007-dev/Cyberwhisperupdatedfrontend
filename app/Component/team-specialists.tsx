"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGlobe } from 'react-icons/fa'

const teamMembers = [
    {
        name: "Sarah",
        role: "Hacking Specialist",
        image: "/team_sarah_1767456208869.webp",
        socials: {
            globe: "#",
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "Alex",
        role: "Attack Specialist",
        image: "/team_marcus_1767456277100.webp",
        socials: {
            globe: "#",
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "John",
        role: "Operation Manager",
        image: "/team_elena_1767456350560.webp",
        socials: {
            globe: "#",
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "David",
        role: "Defence Specialist",
        image: "/team_sarah_1767456208869.webp",
        socials: {
            globe: "#",
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },

]

export default function TeamSpecialists() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <section className="py-24 bg-white dark:bg-[#0E0429] relative overflow-hidden transition-colors duration-300">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-50/50 dark:bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Section Heading */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-[50px] font-semibold text-[#1C0F2D] dark:text-white leading-[1.1] max-w-7xl mx-auto tracking-tight"
                    >
                        The minds, innovators, and problem-solvers driving our mission <span className="text-[#A855F7]">to create safer</span>
                    </motion.h2>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            onMouseEnter={() => setHoveredId(index)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500"
                        >
                            {/* Profile Image */}
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            />

                            {/* Animated Detail Box */}
                            <div className="absolute inset-x-5 bottom-5 z-20">
                                <motion.div
                                    className="bg-[#1C1F2E]/90 backdrop-blur-xl rounded-3xl overflow-hidden relative border border-white/10"
                                    animate={{
                                        height: hoveredId === index ? 160 : 90,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                >
                                    <div className="h-full flex flex-col items-center justify-start p-6 text-center">
                                        {/* Name and Role */}
                                        <motion.div
                                            animate={{
                                                y: hoveredId === index ? -5 : 0
                                            }}
                                            className="space-y-1"
                                        >
                                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-purple-300 font-medium">
                                                {member.role}
                                            </p>
                                        </motion.div>

                                        {/* Social Icons */}
                                        <AnimatePresence>
                                            {hoveredId === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="flex gap-3 mt-6"
                                                >
                                                    <SocialIcon href={member.socials.globe} icon={<FaGlobe size={16} />} />
                                                    <SocialIcon href={member.socials.facebook} icon={<FaFacebookF size={16} />} />
                                                    <SocialIcon href={member.socials.instagram} icon={<FaInstagram size={16} />} />
                                                    <SocialIcon href={member.socials.linkedin} icon={<FaLinkedinIn size={16} />} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Gradient Scrim */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                        </motion.div>
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
                        <a href="/contact" className="ml-2 text-[#6B46E5] underline decoration-2 underline-offset-4 hover:text-[#6B46E5] transition-colors font-extrabold">
                            Contact Us Today!
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    )
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
