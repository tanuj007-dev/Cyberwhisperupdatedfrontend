'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    text: '"Amit Sharma Sir is an exceptional AWS Associate teacher at Craw Saket. His deep knowledge, clear explanations, and practical teaching approach make complex concepts easy to understand."',
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    text: '"The course structure is amazing and the instructors are very supportive. I learned so much and feel confident in my skills now. Highly recommend to everyone."',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    text: '"Best learning experience ever! The practical approach and hands-on projects helped me understand complex concepts easily. The curriculum is truly top-notch."',
  },
  {
    id: 4,
    name: 'Michael Brown',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    text: '"Highly recommend this course to anyone looking to advance their career. The teaching methodology is top-notch and the curriculum is always up-to-date."',
  },
  {
    id: 5,
    name: 'Emily Davis',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    text: '"The mentors are always available to help. The community is very active and supportive. I am glad I chose this course for my professional growth."',
  }
];

const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentIndex >= testimonials.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length);
      }, 700);
    }
    if (currentIndex <= testimonials.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length * 2 - 1);
      }, 700);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section className="py-12 md:py-16 bg-[#6B46E5] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-3 h-3 bg-white rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
            <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">TESTIMONIALS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold text-white tracking-tight"
          >
            What Our Students Say
          </motion.h2>
        </div>

        {/* Slider Container */}
        <div
          className="relative max-w-6xl mx-auto px-4 lg:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Side Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 -right-4 md:-left-4 md:-right-4 lg:-left-12 lg:-right-12 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#6B46E5] transition-all duration-300 pointer-events-auto backdrop-blur-md group shadow-xl"
              aria-label="Previous slide"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#6B46E5] transition-all duration-300 pointer-events-auto backdrop-blur-md group shadow-xl"
              aria-label="Next slide"
            >
              <ArrowRightIcon />
            </button>
          </div>

          {/* Slider Track */}
          <div className="overflow-hidden py-6">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex) * (100 / 3)}%)`,
                transitionProperty: isTransitioning ? 'transform' : 'none'
              }}
            >
              {extendedTestimonials.map((testimonial, i) => {
                const isCenter = i === currentIndex + 1;

                return (
                  <div
                    key={`${testimonial.id}-${i}`}
                    className="min-w-full md:min-w-[33.333%] px-4"
                  >
                    <motion.div
                      animate={{
                        scale: isCenter ? 1 : 0.92,
                        opacity: isCenter ? 1 : 0.6
                      }}
                      className="relative rounded-3xl bg-white/10 border border-white/20 p-6 md:p-8 h-full flex flex-col justify-between backdrop-blur-md transition-all duration-500 hover:bg-white/[0.15] group shadow-2xl"
                    >
                      {/* Top Row: Stars & Quote */}
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, s) => (
                            <svg key={s} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-white/20 group-hover:text-white/40 transition-colors duration-500 scale-75 origin-top-right">
                          <svg width="40" height="30" viewBox="0 0 48 36" fill="currentColor">
                            <path d="M20 0H28L22 18H28V36H10V18L16.5 0H20ZM40 0H48L42 18H48V36H30V18L36.5 0H40Z" transform="translate(-10,0)" />
                          </svg>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="grow">
                        <p className="text-sm md:text-[15px] leading-relaxed text-white/90 font-medium italic mb-4 md:mb-6">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-white/10 mb-4 md:mb-6" />

                      {/* Author */}
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-white/30 blur-md rounded-full group-hover:bg-white/50 transition-all duration-300" />
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/60 shadow-lg"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base md:text-lg tracking-tight leading-none">
                            {testimonial.name}
                          </h4>
                          <p className="text-white/70 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-1 md:mt-2">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => {
              const normalizedCurrent = (currentIndex % testimonials.length);
              const isActive = normalizedCurrent === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(testimonials.length + index);
                    setIsPaused(true);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${isActive ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}
