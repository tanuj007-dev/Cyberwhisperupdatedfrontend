"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import pathBg from "./assets/path.webp"
export default function FreeTrial() {
    return (
        <section className="w-full py-8 md:py-16 px-4 md:px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden bg-[#7B2CFF] rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left"
                >
                    {/* Background Wave Pattern */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Image
                            src={pathBg}
                            alt="Background Pattern"
                            fill
                            className="object-cover opacity-80 mix-blend-soft-light"
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10 w-full max-w-2xl space-y-4 md:space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight font-semibold text-white tracking-tight">
                            Get a Free Security Readiness Consultation
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Share your objective—SOC build, monitoring, cyber range, TI, VAPT, or compliance—and we’ll recommend the right engagement model.
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 shrink-0 w-full sm:w-auto">
                        <button className="group relative w-full sm:w-auto flex items-center justify-center bg-[#E4BB03] hover:bg-[#EAB308] text-[#1a1a2e] px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-black/10">
                            Get a Quote
                            <div className="ml-3 sm:ml-4 w-8 h-8 sm:w-9 sm:h-9 bg-[#310E3F] rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
