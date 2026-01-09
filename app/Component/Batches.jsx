'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, MoreVertical } from 'lucide-react';
import { BsThreeDotsVertical } from "react-icons/bs";
const batches = [
    { title: "One Year Cyber Security Diploma", date: "03/01/2026", time: "10 am – 12 pm" },
    { title: "RH199VT+EX200K", date: "03/01/2026", time: "10 am – 12 pm" },
    { title: "RH294VT+EX294K", date: "04/01/2026", time: "10 am – 12 pm" },
    { title: "Basic Networking Training", date: "04/01/2026", time: "10 am – 12 pm" },
    { title: "Penetration Testing Training", date: "31/12/2025", time: "3 pm – 5 pm" },
    { title: "Python Programming Training", date: "31/12/2025", time: "10 am – 12 pm" },
    { title: "Ethical Hacking Training", date: "03/01/2026", time: "10 am – 12 pm" },
    { title: "Artificial Intelligence Training", date: "03/01/2026", time: "10 am – 12 pm" },
    { title: "OSCP", date: "03/01/2026", time: "10 am – 12 pm" },
];

export default function Batches() {
    return (
        <section className="relative w-full py-12 md:py-24 bg-[#FBF9FF] dark:bg-black overflow-hidden font-sans transition-colors duration-300">
            {/* Background Glows (Top Left & Top Right) */}
            <div className="absolute top-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-200/40 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-200/40 rounded-full blur-[80px] md:blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-[#7B2CFF] rounded-[4px] shadow-sm"></div>
                        <span className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-widest">UPCOMING TRAINING SESSIONS</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e] dark:text-white">
                        Upcoming Batches
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-2">
                        Join our upcoming cybersecurity training batches and advance your career with industry-leading certifications
                    </p>
                </div>

                {/* Table Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-900 rounded-[1.5rem] shadow-[0_10px_40px_rgba(107,70,229,0.1)] overflow-hidden border border-gray-100 dark:border-gray-800"
                >

                    {/* Table Header - Hidden on Mobile */}
                    <div className="hidden md:grid bg-[#7B3FE4] px-8 py-5 grid-cols-12 gap-4 text-white items-center">
                        <div className="col-span-4 flex items-center gap-3 font-bold text-lg ml-8">
                            <FileText size={20} className="opacity-90" />
                            Programs
                        </div>
                        <div className="col-span-2 flex items-center justify-center gap-3 font-bold text-lg">
                            <Calendar size={20} className="opacity-90" />
                            Start Date
                        </div>
                        <div className="col-span-3 flex items-center justify-center gap-3 font-bold text-lg">
                            <Clock size={20} className="opacity-90" />
                            Timings
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-3 font-bold text-lg pr-8">
                            <MoreVertical size={20} className="opacity-90" />
                            Action
                        </div>
                    </div>

                    {/* Table Body */}
                    <div>
                        {batches.map((batch, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                key={index}
                                className={`p-6 md:px-8 md:py-4 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 items-start md:items-center border-b border-gray-50 dark:border-gray-800 hover:bg-purple-50/40 dark:hover:bg-purple-900/10 transition-colors ${index % 2 !== 0 ? 'bg-[#FAFAFA] dark:bg-black/20' : 'bg-white dark:bg-transparent'}`}
                            >
                                {/* Course Name */}
                                <div className="md:col-span-4 md:ml-8 flex flex-col items-center md:items-start text-center md:text-left">
                                    <h3 className="text-[#1a1a2e] dark:text-white font-semibold text-lg md:text-[16px] mb-1">{batch.title}</h3>
                                    <span className="text-gray-400 dark:text-gray-500 text-sm md:text-[13px] font-medium tracking-wide">Professional Certification</span>
                                </div>

                                {/* Mobile Labels & Values Container for Date/Time */}
                                <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-5 gap-4 w-full md:w-auto mt-2 md:mt-0">
                                    {/* Date */}
                                    <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
                                        <span className="md:hidden text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Start Date</span>
                                        <span className="text-[#1a1a2e] dark:text-gray-200 font-semibold text-base md:text-[16px]">{batch.date}</span>
                                    </div>

                                    {/* Timing */}
                                    <div className="md:col-span-3 flex flex-col items-center justify-center">
                                        <span className="md:hidden text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Time</span>
                                        <div className="text-[#1a1a2e] dark:text-gray-200 font-semibold text-base md:text-[16px] mb-0.5">{batch.time}</div>
                                        <span className="text-gray-400 dark:text-gray-500 text-xs md:text-[12px] font-medium">Flexible Schedule</span>
                                    </div>
                                </div>


                                {/* Action Button */}
                                <div className="md:col-span-3 flex justify-center md:justify-end md:pr-8 w-full md:w-auto mt-4 md:mt-0">
                                    <button className="w-full md:w-auto bg-[#26103A] dark:bg-purple-700 text-white px-6 py-3 md:py-2.5 rounded-full text-sm font-semibold hover:bg-[#7B3FE4] dark:hover:bg-purple-600 transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group">
                                        <span className="rounded-full group-hover:opacity-100"><BsThreeDotsVertical /></span>
                                        Enroll Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>

            </div>
        </section>
    );
}
