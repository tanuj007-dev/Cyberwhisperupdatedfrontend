"use client";
import React from 'react';
import { Quote, ArrowRight, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function B2BCaseStudy() {
    return (
        <section className="relative py-20 bg-white dark:bg-[#0B0420] text-gray-900 dark:text-white overflow-hidden transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
            <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                    <p className="text-gray-600 dark:text-gray-400">See how leading teams are transforming their defense.</p>
                </div>

                <div className="bg-gray-50 dark:bg-[#150833] rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#6B46E5]/30 transition-all duration-300">

                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#6B46E5]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">

                        {/* Left Column: The Challenge & Solution */}
                        <div className="flex-1 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3 text-red-500 dark:text-red-400 font-semibold uppercase tracking-wider text-xs">
                                    <AlertTriangle size={16} />
                                    <span>The Problem</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    High Alert Noise & Slow Investigations
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Security team was overwhelmed by false positives, leading to missed threats and burnout.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0B0420] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
                                    <div className="mt-1 w-8 h-8 rounded-lg bg-[#6B46E5]/10 flex items-center justify-center shrink-0 text-[#6B46E5]">
                                        <ArrowRight size={18} />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-1">Our Approach</span>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Detection tuning, custom investigation playbooks, and hands-on cyber range exercises.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#0B0420] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
                                    <div className="mt-1 w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 text-green-500">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-1">The Result</span>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Faster triage, cleaner escalations, and significantly improved team confidence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: The Proof */}
                        <div className="w-full md:w-5/12 ml-auto">
                            <div className="bg-[#6B46E5] text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Quote size={64} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6 opacity-90">
                                        <TrendingUp size={20} />
                                        <span className="font-bold text-sm uppercase tracking-wider">Metrics that matter</span>
                                    </div>

                                    <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-6">
                                        "Reduced mean time to detect (MTTD) by 40% within the first quarter."
                                    </blockquote>

                                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                                        <div>
                                            <p className="font-bold text-white">SOC Leadership</p>
                                            <p className="text-purple-100 text-sm">Mid-Size FinTech Enterprise</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
