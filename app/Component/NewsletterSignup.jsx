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
    <div className="py-14 bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-gradient-to-br from-[#7c4dff] to-[#6932E2] rounded-3xl p-12 relative overflow-hidden">

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
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-[50px] font-semibold text-white mb-4 leading-tight">
            Are you prepared to soar
            <br />
            and chase your dreams?
          </h2>

          <p className="text-white text-opacity-90 mb-8 text-lg ">
            Get fresh lab scenarios, threat intel tips, and event invites delivered monthly.
          </p>

          <div className="flex flex-col items-center gap-4">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white max-w-sm px-6 py-3.5 rounded-full text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-[#6932E2] transition-all shadow-lg"
            />

            <button
              onClick={handleSubmit}
              className="bg-[#FFD700] hover:bg-[#FFC700] text-purple-900 font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Book a Consultation
              <div className="bg-purple-900 rounded-full p-1">
                <ArrowRight className="w-4 h-4 text-[#FFD700]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}