"use client"
import React from 'react';
import Image from 'next/image';
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import path from "./assets/path.png";
export default function TrainingPrograms() {
    return (
        <section className="relative w-full bg-white py-10 px-4 md:px-12 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="relative w-full bg-[#6b46e5] rounded-[3rem] px-8 py-10 md:px-20 md:py-12 overflow-hidden shadow-2xl">

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
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-4 h-4 bg-white shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>

                            <span className="text-[14px] md:text-[15px] font-semibold tracking-[0.2em] uppercase">
                                Training Programs
                            </span>
                        </div>

                        {/* Subtitle */}
                        <h2 className="text-4xl md:text-[50px]  font-semibold mb-3 tracking-tight">
                            Building Cybersecurity Skills Through Real-World Training
                        </h2>

                        {/* Description */}


                        {/* Image Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mb-8">
                            {/* Card 1 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border-4 border-white rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
                                <Image
                                    src={img1}

                                    alt="Training Event 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Card 2 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border-4 border-white rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
                                <Image
                                    src={img2}
                                    alt="Training Event 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Bottom Features List */}
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-white/90 font-bold text-sm md:text-[16px]">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Hands-On Learning</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Industry-Aligned Programs</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Guided by Practitioners</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
