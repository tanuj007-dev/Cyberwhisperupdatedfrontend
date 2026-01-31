'use client';
import { Trophy, AlertTriangle, Workflow, ArrowRight, TrendingUp } from 'lucide-react';

export default function B2BCaseStudy() {
    return (
        <section className="relative py-12 md:py-16 bg-white dark:bg-[#0B0420] border-t border-gray-200 dark:border-white/5 font-sans overflow-hidden">
            {/* Subtle background decoration - Purple theme */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
                <div className="absolute top-10 right-10 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 mb-3">
                        <TrendingUp size={14} className="text-[#a855f7]" />
                        <span className="text-xs font-bold tracking-wider text-[#a855f7] uppercase">Success Story</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        SecureFlow Implementation
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">

                    {/* Left Content - Case Study Cards */}
                    <div className="space-y-3">
                        {/* Problem Card */}
                        <div className="group relative bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#a855f7]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#a855f7]/10">
                            <div className="flex gap-3 items-start">
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] group-hover:scale-110 transition-transform">
                                    <AlertTriangle size={18} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#a855f7] mb-1.5">The Problem</h3>
                                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm leading-snug">High alert noise • Slow investigations • Team overload</p>
                                </div>
                            </div>
                        </div>

                        {/* Approach Card */}
                        <div className="group relative bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#a855f7]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#a855f7]/10">
                            <div className="flex gap-3 items-start">
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] group-hover:scale-110 transition-transform">
                                    <Workflow size={18} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#a855f7] mb-1.5">Our Approach</h3>
                                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm leading-snug">Detection tuning • Investigation playbooks • Hands-on range training</p>
                                </div>
                            </div>
                        </div>

                        {/* Result Card - Highlighted with purple theme */}
                        <div className="group relative bg-gradient-to-br from-[#a855f7]/10 via-[#9333ea]/10 to-[#a855f7]/5 dark:from-[#a855f7]/20 dark:via-[#9333ea]/15 dark:to-[#a855f7]/10 backdrop-blur-sm rounded-xl p-4 border border-[#a855f7]/30 hover:border-[#a855f7]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#a855f7]/20">
                            <div className="flex gap-3 items-start">
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#a855f7]/30 flex items-center justify-center text-[#a855f7] group-hover:scale-110 group-hover:rotate-12 transition-all">
                                    <Trophy size={18} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#a855f7] mb-1.5">The Result</h3>
                                    <p className="text-gray-900 dark:text-white font-bold text-sm leading-snug mb-2">Faster triage • Cleaner escalations • Confident team</p>
                                    <div className="flex items-center gap-2 text-[#9333ea] dark:text-[#a855f7]">
                                        <div className="px-2.5 py-1 rounded-md bg-[#a855f7]/20 dark:bg-[#a855f7]/30 text-xs font-bold">
                                            40% ↓ MTTD
                                        </div>
                                        <div className="text-xs font-semibold">in Q1</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="mt-4 p-4 rounded-lg bg-[#a855f7]/5 dark:bg-[#a855f7]/10 border-l-4 border-[#a855f7]">
                            <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
                                <span className="text-[#a855f7] font-bold">"</span>
                                Reduced mean time to detect by 40% within the first quarter.
                                <span className="text-[#a855f7] font-bold">"</span>
                            </p>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2">— SecureFlow Security Team Lead</p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-gray-200 dark:border-white/10 aspect-video md:aspect-[4/3]">
                            {/* Gradient overlays - Purple theme */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-[#9333ea]/20 mix-blend-overlay z-10" />
                            
                            {/* Animated border effect - Purple */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#a855f7] via-[#9333ea] to-[#a855f7] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
                            
                            <img
                                src="/case-study-viz-v2.png"
                                alt="Cyber Security Success Visualization"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Badge overlay - Purple theme */}
                            <div className="absolute bottom-4 left-4 z-20 px-4 py-2 rounded-lg bg-[#0B0420]/70 backdrop-blur-md border border-[#a855f7]/40">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></div>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live Results</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating stat cards - Purple theme */}
                         
                    </div>

                </div>

              
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
