'use client';

import React from 'react';

const Recognition = () => {
    const awards = [
        { id: 1, year: '2021', label: 'ATC Circle of Excellence', image: '/awards/award-2021.png' },
        { id: 2, year: '2023', label: 'ATC Circle of Excellence', image: '/awards/award-2023.png' },
        { id: 3, year: '2021', label: 'ATC Circle of Excellence', image: '/awards/award-2021-2.png' },
        { id: 4, year: '2023', label: 'ATC Circle of Excellence', image: '/awards/award-2023-2.png' },
    ];

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-20">

                    {/* Left Side - 4 Award Images */}
                    <div className="w-full md:w-1/2">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                            {awards.map((award, index) => (
                                <div
                                    key={award.id}
                                    className="group relative flex flex-col items-center justify-center p-2"
                                >
                                    {/* Gold Shield Placeholder/Image */}
                                    <div className="relative w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 transition-transform duration-300 group-hover:-translate-y-2">
                                        {/* Shadow/Glow effect */}
                                        <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Actual Image container - Using a placeholder design if image fails or for visualization */}
                                        <div className="relative w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-50 border-2 border-yellow-200 rounded-lg shadow-sm flex flex-col items-center justify-center p-2 text-center">
                                            {/* Shield Shape Mockup using CSS borders or just a box for now, assuming user will replace with real imgs */}
                                            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded">
                                                <img
                                                    src={award.image}
                                                    alt={`EC-Council Award ${award.year}`}
                                                    className="w-full h-full object-contain drop-shadow-md"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `
                                        <div class="flex flex-col items-center justify-center h-full text-yellow-800">
                                            <svg class="w-10 h-10 mb-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>
                                            <span class="text-[10px] font-bold uppercase leading-tight">ATC Circle of<br/>Excellence</span>
                                            <span class="text-lg font-bold mt-1">${award.year}</span>
                                        </div>
                                    `
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                        {/* Badge/Label */}
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <div className="w-4 h-4 rounded-sm bg-purple-600 shadow-sm shrink-0" />
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                                Recognition
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl sm:text-5xl lg:text-[50px] font-semibold text-[#0A0B1A] leading-tight">
                            EC-Council Circle of <br className="hidden lg:block" />
                            Excellence
                        </h2>

                        {/* Decorative Yellow Underline */}
                        <div className="relative h-4 w-64 mx-auto md:mx-0 mt-2">
                            <svg
                                viewBox="0 0 200 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                            >
                                <path
                                    d="M2.00025 7C49.9998 -0.999998 169.999 -0.999999 217.999 7"
                                    stroke="#FFD700"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Recognition;
