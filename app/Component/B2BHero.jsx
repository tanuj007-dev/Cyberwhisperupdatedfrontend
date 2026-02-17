"use client";
import React from 'react';
import Particles from './Particles';
import { useEnquiry } from '../context/EnquiryContext';

const BackgroundAnimations = () => {

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Static Gradient Orb 1 - Top Right */}
            <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px]  bg-[#6B46E5]/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />

            {/* Static Gradient Orb 2 - Bottom Left */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px]   bg-[#8B5CF6]/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-100" />



        </div>
    );
};

export default function B2BHero() {
    const { openEnquiry } = useEnquiry();

    const features = [
        {
            title: "SOC Enablement + Use-Case Engineering",
            description: "Log onboarding, correlation rules, alert tuning, dashboards — aligned to your SOC operating model.",
            color: "bg-purple-500"
        },
        {
            title: "Cyber Range + Purple Team Simulations",
            description: "Realistic attack scenarios mapped to MITRE ATT&CK, repeatable drills, measurable outcomes.",
            color: "bg-purple-500"
        },
        {
            title: "Threat Intelligence + Response Playbooks",
            description: "Actionable advisories, triage workflows, investigation notes, escalation-ready reporting.",
            color: "bg-purple-500"
        },
        {
            title: "AI-Assisted SOC Workflows (Human-Approved)",
            description: "Alert summarization, enrichment suggestions, auto case notes, detection gap insights.",
            color: "bg-purple-500"
        }
    ];

    const tags = [
        "Safe Isolated Sandbox",
        "One-Click Reset Labs",
        "KPI & Readiness Reporting",
        "Works with SIEM/EDR/SOAR"
    ];
    return (
        <section className="relative py-8 md:py-24 bg-gray-50 dark:bg-[#150833] text-gray-900 dark:text-[#FFFDFF] flex items-center justify-center p-4 md:p-6 overflow-hidden font-sans transition-colors duration-300">
            <BackgroundAnimations />

            {/* OGL Particles Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Particles
                    particleColors={['#ffffff', '#a855f7', '#6366f1']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    className="opacity-60 dark:opacity-80"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 mt-8 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

                {/* Left Content */}
                <div className="flex flex-col gap-4 text-center lg:text-left">
                    <div className="space-y-1">
                        <span className="inline-block py-1 mt-8 md:mt-0 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold tracking-wider mb-2">
                            ENTERPRISE CYBER RANGE
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-[50px] font-bold leading-tight tracking-tighter">
                            <span className="text-gray-900 dark:text-white">Prove Your SOC Can Respond — </span>
                            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 dark:from-purple-400 dark:via-purple-500 dark:to-purple-700 bg-clip-text text-transparent">Before the Next Incident</span>
                        </h1>
                        <p className="text-[16px] text-gray-700 dark:text-gray-400 leading-snug max-w-3xl mx-auto lg:mx-0 font-light">
                            Cyber Whisper builds enterprise-grade cyber range programs that validate your detections, sharpen workflows, and improve response quality. Run realistic simulations and measure readiness.
                        </p>
                    </div>

                    <div className="space-y-3 w-full max-w-3xl mx-auto lg:mx-0">
                        {features.map((feature, index) => (
                            <div key={index} className="group p-3 rounded-lg bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300 text-left shadow-lg">
                                <div className="flex items-start gap-2.5">
                                    <div className={`mt-1 w-1.5 h-1.5 rounded-full ${feature.color} shadow-[0_0_4px_currentColor] shrink-0`} />
                                    <div>
                                        <h3 className="text-[14px] font-bold text-gray-900 dark:text-white mb-0.5">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[12px] text-gray-700 dark:text-gray-400 bg-transparent leading-snug">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Unified CTA & Visual Card */}
                {/* Right Column: Unified CTA & Visual Card */}
                <div className="lg:col-span-1 relative h-auto flex items-start justify-center">
                    <div className="w-full max-w-[400px] bg-gray-100/90 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col shadow-2xl h-auto">

                        {/* Content */}
                        <div className="relative z-10 w-full mb-4">
                            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3 border-l-2 border-gray-400 dark:border-gray-600 pl-2">
                                Next Step
                            </p>

                            <div className="flex gap-3 mb-4 w-full">
                                <button
                                    onClick={() => openEnquiry(true)}
                                    className="flex-1 py-2.5 px-2 bg-purple-500 text-white font-extrabold rounded-xl shadow-lg transition-all text-[11px] uppercase tracking-wide whitespace-nowrap"
                                >
                                    Book a Demo
                                </button>
                                <button
                                    onClick={() => openEnquiry(true)}
                                    className="flex-1 py-2.5 px-2 bg-transparent border-2 border-purple-500 hover:border-purple-600 text-purple-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-white font-extrabold rounded-xl transition-all text-[11px] uppercase tracking-wide whitespace-nowrap"
                                >
                                    Get a Quote
                                </button>
                            </div>

                            <p className="text-[16px] text-gray-700 dark:text-gray-400 mb-4 leading-relaxed border-b border-gray-300 dark:border-gray-800 pb-3">
                                Request a pilot plan + sample lab outline + sample executive report.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-1.5 relative z-20">
                                {tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-200 dark:bg-[#1F2937] border border-gray-400 dark:border-gray-700 rounded-full text-[10px] font-bold text-gray-700 dark:text-purple-500 shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Visual - Video (same as Watch Demo: public/assets/Cyber Whisper.mp4) */}
                        <div className="relative mx-auto w-full max-w-[350px] aspect-square mt-2 min-h-[200px]">
                            <div className="absolute inset-0 w-full h-full rounded-lg border border-gray-400 dark:border-gray-700/50 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] bg-gray-200 dark:bg-[#0B0F19]">
                                <video
                                    src="https://res.cloudinary.com/dwpkrvrfk/video/upload/v1771334697/enterprise-fortress_1_ddfgcf.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
