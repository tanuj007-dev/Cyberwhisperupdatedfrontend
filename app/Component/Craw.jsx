'use client';
import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import pathImg from './assets/path.png';
import logo from './assets/craw.png'; // Assuming this is the Craw Security logo

export default function Craw() {
    return (
        <section className="w-full py-8 md:py-16 bg-[#FBF9FF] font-sans px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto relative rounded-[1.5rem] md:rounded-[2.5rem] bg-[#7848F9] overflow-hidden shadow-xl md:shadow-2xl">

                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-100">
                    <Image
                        src={pathImg}
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 md:p-10 lg:p-14 gap-6 md:gap-10">

                    {/* Left: Logos */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center w-full lg:w-auto">
                        {/* Brand Logo */}
                        <div className="w-[180px] sm:w-[220px] md:w-[300px] relative h-[80px] sm:h-[100px] md:h-[120px]">
                            <Image
                                src={logo}
                                alt="Craw Security"
                                fill
                                className="object-contain brightness-0 invert" // Making it white to match the purple bg
                            />
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="text-center lg:text-left text-white max-w-xl w-full lg:w-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">
                            FutureSkills Prime Partner
                        </h2>
                        <p className="text-purple-100 text-xs sm:text-sm md:text-base mb-4 md:mb-6 opacity-90 font-medium">
                            FutureSkills Prime Partner (A MeitY NASSCOM Digital Skilling Initiative)
                        </p>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white text-[#7848F9] px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm shadow-lg mx-auto lg:mx-0 max-w-xs md:max-w-none justify-center lg:justify-start">
                            <div className="w-4 h-4 md:w-5 md:h-5 bg-[#7848F9] rounded-full flex items-center justify-center text-white shrink-0">
                                <Check className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={4} />
                            </div>
                            <span>Accredited by NASSCOM, Approved by Government of India</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
