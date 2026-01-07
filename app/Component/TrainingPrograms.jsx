"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import path from "./assets/path.png";
export default function TrainingPrograms() {
    return (
        <section className="relative w-full bg-white py-12 px-4 md:px-8 lg:px-12 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full bg-[#6b46e5] rounded-[2rem] md:rounded-[3rem] px-6 py-10 md:px-16 lg:px-20 md:py-16 overflow-hidden shadow-2xl"
                >

                    {/* Background Pattern Layers - Convergent Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        <Image
                            src={path}
                            alt="Background Pattern"
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                    </div>


                    <div className="relative z-10 flex flex-col items-center text-center text-white">
                        {/* Header Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-3 mb-6"
                        >
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-white shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                            <span className="text-xs md:text-[15px] font-semibold tracking-[0.2em] uppercase">
                                Training Programs
                            </span>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl lg:text-[50px] font-semibold mb-8 md:mb-10 tracking-tight leading-tight max-w-4xl"
                        >
                            Building Cybersecurity Skills Through Real-World Training
                        </motion.h2>

                        {/* Image Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mb-10 md:mb-12">
                            {/* Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative bg-white/5 backdrop-blur-sm border-2 md:border-4 border-white rounded-[1.5rem] md:rounded-4xl overflow-hidden shadow-xl md:shadow-2xl transition-transform duration-500 hover:scale-[1.03] aspect-4/3"
                            >
                                <Image
                                    src={img1}
                                    alt="Training Event 1"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative bg-white/5 backdrop-blur-sm border-2 md:border-4 border-white rounded-[1.5rem] md:rounded-4xl overflow-hidden shadow-xl md:shadow-2xl transition-transform duration-500 hover:scale-[1.03] aspect-4/3"
                            >
                                <Image
                                    src={img2}
                                    alt="Training Event 2"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Bottom Features List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-x-8 md:gap-x-12 text-white/90 font-bold text-sm md:text-base"
                        >
                            <div className="flex items-center gap-2 bg-white/10 sm:bg-transparent px-4 py-2 sm:p-0 rounded-full sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none">
                                <div className="hidden sm:block w-2 h-2 bg-white rounded-full"></div>
                                <span>Hands-On Learning</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 sm:bg-transparent px-4 py-2 sm:p-0 rounded-full sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none">
                                <div className="hidden sm:block w-2 h-2 bg-white rounded-full"></div>
                                <span>Industry-Aligned Programs</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 sm:bg-transparent px-4 py-2 sm:p-0 rounded-full sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none">
                                <div className="hidden sm:block w-2 h-2 bg-white rounded-full"></div>
                                <span>Guided by Practitioners</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
