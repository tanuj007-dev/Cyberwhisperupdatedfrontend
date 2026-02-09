"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Laptop, Calendar, Users, Briefcase, GraduationCap } from "lucide-react";
import { useEnquiry } from '../context/EnquiryContext';

const features = [
    {
        title: "Weekly mentor guidance + doubt support",
        description: "Get unstuck instantly with direct access to industry experts.",
        icon: Users,
    },
    {
        title: "Hands-on labs after every concept",
        description: "Apply what you learn immediately in realistic environments.",
        icon: CheckCircle2,
    },
    {
        title: "Assignments based on real SOC workflows",
        description: "Simulate actual security operations center tasks and scenarios.",
        icon: Briefcase,
    },
    {
        title: "Monthly checkpoints to track progress",
        description: "Regular assessments to ensure you're meeting your learning goals.",
        icon: Calendar,
    },
];

export default function LearningJourney() {
    const { openEnquiry } = useEnquiry();

    return (
        <section className="relative py-12 md:py-16 bg-gray-50 dark:bg-black overflow-hidden selection:bg-purple-500/30 font-sans transition-colors duration-300">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

                    {/* Left Column: Header & Context */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-5 h-5 bg-[#6b44e5]  shadow-[0_0_15px_rgba(107,70,229,0.5)]"></div>
                            <span className="text-[#0f172a] dark:text-white text-sm font-bold tracking-[0.2em] uppercase">Learning Journey</span>
                        </div>

                        {/* Main Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e1b4b] dark:text-white leading-tight tracking-tight">
                            Stay Connected, <br className="hidden lg:block" />
                            <span className="text-[#7c3aed] dark:text-[#c084fc]">
                                Keep Training
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-0 lg:border-l-2 border-purple-500/30 lg:pl-5 mx-auto lg:mx-0 max-w-xl">
                            A structured learning journey with labs, mentor support, and checkpoints—so you don't get stuck halfway.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
                            <button
                                onClick={openEnquiry}
                                className="px-8 py-3 bg-[#a855f7] text-white font-bold rounded-full flex items-center gap-2 hover:bg-[#9333ea] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-sm tracking-wider uppercase"
                            >
                                <Laptop className="w-5 h-5" />
                                Talk to our expert
                            </button>

                        </div>

                        {/* Audience Info Mobile */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-gray-500 dark:text-gray-500 pt-1">
                            <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                            <span>Ideal for students, pros & teams.</span>
                        </div>

                    </motion.div>

                    {/* Right Column: Compact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:mt-0 w-full lg:max-w-lg ml-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="relative group  h-full"
                            >
                                <div className="h-full relative border border-gray-200 dark:border-white/10 overflow-hidden rounded-2xl transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500/50">
                                    {/* Inner Content Card */}
                                    <div className="h-full flex flex-col gap-3 p-5 bg-white dark:bg-white/5 backdrop-blur-md transition-all duration-300 relative z-10">

                                        {/* Icon Box */}
                                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-indigo-600 p-px shadow-sm dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                                            <div className="w-full h-full rounded-lg bg-purple-600 flex items-center justify-center transition-colors duration-300">
                                                <feature.icon className="w-5 h-5  text-white  dark:group-hover:text-white transition-colors" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors leading-snug">
                                            {feature.title}
                                        </h3>
                                    </div>
                                </div>
                                {/* Glow (Dark mode only) */}
                                <div className="hidden dark:block absolute inset-0 bg-linear-to-br from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}