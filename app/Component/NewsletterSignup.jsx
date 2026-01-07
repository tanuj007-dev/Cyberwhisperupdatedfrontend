'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import newsletterBg from './assets/path.png';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Email submitted:', email);
    // Handle consultation booking here
  };

  return (
    <div className="py-8 md:py-14 bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-gradient-to-br from-[#7c4dff] to-[#6932E2] rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">

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
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Are you prepared to soar
            <br className="hidden md:block" />
            <span className="md:inline block"> and chase your dreams?</span>
          </h2>

          <p className="text-white/90 mb-6 text-sm md:text-base font-medium">
            Get fresh lab scenarios, threat intel tips, and event invites delivered monthly.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white px-5 py-3 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-md text-sm md:text-base"
            />

            <button
              onClick={handleSubmit}
              className="bg-[#FFD700] hover:bg-[#FFC700] text-purple-900 font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg whitespace-nowrap text-sm md:text-base w-full md:w-auto"
            >
              Book a Consultation
              <div className="bg-purple-900 rounded-full p-1">
                <ArrowRight className="w-3 h-3 text-[#FFD700]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}