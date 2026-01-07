"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import pathBg from "./assets/path.png"
export default function FreeTrial() {
    return (
        <section className="w-full py-16 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden bg-[#7B2CFF] rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12"
                >
                    {/* Background Wave Pattern */}
                    <div className="absolute inset-0 z-0  pointer-events-none">
                        <Image
                            src={pathBg}
                            alt="Background Pattern"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10 max-w-2xl text-center lg:text-left space-y-6">
                        <h2 className="text-3xl md:text-[44px] leading-tight font-semibold text-white tracking-tight">
                            Get 19 hours of <br className="hidden md:block" />
                            Full-Access Labs On Us
                        </h2>
                        <p className="text-white/80 text-base md:text-xl   leading-relaxed max-w-xl">
                            Test-drive our cyber range and SOC portal with your own data. No credit card, no strings—just proof that better security can start today
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 shrink-0">
                        <button className="group relative flex items-center bg-[#E4BB03] hover:bg-[#EAB308] text-[#1a1a2e] px-8 py-3 rounded-full text-lg transition-all  active:scale-95 whitespace-nowrap">
                            Start My Free Trial
                            <div className="ml-4 w-9 h-9 bg-[#310E3F] rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
