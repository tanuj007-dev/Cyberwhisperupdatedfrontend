'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import logo from './assets/logo2.jpg';

export default function WhatsAppPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger popup when user scrolls down 300px
            if (window.scrollY > 300 && !hasOpened) {
                setIsOpen(true);
                setHasOpened(true); // Ensure it only opens automatically once
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasOpened]);

    const handleGetInfo = () => {
        // Redirect to WhatsApp
        window.open('https://wa.me/9220946887', '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[300px] sm:w-[340px] bg-[#E5DDD5] rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="bg-[#075E54] p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden">
                                        <Image
                                            src={logo}
                                            alt="Cyber Whisper"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#075E54] rounded-full"></div>
                                </div>
                                <div className="text-white">
                                    <h3 className="font-bold text-sm leading-tight">Cyber Whisper</h3>
                                    <p className="text-[10px] opacity-90 leading-tight">online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 relative min-h-[140px]">
                            {/* Background Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat mix-blend-multiply pointer-events-none" />

                            {/* Message Bubble */}
                            <div className="relative bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] animate-in fade-in slide-in-from-left-2 duration-500">
                                <p className="text-[11px] text-gray-500 mb-1 font-medium">Cyber Whisper</p>
                                <p className="text-gray-800 text-sm leading-snug">
                                    Hi,<br />
                                    How can I help you ?
                                </p>
                                {/* Timestamp approximate */}
                                <p className="text-[10px] text-gray-400 text-right mt-1">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>

                        {/* Footer / Action */}
                        <div className="p-3 bg-white">
                            <button
                                onClick={handleGetInfo}
                                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mb-2"
                            >
                                <FaWhatsapp size={20} />
                                Get Info
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[#25D366]/40 shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-110 active:scale-90"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ rotate: 10 }}
            >
                <FaWhatsapp size={32} />
            </motion.button>
        </div>
    );
}
