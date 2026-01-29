'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import newsletterBg from './assets/path.webp';
import { useEnquiry } from '../context/EnquiryContext';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const { openEnquiry } = useEnquiry();

  const handleSubmit = async () => {
    // Validate email
    if (!email || !email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed to our newsletter!');
        setMessageType('success');
        setEmail(''); // Clear the email input
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(data.message || 'Failed to subscribe. Please try again.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setLoading(false);
    }
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
            Let's build a stronger security posture with practical, measurable outcomes.
          </p>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mb-4 px-6 py-3 rounded-full text-center font-semibold transition-all ${messageType === 'success'
                ? 'bg-green-500/20 text-green-100 border border-green-400'
                : 'bg-red-500/20 text-red-100 border border-red-400'
                }`}
            >
              {message}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleSubmit();
                }
              }}
              disabled={loading}
              className="w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-md px-8 py-4 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 transition-all shadow-lg text-base md:text-lg text-center md:text-left disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#310E3F] font-bold px-10 py-4 rounded-full flex items-center justify-center gap-3 transition-all hover:gap-5 active:scale-95 shadow-xl whitespace-nowrap text-base md:text-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
              <div className="bg-[#310E3F] rounded-full p-2">
                <ArrowRight className={`w-4 h-4 text-[#FFD700] ${loading ? 'animate-pulse' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}