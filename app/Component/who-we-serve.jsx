"use client"
import React from 'react';
import Image from 'next/image';

export default function WeServe() {
  return (
    <section className="relative overflow-hidden bg-[#FBFAFF] py-12 md:py-24 lg:py-32 font-sans">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B46E5]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4FB7C1]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          <div className="lg:col-span-6 relative flex items-center justify-center animate-fade-in-left">
            <div className="relative w-full aspect-square max-w-[550px]">
              <div className="absolute inset-0 bg-[#4FB7C1]/5 blur-3xl rounded-full" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(79,183,193,0.15)] group">
                <Image
                  src="/cyber_city_industries.webp"
                  alt="Industries We Serve Illustration"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                {/* Overlay to blend with dark bg */}
                <div className="absolute inset-0 bg-linear-to-t from-[#030014]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6">
            <div className="space-y-8 animate-fade-in-right">
              <div className="space-y-6">
                {/* Purple Label */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#6B46E5] shadow-[3px_3px_6px_rgba(107,70,229,0.45)]"></div>
                  <span className="text-[#030014] text-sm font-bold uppercase tracking-[0.2em]">
                    WHO WE SERVE
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-[45px] font-bold leading-[1.2] text-[#030014] tracking-tight">
                  We don't just deploy and <br className="hidden md:block" />
                  go we partner with you for <br className="hidden md:block" />
                  the long haul
                </h2>

                {/* Description */}
                <p className="text-base md:text-[17px] leading-relaxed text-slate-500 font-medium max-w-xl">
                  Our integrated approach goes beyond quick fixes, combining advanced AI, real-world simulations, and round-the-clock monitoring to keep you a step ahead of emerging threats.
                </p>

                {/* Badge/Feature */}
                <div className="inline-flex items-center gap-2 bg-[#6B46E5] text-white px-4 md:px-5 py-2 rounded-md font-semibold text-xs md:text-sm transition-transform hover:scale-105 cursor-default">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  99.9% Threat Coverage
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 md:gap-5 pt-6 md:pt-8">
                  <button className="bg-[#1D0B2E] hover:bg-[#2A1042] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-[15px] transition-all duration-300 shadow-xl shadow-[#1D0B2E]/20 active:scale-95">
                    Learn More
                  </button>
                  <button className="border-2 border-[#1D0B2E]/10 hover:border-[#1D0B2E] text-[#1D0B2E] px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-[15px] transition-all duration-300 active:scale-95">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}