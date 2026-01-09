'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaDownload, FaWhatsapp, FaCalendarAlt, FaLanguage, FaGlobe } from 'react-icons/fa';
// Assuming the image will be placed in assets
// For now using the generated path directly or a placeholder if path is tricky
import { IoLogoWhatsapp } from "react-icons/io";
import heroImg from './assets/lock.webp';
import crackImg from './assets/crack.webp';
import { FiDownload } from "react-icons/fi";
export default function TrainingHero() {
    return (
        <section className="relative w-full pt-20 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-white font-sans">
            {/* Background Grid and Glows */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#6b46e5 0.5px, transparent 0.5px)`,
                    backgroundSize: '30px 30px'
                }}>
            </div>
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-200/40 rounded-full blur-[60px] md:blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-100/30 rounded-full blur-[50px] md:blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col space-y-6 md:space-y-8"
                >
                    {/* Admission Badge */}
                    <div className="relative w-fit flex rounded-full p-[2px] mt-4 md:mt-0 overflow-hidden group mx-auto md:mx-0">
                        {/* Moving Border Animation */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #6932E2, #EBDFFF, #6932E2)",
                                backgroundSize: "200% 100%",
                                animation: "borderMove 3s linear infinite",
                            }}
                        />

                        {/* Inner Badge Content */}
                        <div className="relative flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 px-1 py-1 pr-4 sm:pr-6 rounded-full bg-[#F4F0FF] backdrop-blur-md">
                            <span className="px-3 py-1 bg-white text-[#6B46E5] font-bold text-xs sm:text-sm rounded-full shadow-sm shrink-0">
                                New
                            </span>
                            <span className="text-[#6B46E5] font-semibold text-xs sm:text-[15px] whitespace-normal sm:whitespace-nowrap">
                                Admissions Now Open For 2026
                            </span>
                        </div>

                        {/* Animation Keyframes */}
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
                    </div>

                    {/* Title */}
                    <div className="relative">
                        <h1 className="text-3xl sm:text-4xl md:text-[48px] font-semibold text-[#1a1a2e] leading-tight md:leading-[1.1] tracking-tight text-center md:text-left">
                            1 Year Cyber Security Diploma <br className="hidden md:block" />
                            Training <span className="text-[#6B46E5] relative inline-block">
                                Expert AI Skills
                                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[10px] md:h-[15px]" viewBox="0 0 280 15" fill="none" preserveAspectRatio="none">
                                    <path d="M2.5 12.5C45.5 12.5 137.5 3 277.5 3" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </h1>
                    </div>

                    {/* Partner Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 py-2">
                        <span className="text-gray-900 text-base md:text-lg">Get Premium Subscription of</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-50 rounded-xl border border-gray-100">
                            <Image src={crackImg} alt="Crack The Lab" className="h-6 md:h-8 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Info Row */}
                    <div className="grid grid-cols-3 gap-2 md:gap-6 py-4 border-y border-gray-100 items-start md:items-center">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 group text-center md:text-left">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6B46E5] group-hover:bg-[#6B46E5] group-hover:text-white transition-colors duration-300 shrink-0">
                                <FaCalendarAlt className="text-sm md:text-base" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider">Duration</span>
                                <span className="text-[#1a1a2e] font-semibold text-xs md:text-base">12 Months</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 group text-center md:text-left">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6B46E5] group-hover:bg-[#6B46E5] group-hover:text-white transition-colors duration-300 shrink-0">
                                <FaLanguage className="text-sm md:text-base" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider">Language</span>
                                <span className="text-[#1a1a2e] font-semibold text-xs md:text-base">Hindi | English</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 group text-center md:text-left">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6B46E5] group-hover:bg-[#6B46E5] group-hover:text-white transition-colors duration-300 shrink-0">
                                <FaGlobe className="text-sm md:text-base" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider">Mode</span>
                                <span className="text-[#1a1a2e] font-semibold text-xs md:text-base">Online | Offline</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6">
                        {/* Download Button */}
                        <button className="flex items-center justify-center gap-2 bg-[#2B0A3D] text-white pl-2 pr-6 py-2 rounded-full font-semibold transition-all hover:bg-[#3A0F52] active:scale-95 w-full sm:w-auto text-sm md:text-base">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-[#2B0A3D]">
                                <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
                            </span>
                            Download Content
                        </button>

                        {/* WhatsApp Button */}
                        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#2B0A3D] text-[#2B0A3D] font-semibold transition-all hover:border-[#5A2D82] hover:text-[#5A2D82] active:scale-95 w-full sm:w-auto text-sm md:text-base">
                            <IoLogoWhatsapp className="text-[#25D366] w-5 h-5 md:w-6 md:h-6" />
                            Chat on WhatsApp
                        </button>
                    </div>

                </motion.div>

                {/* Right Image Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative flex justify-center items-center mt-6 lg:mt-0"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute -z-10 w-[120%] h-[120%] bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-500/10 blur-[60px] md:blur-[80px] rounded-full -z-10 animate-pulse"></div>

                    {/* Dynamic Particles/Dots */}
                    <div className="absolute top-0 right-0 w-24 h-24 hidden md:flex flex-wrap gap-4 opacity-30">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>

                    {/* Main Image Container */}
                    <div className="relative p-2 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(107,70,229,0.15)] md:shadow-[0_30px_80px_rgba(107,70,229,0.15)] border-2 border-purple-500 group max-w-[320px] md:max-w-full">
                        <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[1.8rem]">
                            <Image
                                src={heroImg}
                                alt="Cyber Security Excellence"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-tr from-purple-900/10 to-transparent"></div>
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 scale-90 md:scale-100 transition-transform group-hover:scale-110">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M20 6L9 17L4 12" />
                                </svg>
                            </div>
                            <div className="flex flex-col pr-2 md:pr-4">
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Enrollment</span>
                                <span className="text-[#1a1a2e] font-bold text-sm md:text-base">100% Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
