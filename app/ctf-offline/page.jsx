"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLock, FaClock, FaExclamationTriangle, FaBell, FaChevronLeft } from "react-icons/fa";
import "./ctf-offline.css";

// Import Assets
import lockBg from "../Component/assets/banner-lock.png";
import gridOverlay from "../Component/assets/grid.png";

export default function CTFOfflinePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="ctf-offline-wrapper">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src={lockBg}
                    alt="Security Lock"
                    fill
                    className="object-cover opacity-20 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-[#02000d]/90"></div>
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: `url(${gridOverlay.src})`, backgroundSize: '50px 50px' }}
                ></div>

                {/* Animated Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                <FaChevronLeft /> <span>Return to Base</span>
            </Link>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 h-full flex flex-col items-center justify-center min-h-screen">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`
                    }}
                    className="w-full bg-[#0a0a12]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-1 md:p-2 shadow-2xl relative overflow-hidden group"
                >
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>

                    <div className="relative bg-[#05050a]/80 rounded-[1.2rem] p-8 md:p-16 flex flex-col items-center text-center border border-white/5 h-full overflow-hidden">

                        {/* Scanline */}
                        <div className="absolute inset-0 bg-scanline pointer-events-none opacity-5"></div>

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                            className="w-24 h-24 mb-8 relative flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-purple-600/20 rounded-full animate-ping-slow"></div>
                            <div className="relative z-10 w-20 h-20 bg-linear-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                <FaLock className="text-3xl text-purple-400" />
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6 max-w-2xl"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-r from-white via-purple-100 to-gray-400 font-tech">
                                SYSTEM OFFLINE
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                                The Cyber Range environment is currently undergoing <span className="text-purple-300 font-medium">scheduled security maintenance</span>.
                                Access is temporarily restricted to ensure platform integrity.
                            </p>

                            {/* Status Indicators */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mx-auto pt-4">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                        <FaExclamationTriangle className="text-red-400" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Status</div>
                                        <div className="text-red-400 font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                            Locked
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <FaClock className="text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold">Estimated Uptime</div>
                                        <div className="text-blue-400 font-bold">
                                            TBA
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                                <button className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2 overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        <FaBell /> Notify When Online
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                                </button>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 text-gray-300 hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    Check Status Again
                                </button>
                            </div>

                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-white/20 text-xs font-mono tracking-[0.2em]"
                >
                    SECURE CONNECTION TERMINATED // ID: 8X-992
                </motion.div>
            </div>
        </div>
    );
}
