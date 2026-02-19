"use client";
import React from 'react';
import { Building2, GraduationCap, Shield } from 'lucide-react';

export default function B2BTargetAudience() {
    const audiences = [
        {
            icon: Building2,
            title: "Enterprises & SOC Teams",
            description: "SOC enablement, detection engineering, response readiness"
        },
        {
            icon: GraduationCap,
            title: "Colleges & Universities",
            description: "Cyber range training, CTFs, placement-oriented tracks"
        },
        {
            icon: Shield,
            title: "Government & Defense",
            description: "Controlled training programs, secure lab design, role-based exercises"
        }
    ];

    return (
        <section className="relative py-16 bg-white dark:bg-[#0B0420] overflow-hidden transition-colors duration-300 border-t border-gray-200 dark:border-white/5">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-semibold mb-3 transition-colors duration-300">
                        <span className="text-gray-900 dark:text-white">Who We </span>
                        <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent">Serve</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto transition-colors duration-300">
                        Tailored cybersecurity solutions for diverse organizations
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {audiences.map((audience, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#a855f7]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#a855f7]/10 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="mb-5 w-16 h-16 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] transition-all duration-300 group-hover:scale-110">
                                <audience.icon size={32} strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#a855f7] transition-colors duration-300">
                                {audience.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                                {audience.description}
                            </p>

                            {/* Hover border effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
