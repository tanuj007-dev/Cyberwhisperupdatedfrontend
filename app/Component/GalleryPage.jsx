"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Grid3X3, LayoutGrid, Camera, Award, Users, Monitor, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaLinkedinIn, FaYoutube, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

// Gallery data with categories
const galleryData = [
    {
        id: 1,
        src: '/gallery_cyber_training.png',
        title: 'Cybersecurity Training Lab',
        category: 'training',
        description: 'State-of-the-art training environment with holographic displays and AI-powered threat simulations.',
    },
    {
        id: 2,
        src: '/gallery_team_collab.png',
        title: 'Expert Team Collaboration',
        category: 'team',
        description: 'Our elite cybersecurity experts working together in our futuristic command center.',
    },
    {
        id: 3,
        src: '/gallery_workshop.png',
        title: 'Interactive Workshops',
        category: 'workshop',
        description: 'Hands-on learning sessions with cutting-edge VR and holographic technology.',
    },
    {
        id: 4,
        src: '/gallery_awards.png',
        title: 'Award Ceremonies',
        category: 'events',
        description: 'Celebrating excellence in cybersecurity at our prestigious award events.',
    },
    {
        id: 5,
        src: '/gallery_pentest_lab.png',
        title: 'Penetration Testing Lab',
        category: 'training',
        description: 'Red team operations facility for advanced offensive security training.',
    },
    {
        id: 6,
        src: '/gallery_conference.png',
        title: 'Global Conferences',
        category: 'events',
        description: 'Keynote presentations featuring industry thought leaders and innovations.',
    },
    {
        id: 7,
        src: '/gallery_soc_center.png',
        title: 'Security Operations Center',
        category: 'facilities',
        description: '24/7 SOC monitoring center with real-time global threat intelligence.',
    },
    {
        id: 8,
        src: '/gallery_ctf_event.png',
        title: 'CTF Competitions',
        category: 'events',
        description: 'Competitive capture-the-flag events testing cybersecurity skills.',
    },
];

const categories = [
    { id: 'all', label: 'All', icon: Grid3X3 },
    { id: 'training', label: 'Training', icon: Monitor },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'workshop', label: 'Workshops', icon: Camera },
    { id: 'events', label: 'Events', icon: Award },
    { id: 'facilities', label: 'Facilities', icon: Shield },
];

const stats = [
    { value: '500+', label: 'Training Sessions', icon: Zap },
    { value: '50+', label: 'Global Events', icon: Award },
    { value: '2000+', label: 'Trained Professionals', icon: Users },
    { value: '100%', label: 'Client Satisfaction', icon: Shield },
];

export default function GalleryPage() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const galleryGridRef = useRef(null);
    const statsRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [particles, setParticles] = useState([]);

    const filteredImages = selectedCategory === 'all'
        ? galleryData
        : galleryData.filter(img => img.category === selectedCategory);

    // Generate particles on client-side only to avoid SSR mismatch
    useEffect(() => {
        const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
        }));
        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero section animations
            gsap.fromTo(
                '.hero-title',
                { opacity: 0, y: 100, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                }
            );

            gsap.fromTo(
                '.hero-subtitle',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power3.out',
                }
            );

            gsap.fromTo(
                '.hero-badge',
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.6,
                    ease: 'back.out(1.7)',
                }
            );

            // Floating particles animation
            gsap.to('.floating-particle', {
                y: 'random(-20, 20)',
                x: 'random(-15, 15)',
                rotation: 'random(-180, 180)',
                duration: 'random(3, 6)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: {
                    each: 0.2,
                    from: 'random',
                },
            });

            // Category filters animation
            gsap.fromTo(
                '.category-btn',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.category-container',
                        start: 'top 80%',
                    },
                }
            );

            // Gallery grid items with scroll trigger
            gsap.fromTo(
                '.gallery-item',
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.8,
                    rotationY: 15,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 0.8,
                    stagger: {
                        each: 0.15,
                        from: 'start',
                    },
                    scrollTrigger: {
                        trigger: galleryGridRef.current,
                        start: 'top 75%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Stats counter animation
            gsap.fromTo(
                '.stat-item',
                { opacity: 0, y: 50, scale: 0.5 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Parallax effect on scroll
            gsap.to('.parallax-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Horizontal scroll for mobile gallery preview
            gsap.to('.scroll-indicator', {
                x: 10,
                repeat: -1,
                yoyo: true,
                duration: 0.8,
                ease: 'power1.inOut',
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Re-animate gallery items when category changes
    useEffect(() => {
        gsap.fromTo(
            '.gallery-item',
            { opacity: 0, y: 40, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
            }
        );
    }, [selectedCategory]);

    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    const navigateImage = (direction) => {
        const newIndex = direction === 'next'
            ? (currentImageIndex + 1) % filteredImages.length
            : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentImageIndex(newIndex);
        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#030014] overflow-hidden">

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="parallax-bg absolute inset-0">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

                    {/* Gradient orbs */}
                    <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-violet-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-[150px]" />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="floating-particle absolute w-2 h-2 bg-purple-500/30 rounded-full"
                            style={{
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Scanning lines */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-beam-h" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-beam-h" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-beam-h" style={{ animationDelay: '4s' }} />
                </div>

                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    {/* Badge */}
                    <div className="hero-badge inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-purple-300 text-sm font-semibold tracking-wider uppercase">Explore Our Journey</span>
                    </div>

                    {/* Title */}
                    <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                            Our Gallery
                        </span>
                        <br />
                        <span className="text-3xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400">
                            Moments That Define Excellence
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                        Dive into the visual journey of Cyber Whisper — from immersive training sessions and elite team collaborations
                        to groundbreaking conferences and award-winning achievements.
                    </p>

                    {/* Scroll indicator */}
                    <div className="scroll-indicator flex items-center justify-center gap-2 text-purple-400/60">
                        <span className="text-sm">Scroll to explore</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent" />
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="stat-item group relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 text-center">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="w-7 h-7 text-purple-400" />
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-400 font-medium">{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="category-container py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`category-btn group flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-purple-500/30'
                                        }`}
                                >
                                    <IconComponent className={`w-4 h-4 transition-transform duration-300 ${selectedCategory === cat.id ? 'text-white' : 'text-purple-400 group-hover:scale-110'
                                        }`} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 px-6">
                <div ref={galleryGridRef} className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`gallery-item group relative rounded-2xl overflow-hidden cursor-pointer ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                                        }`}
                                    onClick={() => openLightbox(image, index)}
                                >
                                    {/* Image container */}
                                    <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden`}>
                                        <Image
                                            src={image.src}
                                            alt={image.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                                        {/* Scan line effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-beam-h" />
                                        </div>

                                        {/* Corner glows */}
                                        <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                {/* Category badge */}
                                                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
                                                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                                                </span>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                                                    {image.title}
                                                </h3>

                                                {/* Description - hidden until hover */}
                                                <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                                                    {image.description}
                                                </p>
                                            </div>

                                            {/* Zoom icon */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                                    <ZoomIn className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Border glow */}
                                        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-purple-500/50 transition-colors duration-500" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]/95 backdrop-blur-xl p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation arrows */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-5xl max-h-[80vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Image info */}
                            <div className="mt-6 text-center">
                                <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30">
                                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                                <p className="text-gray-400 max-w-2xl mx-auto">{selectedImage.description}</p>
                            </div>

                            {/* Image counter */}
                            <div className="mt-4 text-center text-gray-500">
                                {currentImageIndex + 1} / {filteredImages.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Gallery Footer with Links */}
            <section className="relative py-24 px-6 border-t border-white/5">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
                    <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* CTA Section */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                                Want to Be Part of Our Story?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            Join our community of cybersecurity professionals and be featured in our next chapter.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/training"
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                            >
                                Start Training
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/services"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                            >
                                Explore Services
                            </a>
                        </div>
                    </div>

                    {/* Footer Links */}


                    {/* Newsletter */}
                    <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
                                <p className="text-gray-400">Get the latest news and updates from Cyber Whisper.</p>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 md:w-64 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
