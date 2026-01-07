'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import workImg from './assets/companies.png'; // Placeholder for the companies grid image

export default function PlacementCell() {
    return (
        <section className="w-full py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between   text-slate-900">

                {/* Left Side: Contact Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full lg:w-2/5 flex justify-center lg:justify-start"
                >
                    <div className="w-full max-w-md bg-[#D6BDFF26] rounded-3xl border-2 border-[#7B2CFF] p-8 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-slate-800 mb-8">Placement Cell</h3>

                        {/* Profile Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-[#7B2CFF] flex items-center justify-center text-white text-xl">
                                M
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-slate-900">Mansi Srivastava</h4>
                                <p className="text-gray-500 text-[12px]">Placement Coordinator</p>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4">
                            {/* Phone */}
                            <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-[#7B2CFF] shadow-sm   transition-colors">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Contact us</p>
                                    <p className="text-lg font-semibold  text-slate-800">+91 9513805401</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-[#7B2CFF] shadow-sm hover:border-[#7B2CFF] transition-colors">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email Id</p>
                                    <p className="text-lg font-semi bold text-slate-800">placement@craw.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-3/4 flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-xl">
                        {/* Using a placeholder image for the companies/logos grid as requested "right side only 1 img" */}
                        {/* User should replace 'workImg' with their actual companies collage image */}
                        <div className="relative rounded-2xl overflow-hidden bg-white ">
                            <Image
                                src={workImg}
                                alt="Placement Companies"
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl -z-10"></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
