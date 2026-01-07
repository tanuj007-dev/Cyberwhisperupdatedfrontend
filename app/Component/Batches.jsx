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
        <section className="relative w-full py-24 bg-[#FBF9FF] overflow-hidden font-sans">
            {/* Background Glows (Top Left & Top Right) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 bg-[#7B2CFF] rounded-[4px] shadow-sm"></div>
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">UPCOMING TRAINING SESSIONS</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e]">
                        Upcoming Batches
                    </h2>

                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Join our upcoming cybersecurity training batches and advance your career with industry-leading certifications
                    </p>
                </div>

                {/* Table Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-t-[1.5rem] rounded-b-[1.5rem] shadow-[0_20px_60px_rgba(107,70,229,0.1)] overflow-hidden border border-gray-100"
                >

                    {/* Table Header */}
                    <div className="bg-[#7B3FE4] px-8 py-5 grid grid-cols-1 md:grid-cols-12 gap-4 text-white items-center">
                        <div className="md:col-span-4 flex items-center gap-3 font-bold text-lg ml-8">
                            <FileText size={20} className="opacity-90" />
                            Programs
                        </div>
                        <div className="md:col-span-2 flex items-center justify-center gap-3 font-bold text-lg">
                            <Calendar size={20} className="opacity-90" />
                            Start Date
                        </div>
                        <div className="md:col-span-3 flex items-center justify-center gap-3 font-bold text-lg">
                            <Clock size={20} className="opacity-90" />
                            Timings
                        </div>
                        <div className="md:col-span-2 flex items-center justify-end gap-3 font-bold text-lg">
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
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                key={index}
                                className={`px-8 py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-50 hover:bg-purple-50/40 transition-colors ${index % 2 !== 0 ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                            >
                                {/* Course Name */}
                                <div className="md:col-span-4 ml-8">
                                    <h3 className="text-[#1a1a2e] font-semibold text-[16px] mb-1">{batch.title}</h3>
                                    <span className="text-gray-400 text-[13px] font-medium tracking-wide">Professional Certification</span>
                                </div>

                                {/* Date */}
                                <div className="md:col-span-2 flex justify-center">
                                    <span className="text-[#1a1a2e] font-semibold text-[16px]">{batch.date}</span>
                                </div>

                                {/* Timing */}
                                <div className="md:col-span-3 flex flex-col items-center">
                                    <div className="text-[#1a1a2e] font-semibold text-[16px] mb-0.5">{batch.time}</div>
                                    <span className="text-gray-400 text-[12px] font-medium">Flexible Schedule</span>
                                </div>

                                {/* Action Button */}
                                <div className="md:col-span-2 flex  ml-8    justify-end">
                                    <button className="bg-[#26103A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#7B3FE4] transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center gap-2 group">
                                        <span className="   rounded-full   group-hover:opacity-100"><BsThreeDotsVertical /></span>
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
