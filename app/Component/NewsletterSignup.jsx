'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import newsletterBg from './assets/path.webp';
import { useEnquiry } from '../context/EnquiryContext';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const { openEnquiry } = useEnquiry();

  const handleSubmit = () => {
    console.log('Email submitted:', email);
    // Handle consultation booking here
  };

  return (
    <div className="py-8 md:py-14 bg-background flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-5xl bg-linear-to-br from-[#7c4dff] to-[#6932E2] rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">

        {/* Wave Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${newsletterBg?.src || newsletterBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Are you prepared to secure and chase your demons?

          </h2>

          <p className="text-white/90 mb-6 text-sm md:text-base font-medium">
            Let’s build a stronger security posture with practical, measurable outcomes.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-3xl mx-auto">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-xl bg-white px-6 py-2 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-md text-base md:text-lg text-center md:text-left"
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0 justify-center">
              <button
                onClick={handleSubmit}
                className="bg-[#FFD700] hover:bg-[#FFC700] text-purple-900 font-bold px-8 py-2 rounded-full flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg whitespace-nowrap text-base md:text-lg w-full sm:w-auto"
              >
                Book Consultation
                <div className="bg-purple-900 rounded-full p-1.5">
                  <ArrowRight className="w-4 h-4 text-[#FFD700]" />
                </div>
              </button>

              <button
                onClick={openEnquiry}
                className="bg-white hover:bg-gray-50 text-purple-900 font-bold px-8 py-2 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap text-base md:text-lg w-full sm:w-auto border border-transparent hover:border-purple-200"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}