"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, BookOpen, BarChart2, Calendar, ArrowRight } from 'lucide-react'

// Import assets
import thumb1 from './assets/cyber_lab_1.webp'
import thumb2 from './assets/cyber_lab_2.webp'
import thumb3 from './assets/cyber_lab_3.webp'

const categories = [
    'Programming', 'CISCO', 'Red Hat', 'CompTIA', 'Microsoft Azure', 'Cybersecurity'
]

const trainingPrograms = [
    {
        category: 'Programming',
        rating: 4.5,
        title: 'One Year Cyber Security Diploma',
        lessons: 20,
        level: 'A1 - A2',
        duration: '2 Weeks',
        image: thumb1
    },
    {
        category: 'Programming',
        rating: 4.5,
        title: 'One Year Cyber Security Diploma',
        lessons: 18,
        level: 'A1 - B1',
        duration: '2 Weeks',
        image: thumb2
    },
    {
        category: 'Programming',
        rating: 4.5,
        title: 'One Year Cyber Security Diploma',
        lessons: 20,
        level: 'A1 - A2',
        duration: '2 Weeks',
        image: thumb3
    }
]

export default function TrainingSection() {
    const [activeCategory, setActiveCategory] = useState('Programming')

    return (
        <section className="relative w-full bg-white dark:bg-black py-24 px-6 overflow-hidden font-sans transition-colors duration-300">
            {/* Background Decorative Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 400C150 350 300 450 450 400C600 350 750 450 900 400C1050 350 1200 450 1350 400C1500 350 1650 450 1800 400" stroke="#6B46E5" strokeWidth="1" />
                    <path d="M0 450C150 400 300 500 450 450C600 400 750 500 900 450C1050 400 1200 500 1350 450" stroke="#6B46E5" strokeWidth="0.5" />
                    <path d="M0 350C150 300 300 400 450 350C600 300 750 400 900 350C1050 300 1200 400 1350 350" stroke="#6B46E5" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                        <span className="text-[13px] font-semibold text-[#1a1a2e] dark:text-white uppercase tracking-[0.2em]">
                            LEARNING HUB
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-[50px] font-semibold text-[#1a1a2e] dark:text-white tracking-tight">
                        Stay Connected, Keep Training
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg  font-medium max-w-3xl mx-auto">
                        Immersive Tech Experiences in Our Workshop at Techfest, IIT Bombay
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <div className="inline-flex bg-[#F8F9FD] dark:bg-gray-900 p-1.5 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm max-w-full overflow-x-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e] shadow-lg'
                                    : 'text-slate-500 dark:text-gray-400 hover:text-[#1a1a2e] dark:hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Training Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {trainingPrograms.map((program, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-[#7B2CFF] shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_25px_60px_rgba(107,70,229,0.08)] transition-all duration-500 flex flex-col"
                        >
                            {/* Card Content Top */}
                            <div className="p-8 pb-4 space-y-6 grow">
                                <div className="flex items-center justify-between">
                                    <span className="bg-[#E9E4FF] text-[#6B46E5] px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider">
                                        {program.category}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm   text-slate-900 dark:text-white">{program.rating}</span>
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </div>

                                <h3 className="text-[22px] font-semibold text-[#1a1a2e] dark:text-white leading-[1.2] group-hover:text-[#6B46E5] transition-colors">
                                    {program.title}
                                </h3>

                                <div className="flex items-center gap-3">
                                    <button className="flex-1 bg-[#310E3F] text-white py-3 rounded-full text-sm font-bold hover:bg-[#6B46E5] transition-colors">
                                        Enroll Now
                                    </button>
                                    <button className="flex-1 border-2 border-[#310E3F] dark:border-purple-400 text-[#310E3F] dark:text-purple-400 py-3 rounded-full text-sm font-bold hover:border-[#6B46E5] dark:hover:border-purple-300 hover:text-[#6B46E5] dark:hover:text-purple-300 transition-all">
                                        Learn More
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800 text-slate-400 dark:text-gray-500">
                                    <div className="flex flex-col items-center gap-1">
                                        <BookOpen size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tighter">{program.lessons} lessons</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-100 dark:bg-gray-800" />
                                    <div className="flex flex-col items-center gap-1">
                                        <BarChart2 size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tighter">{program.level}</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-100 dark:bg-gray-800" />
                                    <div className="flex flex-col items-center gap-1">
                                        <Calendar size={18} />
                                        <span className="text-[11px] font-bold uppercase tracking-tighter">{program.duration}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Image Bottom */}
                            <div className="px-6 pb-6 mt-auto">
                                <div className="relative aspect-16/10 rounded-[1.5rem] overflow-hidden">
                                    <Image
                                        src={program.image}
                                        alt={program.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <button className="group flex items-center gap-3 bg-[#1a1a2e] dark:bg-white text-white dark:text-[#1a1a2e] px-10 py-3 rounded-full font-bold text-lg hover:bg-[#6B46E5] dark:hover:bg-gray-200 transition-all hover:shadow-2xl active:scale-95">
                        View All
                        <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}
