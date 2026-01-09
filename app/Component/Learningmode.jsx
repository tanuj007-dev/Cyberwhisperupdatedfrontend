'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Using suitable existing assets as placeholders for the learning modes
import imgClassroom from './assets/work5.webp'; // Looks like a lab/classroom
import imgOnline from './assets/work2.webp';    // Looks like working on laptop
import imgCorporate from './assets/work1.webp'; // Looks like a group/workshop

const modes = [
    {
        title: 'Classroom Training',
        description: 'Customized VILT sessions at your convenient hours for smooth learning.',
        btnText: 'Classroom Training',
        image: imgClassroom
    },
    {
        title: 'Online Training Class',
        description: 'Access prerecorded video sessions anytime from anywhere.',
        btnText: 'Online Training',
        image: imgOnline
    },
    {
        title: 'Corporate Training',
        description: 'Hire a trainer for your office and train employees at your preferred schedule.',
        btnText: 'Request Demo',
        image: imgCorporate
    },
];

export default function LearningMode() {
    return (
        <section className="relative w-full py-12 md:py-24 bg-[#FBF9FF] dark:bg-black overflow-hidden font-sans transition-colors duration-300">

            {/* Background Glow (Top Left) */}
            <div className="absolute top-0 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-100/50 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-[#8B5CF6] rounded-[3px]"></div>
                        <span className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">LEARNING MODE</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1a1a2e] dark:text-white leading-tight">
                        Choose Your Preferred Learning Mode
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-2">
                        Real-world labs, round-the-clock defense, and expert guidance everything you need to outsmart tomorrow's threats.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {modes.map((mode, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.6 }}
                            className="bg-white dark:bg-gray-900 rounded-4xl border border-purple-200 dark:border-purple-900/40 p-6 md:p-8 flex flex-col hover:shadow-[0_20px_50px_rgba(107,70,229,0.1)] transition-all duration-300 group"
                        >
                            {/* Content */}
                            <div className="mb-6 md:mb-8 flex flex-col h-full">
                                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2 md:mb-3 text-center md:text-left">{mode.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 h-auto md:h-12 text-center md:text-left">
                                    {mode.description}
                                </p>
                                <div className="flex justify-center md:justify-start">
                                    <button className="bg-[#26103A] dark:bg-white text-white dark:text-[#26103A] px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm font-semibold hover:bg-[#7B3FE4] dark:hover:bg-gray-200 transition-colors shadow-md active:scale-95">
                                        {mode.btnText}
                                    </button>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="mt-auto relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                <Image
                                    src={mode.image}
                                    alt={mode.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
