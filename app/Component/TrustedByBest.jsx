'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import cyberDefence from './assets/cyberdefence.png';
import indianAirforce from './assets/indianAirforce.png';
import indianNavy from './assets/indianNavy.png';
import militaryAffairs from './assets/militaryAffairs.png';

import bsfLogo from './assets/BSF_Logo.webp';
import nccLogo from './assets/gallery/Emblem_of_National_Cadet_Corps_(India).png';
import indianArmyLogo from './assets/gallery/Indian_Army_Insignia_circular.png';
import nsgLogo from './assets/gallery/National_security_guard_logo.png';
import pmoLogo from './assets/gallery/Ankara_01_01_01_03Apr2023.jpg';
import g20Logo from './assets/7e00ab54-56aa-4f8e-a340-891c54690a7c.png';

const TrustedByBest = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef(null);

    // Logo data - matching the defense organizations from the screenshot
    const logos = [
        { id: 1, name: 'Indian Air Force', image: indianAirforce },
        { id: 2, name: 'Indian Navy', image: indianNavy },
        { id: 9, name: 'Cyber Defence', image: cyberDefence },
        { id: 10, name: 'Military Affairs', image: militaryAffairs },
        { id: 3, name: 'NCC', image: nccLogo },
        { id: 4, name: 'BSF', image: bsfLogo },
        { id: 5, name: 'Indian Army', image: indianArmyLogo },
        { id: 6, name: 'NSG', image: nsgLogo },
        { id: 7, name: 'Prime Minister Office', image: pmoLogo },
        { id: 8, name: 'G20', image: g20Logo },
    ];

    // Responsive logos per slide
    const [logosPerSlide, setLogosPerSlide] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setLogosPerSlide(3); // Increased from 2 to 3 for compactness
            } else if (window.innerWidth < 768) {
                setLogosPerSlide(4);
            } else if (window.innerWidth < 1024) {
                setLogosPerSlide(4);
            } else if (window.innerWidth < 1280) {
                setLogosPerSlide(5);
            } else {
                setLogosPerSlide(6);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(logos.length / logosPerSlide);

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % totalSlides);
            }, 3500);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, totalSlides]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const getCurrentLogos = () => {
        const start = currentIndex * logosPerSlide;
        return logos.slice(start, start + logosPerSlide);
    };

    return (
        <section className="relative py-8 md:py-12 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 md:gap-10">

                    {/* Top - Text Content */}
                    <div className="w-full text-center space-y-3 lg:space-y-4 shrink-0">
                        {/* Badge */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-600 rounded-[1px] shadow-[0_0_12px_rgba(147,51,234,0.5)]" />
                            <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-[0.25em]">
                                Trusted By Best
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-2">
                            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-semibold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400 leading-tight pb-2">
                                Defence Staff Training
                            </h2>
                        </div>
                    </div>

                    {/* Continuous Scrolling Marquee */}
                    <div className="w-full relative overflow-hidden">
                        {/* Gradient Overlays for fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

                        <div className="flex gap-8 md:gap-12 animate-marquee">
                            {/* First set of logos */}
                            {logos.map((logo) => (
                                <div
                                    key={`first-${logo.id}`}
                                    className="shrink-0 flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 bg-white dark:bg-white/5 rounded-full">
                                        <img
                                            src={typeof logo.image === 'string' ? logo.image : logo.image.src}
                                            alt={logo.name}
                                            className="max-w-full max-h-full object-contain transition-opacity duration-300 hover:opacity-80"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                  <div class="text-gray-600 text-[10px] text-center font-medium px-1">
                                                    ${logo.name}
                                                  </div>
                                                `;
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate set for seamless loop */}
                            {logos.map((logo) => (
                                <div
                                    key={`second-${logo.id}`}
                                    className="shrink-0 flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 bg-white dark:bg-white/5 rounded-full">
                                        <img
                                            src={typeof logo.image === 'string' ? logo.image : logo.image.src}
                                            alt={logo.name}
                                            className="max-w-full max-h-full object-contain transition-opacity duration-300 hover:opacity-80"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                  <div class="text-gray-600 text-[10px] text-center font-medium px-1">
                                                    ${logo.name}
                                                  </div>
                                                `;
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default TrustedByBest;
