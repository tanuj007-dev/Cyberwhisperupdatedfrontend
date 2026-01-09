'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import workImg from './assets/companies.webp'; // Placeholder for the companies grid image

export default function PlacementCell() {
    return (
        <section className="w-full py-10 md:py-16 bg-white dark:bg-black overflow-hidden font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 text-slate-900 dark:text-white">

                {/* Left Side: Contact Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full lg:w-2/5 flex justify-center lg:justify-start"
                >
                    <div className="w-full max-w-sm sm:max-w-md bg-[#D6BDFF26] dark:bg-purple-900/20 rounded-4xl border border-[#7B2CFF]/30 p-6 sm:p-8 shadow-xl shadow-purple-100/50 dark:shadow-none hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-6">Placement Cell</h3>

                        {/* Profile Section */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#7B2CFF] flex items-center justify-center text-white text-lg sm:text-xl font-bold uppercase shrink-0">
                                M
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">Mansi Srivastava</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">Placement Coordinator</p>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-3 sm:space-y-4">
                            {/* Phone */}
                            <a href="tel:+919513805401" className="block group">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 border border-[#7B2CFF]/20 dark:border-gray-700 group-hover:border-[#7B2CFF] shadow-sm transition-all">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-50 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900 transition-colors">
                                        <Phone size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Contact us</p>
                                        <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-white group-hover:text-[#7B2CFF] dark:group-hover:text-purple-300 transition-colors">+91 9513805401</p>
                                    </div>
                                </div>
                            </a>

                            {/* Email */}
                            <a href="mailto:placement@craw.in" className="block group">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 border border-[#7B2CFF]/20 dark:border-gray-700 group-hover:border-[#7B2CFF] shadow-sm transition-all">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-50 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900 transition-colors">
                                        <Mail size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Email Id</p>
                                        <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-white wrap-break-word group-hover:text-[#7B2CFF] dark:group-hover:text-purple-300 transition-colors">placement@craw.in</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-2/3 flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-lg lg:max-w-4xl">
                        {/* Image Container */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-purple-100 dark:border-purple-900/30">
                            <Image
                                src={workImg}
                                alt="Placement Companies"
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Blobs - Adjusted for mobile */}
                        <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-blue-200/50 rounded-full blur-2xl -z-10"></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
