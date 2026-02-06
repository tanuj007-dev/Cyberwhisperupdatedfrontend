'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Student (Mumbai, India)',
    text: '"The training is completely hands-on. After every concept we worked on real SOC-style alerts, investigations, and reporting. Mentor support was quick and practical."',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Working Professional (Delhi, India)',
    text: '"Cyber Whisper’s SIEM labs (Wazuh/ELK) made things click. The workflow—from triage to closure notes—felt exactly like what happens in a real SOC."',
  },
  {
    id: 3,
    name: 'Rohit Verma',
    role: 'Fresher (Bengaluru, India)',
    text: '"I joined with basics and gained confidence fast. The cyber range labs and weekly checkpoints kept me consistent, and the capstone project helped my portfolio."',
  },
  {
    id: 4,
    name: 'Neha Iyer',
    role: 'Security Analyst (Pune, India)',
    text: '"What I liked most was the real-world approach—log analysis, detection logic, incident timelines, and documentation. It improved how I communicate findings."',
  },
  {
    id: 5,
    name: 'Kunal Singh',
    role: 'Final Year Student (Hyderabad, India)',
    text: '"The mentoring is strong and the labs are not generic. I learned alert triage, threat intel enrichment, and reporting in a structured way—very job-aligned."',
  },
  {
    id: 6,
    name: 'Emily Carter',
    role: 'Student (London, UK)',
    text: '"The sessions are interactive and mentor-led, not one-way. The labs after each module helped me retain concepts and build a clear SOC workflow mindset."',
  },
  {
    id: 7,
    name: 'Michael Reyes',
    role: 'IT Support → SOC Transition (Austin, USA)',
    text: '"I needed a practical bridge into blue-team work. The cyber range exercises, case investigations, and playbook-style learning gave me a solid foundation."',
  },
  {
    id: 8,
    name: 'Sophie Nguyen',
    role: 'Junior Analyst (Toronto, Canada)',
    text: '"Great structure and guidance. The team explains why an alert matters, how to validate it, and how to document it properly—very useful for real operations."',
  },
  {
    id: 9,
    name: 'Jonas Weber',
    role: 'Working Professional (Berlin, Germany)',
    text: '"Strong focus on detection and investigation. The log-based exercises felt realistic, and the mentor feedback improved my methodology and reporting clarity."',
  },
  {
    id: 10,
    name: 'Olivia Hart',
    role: 'Graduate Student (Sydney, Australia)',
    text: '"The monthly checkpoints and hands-on labs kept me accountability. I learned how to approach incidents step-by-step and present findings confidently."',
  },
];

const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <div className="w-3 h-3 md:w-4 md:h-4 bg-white  shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
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
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 100 / 3)}%)`,
                transitionProperty: isTransitioning ? 'transform' : 'none'
              }}
            >
              {extendedTestimonials.map((testimonial, i) => {
                const isCenter = isMobile ? i === currentIndex : i === currentIndex + 1;

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
                          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/20 border-2 border-white/60 shadow-lg text-white">
                            <UserIcon />
                          </div>
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

function UserIcon() {
  return (
    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
