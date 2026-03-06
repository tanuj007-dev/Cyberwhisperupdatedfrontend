"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';
import path from "./assets/path.webp";

// Video from Cloudinary CDN
const TRAINING_VIDEO_SRC = "https://res.cloudinary.com/dwpkrvrfk/video/upload/v1771334344/cyber_promo_w3stgo.mp4"


export default function TrainingPrograms() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section className="relative w-full bg-background py-6 md:py-10 px-3 md:px-6 overflow-hidden font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="relative w-full bg-[#6b46e5] rounded-[1.5rem] md:rounded-4xl p-4 md:p-8 overflow-hidden shadow-2xl isolate">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                        <Image
                            src={path}
                            alt="Background Pattern"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center text-white space-y-4 md:space-y-6">
                        {/* Header Section */}
                        <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-3">
                                <div className="w-5 h-5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                                <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">Training Programs</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                                Building Cybersecurity Skills Through Real-World Training
                            </h1>
                        </div>

                        {/* Video Container - Cloudinary CDN hosted video */}
                        <div className="relative w-full max-w-3xl mx-auto rounded-xl md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-black/20 backdrop-blur-sm group translate-y-2 aspect-video min-h-[200px]">

                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover absolute inset-0"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                            >
                                <source src={TRAINING_VIDEO_SRC} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Mute / Unmute button - bottom right */}
                            <button
                                type="button"
                                onClick={toggleMute}
                                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                                className="absolute bottom-3 right-3 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
                                ) : (
                                    <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                                )}
                            </button>
                        </div>

                        {/* Features - Simplified Layout */}
                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 pt-2 md:pt-4 w-full sm:w-auto">
                            {[
                                'Hands On Learning',
                                'Industry Aligned Programs',
                                'Guided By Practitioners'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center justify-center sm:justify-start gap-3 bg-white/5 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10 backdrop-blur-md w-full sm:w-auto">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm md:text-base font-medium text-white/90">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
