"use client";
import React from 'react';
import { Shield, Server, MonitorSmartphone, Check, Lock, Cloud, ClipboardList, Target, BarChart, LayoutDashboard, Award } from 'lucide-react';
import Link from 'next/link';
import { useEnquiry } from '../context/EnquiryContext';
export default function B2BFeatures() {
    const { openEnquiry } = useEnquiry();
    const features = [
        {
            icon: Shield,
            title: "Cyber Security Solutions",
            description: "End-to-end defense driven by real-time intelligence."
        },
        {
            icon: Server,
            title: "Cyber Range",
            description: "Realistic simulations that build battle-ready reflexes."
        },
        {
            icon: MonitorSmartphone,
            title: "Cyber Security Consultation",
            description: "Expert guidance to close gaps and stay ahead."
        },
        {
            icon: Lock,
            title: "Data Loss Prevention",
            description: "Stop data leaks with advanced encryption and monitoring."
        },
        {
            icon: Cloud,
            title: "Cloud Security",
            description: "Scalable security frameworks for your cloud infrastructure."
        }
    ];

    const outcomes = [
        "Faster triage with cleaner alert context and enrichment",
        "Reduced noise through detection tuning and standard workflows",
        "Repeatable investigation playbooks for consistent results",
        "Hands-on readiness through realistic simulations"
    ];

    const deliverables = [
        { icon: Server, title: "Cyber Range Access", desc: "User provisioning (time-bound)" },
        { icon: Target, title: "Training Plan", desc: "Schedule + learning outcomes" },
        { icon: ClipboardList, title: "SOC Playbooks", desc: "SOP templates + checklists" },
        { icon: BarChart, title: "Assessments", desc: "scoring (pre/post) + completion report" },
        { icon: LayoutDashboard, title: "Detection Rules", desc: "Dashboards & queries included" },
        { icon: Award, title: "Certificates", desc: "Completion & participation proofs" }
    ];

    return (
        <section className="relative py-12 md:py-24 bg-gray-50 dark:bg-[#150833] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">

                {/* PARTNERSHIP BLOCK */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-16 lg:mb-32">

                    {/* Left Column - Features List */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex gap-4 md:gap-6 group"
                            >
                                {/* Icon Box */}
                                <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-[#0B0420] border border-gray-200 dark:border-white/5 flex items-center justify-center shadow-lg group-hover:border-[#6B46E5]/50 group-hover:shadow-[0_0_20px_rgba(107,70,229,0.2)] transition-all duration-300">
                                    <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-[#6B46E5] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                                </div>
                                {/* Text */}
                                <div>
                                    <h3 className="text-base md:text-lg font-bold mb-0.5 md:mb-1 text-gray-900 dark:text-white group-hover:text-[#a855f7] transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs md:text-sm transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Content */}
                    <div className="w-full lg:w-1/2">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6B46E5]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4 md:mb-8 transition-colors duration-300">
                            <span className="text-gray-900 dark:text-white">We don't just deploy and leave — </span>
                            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent">we partner with you for the long haul.</span>
                        </h1>

                        <div className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed font-light transition-colors duration-300 mb-6 md:mb-10">
                            <p>
                                Our integrated approach combines <strong className="text-gray-900 dark:text-white font-semibold">advanced AI</strong>, <strong className="text-gray-900 dark:text-white font-semibold">real-world simulations</strong>, and <strong className="text-gray-900 dark:text-white font-semibold">expert guidance</strong>. We ensure your team isn't just reacting to threats, but anticipating them.
                            </p>
                        </div>

                        {/* Outcome Bullets */}
                        <ul className="space-y-2 md:space-y-4 mb-6 md:mb-10">
                            {outcomes.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-[#6B46E5] flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-white stroke-3" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Buttons */}
                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
                            <Link href="/about">
                                <button
                                    className="px-6 py-2.5 md:px-8 md:py-3.5 bg-[#6B46E5] text-white font-bold rounded-lg shadow-lg hover:bg-[#5538B5] hover:scale-105 active:scale-95 transition-all uppercase text-xs md:text-sm tracking-wide w-full sm:w-auto"
                                >
                                    Learn More
                                </button>
                            </Link>
                            <button
                                onClick={() => openEnquiry(true)}
                                className="px-6 py-2.5 md:px-8 md:py-3.5 bg-transparent border border-[#6B46E5] text-[#6B46E5] dark:text-white font-bold rounded-lg hover:bg-[#6B46E5]/10 hover:scale-105 active:scale-95 transition-all uppercase text-xs md:text-sm tracking-wide w-full sm:w-auto"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>

                </div>

                {/* DELIVERABLES GRID ("What You Get") */}
                <div className="border-t border-gray-200 dark:border-white/10 pt-10 md:pt-20">
                    <div className="text-center mb-8 md:mb-16">
                        <h1 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-4">
                            <span className="text-gray-900 dark:text-white">What </span>
                            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent">You Get</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">Everything included in your comprehensive partnership package.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {deliverables.map((item, i) => (
                            <div key={i} className="p-4 md:p-6 rounded-2xl bg-white dark:bg-[#0B0420] border border-gray-200 dark:border-white/5 hover:border-[#6B46E5]/50 transition-all duration-300 shadow-sm hover:shadow-lg group">
                                <div className="w-12 h-12 rounded-lg bg-[#6B46E5]/10 flex items-center justify-center text-[#6B46E5] mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
