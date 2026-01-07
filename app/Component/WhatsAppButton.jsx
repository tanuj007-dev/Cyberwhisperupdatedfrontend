"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/9220946887" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 z-50 hidden md:flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="w-9 h-9" />
        </motion.a>
    );
}
