"use client"
import React from 'react';
import Image from 'next/image';
import img1 from "./assets/c1.webp";
import img2 from "./assets/c2.webp";
import path from "./assets/path.webp";
export default function TrainingPrograms() {
    return (
        <section className="relative w-full bg-background py-12 px-4 md:px-8 lg:px-12 overflow-hidden font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="relative w-full bg-[#6b46e5] rounded-[2rem] md:rounded-[3rem] px-6 py-10 md:px-16 lg:px-20 md:py-16 overflow-hidden shadow-2xl">

                    {/* Background Pattern Layers - Convergent Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        <Image
                            src={path}
                            alt="Background Pattern"
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                    </div>


                    <div className="relative z-10 flex flex-col items-center text-center text-white">
                        {/* Header Tag */}
                        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-white shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                            <span className="text-xs md:text-[15px] font-semibold tracking-[0.2em] uppercase">
                                Training Programs
                            </span>
                        </div>

                        {/* Subtitle */}
                        <h2 className="text-3xl md:text-5xl lg:text-[50px] font-semibold mb-8 md:mb-10 tracking-tight leading-tight max-w-4xl animate-fade-in-up delay-100">
                            Building Cybersecurity Skills Through Real-World Training
                        </h2>

                        {/* Image Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mb-10 md:mb-12">
                            {/* Card 1 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border-2 md:border-4 border-white rounded-[1.5rem] md:rounded-4xl overflow-hidden shadow-xl md:shadow-2xl transition-transform duration-500 hover:scale-[1.03] aspect-4/3 animate-fade-in-left delay-200">
                                <Image
                                    src={img1}
                                    alt="Training Event 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Card 2 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border-2 md:border-4 border-white rounded-[1.5rem] md:rounded-4xl overflow-hidden shadow-xl md:shadow-2xl transition-transform duration-500 hover:scale-[1.03] aspect-4/3 animate-fade-in-right delay-200">
                                <Image
                                    src={img2}
                                    alt="Training Event 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Bottom Features List */}
                        <div className="flex flex-row justify-between sm:justify-center items-center gap-2 sm:gap-x-12 text-white/90 font-bold text-[10px] sm:text-xs md:text-base animate-fade-in-up delay-300 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 sm:bg-transparent px-2 py-3 sm:p-0 rounded-xl sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none flex-1 sm:flex-none h-full justify-center">
                                <div className="hidden sm:block w-2 h-2 bg-white rounded-full"></div>
                                <span className="text-center sm:text-left leading-snug">Hands<br className="sm:hidden" /> On<br className="sm:hidden" /> Learning</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 sm:bg-transparent px-2 py-3 sm:p-0 rounded-xl sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none flex-1 sm:flex-none h-full justify-center">
                                <div className="hidden sm:block w-2 h-2 bg-white rounded-full"></div>
                                <span className="text-center sm:text-left leading-snug">Industry<br className="sm:hidden" /> Aligned<br className="sm:hidden" /> Programs</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 sm:bg-transparent px-2 py-3 sm:p-0 rounded-xl sm:rounded-none backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none flex-1 sm:flex-none h-full justify-center">
                                <div className="hidden sm:block w-2 h-2 bg-white rounded-full"></div>
                                <span className="text-center sm:text-left leading-snug">Guided<br className="sm:hidden" /> By<br className="sm:hidden" /> Practitioners</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
