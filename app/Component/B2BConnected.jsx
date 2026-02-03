"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Calendar, MessageSquare } from 'lucide-react';
import connectedImage from './assets/cyber_dashboard_blurred.png';
import { useEnquiry } from '../context/EnquiryContext';
export default function B2BConnected() {
    const benefits = [
        "Plug-and-play access over a single link",
        "Real-time sync so every move appears instantly",
        "One dashboard joins red, blue, and observers together",
        "Build a SOC-ready team with measurable outcomes"
    ];
    const { openEnquiry } = useEnquiry();
    return (
        <section className="relative py-24 bg-white dark:bg-[#0B0420] text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
            {/* Background Gradient */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a855f7]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left Side: Image */}
                    <div className="w-full lg:w-[55%] relative">
                        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-[#a855f7]/10 pointer-events-none"></div>

                            <Image
                                src={connectedImage}
                                alt="Stay Connected"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 transition-colors duration-300">
                            Stay Connected, Keep <br />
                            Training
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-base mb-6 leading-relaxed transition-colors duration-300">
                            Run training and simulations without fragile VPN setups - stable access, faster onboarding, and a smoother learner experience.
                        </p>

                        <ul className="space-y-3 mb-6">
                            {benefits.map((benefit, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#a855f7] flex items-center justify-center shrink-0 shadow-md shadow-[#a855f7]/30">
                                        <Check className="w-3 h-3 text-white stroke-[3]" />
                                    </div>
                                    <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300 leading-snug">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Primary CTA - Book a Demo */}
                            <Link href="/contact">
                                <button className="group flex items-center justify-center gap-2 px-5 py-3 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#a855f7]/25 hover:shadow-xl hover:shadow-[#a855f7]/40 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                                    <Calendar size={16} className="group-hover:scale-110 transition-transform" />
                                    <span><button onClick={openEnquiry}>Book a Demo</button></span>
                                </button>
                            </Link>

                            {/* Secondary CTA - Get a Quote */}
                            <Link href="/contact">
                                <button className="group flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold text-sm rounded-xl border-2 border-gray-300 dark:border-white/20 hover:border-[#a855f7] dark:hover:border-[#a855f7] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                                    <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                                    <span><button onClick={openEnquiry}>Get a Quote</button></span>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
