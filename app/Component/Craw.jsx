'use client';
import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import pathImg from './assets/path.png';
import logo from './assets/craw.png'; // Assuming this is the Craw Security logo

export default function Craw() {
    return (
        <section className="w-full py-16 bg-[#FBF9FF] font-sans px-4 md:px-8">
            <div className="max-w-7xl mx-auto relative rounded-[2.5rem] bg-[#7848F9] overflow-hidden shadow-2xl">

                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 pointer-events-none  ">
                    <Image
                        src={pathImg}
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-10">

                    {/* Left: Logos */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        {/* Brand Logo */}
                        <div className="w-40 md:w-[350px] relative h-[150px]">
                            <Image
                                src={logo}
                                alt="Craw Security"
                                fill
                                className="object-contain brightness-0 invert" // Making it white to match the purple bg
                            />
                        </div>

                        {/* Divider */}



                    </div>

                    {/* Right: Text Content */}
                    <div className="text-center lg:text-left text-white max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                            FutureSkills Prime Partner
                        </h2>
                        <p className="text-purple-100 text-sm md:text-base mb-6 opacity-90">
                            FutureSkills Prime Partner (A MeitY NASSCOM Digital Skilling Initiative)
                        </p>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white text-[#8B5CF6] px-4 py-2 rounded-md font-semibold text-xs md:text-sm shadow-lg">
                            <div className="w-4 h-4 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white">
                                <Check size={10} strokeWidth={4} />
                            </div>
                            Accredited by NASSCOM, Approved by Government of India
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
