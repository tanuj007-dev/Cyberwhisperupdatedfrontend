'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TrustedByBest = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef(null);

    // Logo data - matching the defense organizations from the screenshot
    const logos = [
        { id: 1, name: 'Indian Air Force', image: '/logos/iaf.png' },
        { id: 2, name: 'Indian Navy', image: '/logos/navy.png' },
        { id: 3, name: 'NCC', image: '/logos/ncc.png' },
        { id: 4, name: 'BSF', image: '/logos/bsf.png' },
        { id: 5, name: 'Indian Army', image: '/logos/army.png' },
        { id: 6, name: 'NSG', image: '/logos/nsg.png' },
        { id: 7, name: 'Prime Minister Office', image: '/logos/pmo.png' },
        { id: 8, name: 'G20', image: '/logos/g20.png' },
    ];

    // Responsive logos per slide
    const [logosPerSlide, setLogosPerSlide] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setLogosPerSlide(2);
            } else if (window.innerWidth < 768) {
                setLogosPerSlide(3);
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
        <section className="relative py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 xl:gap-16">

                    {/* Left Side - Text Content */}
                    <div className="w-full md:w-[35%] space-y-4 lg:space-y-6 shrink-0">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 rounded">
                            <div className="w-3 h-3 bg-white rounded-sm" />
                            <span className="text-xs font-semibold text-white uppercase tracking-wide">
                                Trusted by the Best
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-3">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[50px] font-semibold text-black leading-tight">
                                Defence Staff
                                <br />
                                Training
                            </h2>

                            {/* Yellow Curved Underline - SVG for smooth curve */}
                            <svg
                                width="220"
                                height="12"
                                viewBox="0 0 220 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-32 sm:w-40 md:w-48 lg:w-56"
                            >
                                <path
                                    d="M2 10C50 2, 170 2, 218 10"
                                    stroke="#FFD700"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Right Side - Logo Carousel with Navigation */}
                    <div className="w-full md:w-[65%] relative">
                        <div className="flex items-center gap-4 md:gap-6">

                            {/* Previous Button */}
                            <button
                                onClick={handlePrev}
                                className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 hover:bg-purple-200 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
                                aria-label="Previous logos"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
                            </button>

                            <div className="flex-1 overflow-hidden">
                                <div
                                    className="flex transition-transform duration-700 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                    }}
                                >
                                    {Array.from({ length: Math.ceil(logos.length / logosPerSlide) }).map((_, pageIndex) => {
                                        const pageLogos = logos.slice(pageIndex * logosPerSlide, (pageIndex + 1) * logosPerSlide);
                                        return (
                                            <div key={pageIndex} className="min-w-full flex items-center justify-center gap-4 md:gap-6 lg:gap-8 px-4">
                                                {pageLogos.map((logo) => (
                                                    <div
                                                        key={logo.id}
                                                        className="shrink-0"
                                                    >
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110">
                                                            <img
                                                                src={logo.image}
                                                                alt={logo.name}
                                                                className="max-w-full max-h-full object-contain transition-opacity duration-300 hover:opacity-80"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.parentElement.innerHTML = `
                                                          <div class="text-gray-600 text-xs text-center font-medium px-1">
                                                            ${logo.name}
                                                          </div>
                                                        `;
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95 shadow-lg shadow-purple-300/50"
                                aria-label="Next logos"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </section>
    );
};

export default TrustedByBest;
