"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Grid3X3, LayoutGrid, Camera, Award, Users, Monitor, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaLinkedinIn, FaYoutube, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa6';

import GalleryThemeWrapper from './GalleryThemeWrapper';
import Particles from './Particles';

// Gallery data with categories
// Imported Gallery Images
import img1 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (1).webp';
import img2 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (4).webp';
import img3 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (6).webp';
import img4 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (8).webp';
import img5 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (10).webp';
import img6 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (12).webp';
import img7 from './assets/gallery/WhatsApp Image 2026-01-10 at 3.49.06 PM (15).webp';
import img8 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.45 PM (1).webp';
import img9 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.47 PM.webp';
import img10 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.48 PM.webp';
import img11 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.49 PM.webp';
import img12 from './assets/gallery/WhatsApp Image 2026-01-12 at 6.34.50 PM.webp';

const customImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

const categoriesList = ['training', 'team', 'workshop', 'events', 'facilities'];

const titles = {
    training: 'Advanced Security Training',
    team: 'Elite Team Operations',
    workshop: 'Hands-on Cyber Workshop',
    events: 'Global Cyber Summit',
    facilities: 'State-of-the-Art Facility'
};

const descriptions = {
    training: 'Immersive training scenarios designed to test reaction times and strategic thinking.',
    team: 'Collaborative efforts by our top-tier security analysts tackling complex threats.',
    workshop: 'Interactive sessions focusing on latest vulnerability assessment techniques.',
    events: 'Highlights from our major industry conferences and community gatherings.',
    facilities: 'A glimpse into our secure operations centers and technology labs.'
};

// Gallery data with categories
const galleryData = [
    // Add custom images first
    ...customImages.map((src, i) => {
        const id = i + 1;
        const category = categoriesList[i % categoriesList.length];
        return {
            id: `custom-${id}`,
            src: src,
            title: `${titles[category]} Highlights`,
            category: category,
            description: descriptions[category],
        };
    }),
    // Generate placeholders (optional: can be reduced or removed if not needed, keeping for bulk)
    ...Array.from({ length: 18 }, (_, i) => {
        const id = i + 1;
        const category = categoriesList[(id - 1) % categoriesList.length];
        const ext = id === 15 ? 'png' : 'jpg';

        return {
            id: id,
            src: `/gallery/gallery-${id}.${ext}`,
            title: `${titles[category]} ${Math.ceil(id / 5)}`,
            category: category,
            description: descriptions[category],
        };
    })
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

    const filteredImages = selectedCategory === 'all'
        ? galleryData
        : galleryData.filter(img => img.category === selectedCategory);

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
        <GalleryThemeWrapper>
            <div ref={containerRef} className="overflow-hidden">

                {/* Hero Section */}
                <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    {/* Animated Background */}
                    <div className="parallax-bg absolute inset-0">
                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 dark:opacity-100" />

                        {/* Gradient orbs */}
                        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-violet-600/10 rounded-full blur-[120px] animate-pulse-slow opacity-50 dark:opacity-100" />
                        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-blue-600/10 rounded-full blur-[100px] animate-pulse-slow opacity-50 dark:opacity-100" style={{ animationDelay: '2s' }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-[150px] opacity-50 dark:opacity-100" />
                    </div>

                    {/* OGL Particles Background */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <Particles
                            particleColors={['#ffffff', '#a855f7', '#6366f1']}
                            particleCount={300}
                            particleSpread={10}
                            speed={0.1}
                            particleBaseSize={100}
                            moveParticlesOnHover={true}
                            alphaParticles={false}
                            disableRotation={false}
                            className="opacity-60 dark:opacity-80"
                        />
                    </div>

                    {/* Scanning lines */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-beam-h" style={{ animationDelay: '0s' }} />
                        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-beam-h" style={{ animationDelay: '2s' }} />
                        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-beam-h" style={{ animationDelay: '4s' }} />
                    </div>

                    <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                        {/* Badge */}
                        <div className="hero-badge inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 mt-8 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-purple-300 text-sm font-semibold tracking-wider uppercase">Explore Our Journey</span>
                        </div>

                        {/* Title */}
                        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-purple-600 to-purple-400 dark:from-white dark:via-purple-200 dark:to-purple-400">
                                Our Gallery
                            </span>
                            <br />
                            <span className="text-3xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400">
                                Moments That Define Excellence
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="hero-subtitle text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                            Dive into the visual journey of Cyber Whisper — from immersive training sessions and elite team collaborations
                            to groundbreaking conferences and award-winning achievements.
                        </p>


                    </div>

                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white dark:from-[#170A2D] to-transparent transition-colors duration-300" />
                </section>



                {/* Category Filter */}
                <section className="category-container py-12 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-4 pb-4 md:pb-0 scrollbar-hide">
                            {categories.map((cat) => {
                                const IconComponent = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`category-btn group flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shrink-0 ${selectedCategory === cat.id
                                            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25'
                                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-purple-500/30'
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0429] via-[#0E0429]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

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
                                                    <h3 className=" text-lg md:text-xl  font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                                                        {image.title}
                                                    </h3>

                                                    {/* Description - hidden on mobile, shown on desktop hover */}
                                                    {/* <p className="hidden md:block text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
                                                        {image.description}
                                                    </p> */}
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
                            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-[#0E0429]/95 backdrop-blur-xl p-4"
                            onClick={closeLightbox}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 flex items-center justify-center dark:text-white dark:hover:bg-white/20 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Navigation arrows */}
                            <button
                                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 flex items-center justify-center dark:text-white dark:hover:bg-white/20 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:backdrop-blur-sm dark:border dark:border-white/20 flex items-center justify-center dark:text-white dark:hover:bg-white/20 transition-colors"
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
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedImage.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{selectedImage.description}</p>
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
                <section className="relative py-24 px-6 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-transparent transition-colors duration-300">
                    {/* Background effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
                        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto">
                        {/* CTA Section */}
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-purple-600 to-purple-400 dark:from-white dark:via-purple-200 dark:to-purple-400">
                                    Want to Be Part of Our Story?
                                </span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                                Join our community of cybersecurity professionals and be featured in our next chapter.
                            </p>
                            <div className="flex justify-center gap-3 md:gap-4">
                                <a
                                    href="/training"
                                    className="group inline-flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 text-sm md:text-base bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                                >
                                    Start Training
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="/services"
                                    className="inline-flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 text-sm md:text-base bg-gray-100 text-gray-900 border rounded-full border-gray-900 hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-purple-500/30 transition-all duration-300"
                                >
                                    Explore Services
                                </a>
                            </div>
                        </div>






                    </div>
                </section>
            </div>
        </GalleryThemeWrapper >
    );
}
