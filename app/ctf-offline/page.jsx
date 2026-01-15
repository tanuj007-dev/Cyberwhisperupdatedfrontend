"use client";
import React, { useEffect, useState } from "react";
import "./ctf-offline.css";

export default function CTFOfflinePage() {
    const [particles, setParticles] = useState([]);
    const [terminalText, setTerminalText] = useState("");
    const [binaryStreams, setBinaryStreams] = useState([]);

    useEffect(() => {
        // Generate particles
        const particleCount = 50;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 3 + 1,
            animationDuration: Math.random() * 5 + 3,
            animationDelay: Math.random() * 2,
        }));
        setParticles(newParticles);

        // Generate Binary Streams for background
        const streamCount = 15;
        const streams = Array.from({ length: streamCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
            opacity: Math.random() * 0.3 + 0.1,
            fontSize: Math.random() * 10 + 10,
        }));
        setBinaryStreams(streams);

        // Terminal Typing Effect
        const lines = [
            "> ESTABLISHING CONNECTION...",
            "> ERROR: TARGET_HOST_UNREACHABLE",
            "> DIAGNOSTIC: SERVER_OFFLINE",
            "> WAITING FOR ORGANIZER INPUT...",
            "> STANDBY MODE ENGAGED"
        ];

        let lineIndex = 0;
        let charIndex = 0;
        let currentText = "";
        let timeout;

        const typeWriter = () => {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    currentText += lines[lineIndex].charAt(charIndex);
                    setTerminalText(currentText);
                    charIndex++;
                    timeout = setTimeout(typeWriter, 50);
                } else {
                    currentText += "\n";
                    setTerminalText(currentText);
                    lineIndex++;
                    charIndex = 0;
                    timeout = setTimeout(typeWriter, 500);
                }
            }
        };

        timeout = setTimeout(typeWriter, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="ctf-offline-container">
            {/* CRT Scanline & Vignette Overlay */}
            <div className="crt-overlay">
                <div className="scanline"></div>
            </div>

            {/* Tech Background Layers */}
            <div className="ctf-background">
                <div className="nebula-cloud"></div>
                <div className="hex-grid"></div>
                <div className="ctf-gradient-overlay"></div>

                {/* Floating Binary Code */}
                {binaryStreams.map((stream) => (
                    <div
                        key={stream.id}
                        className="binary-stream"
                        style={{
                            left: `${stream.left}%`,
                            animationDelay: `${stream.delay}s`,
                            animationDuration: `${stream.duration}s`,
                            opacity: stream.opacity,
                            fontSize: `${stream.fontSize}px`
                        }}
                    >
                        010010110101...
                    </div>
                ))}

                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="ctf-particle"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.animationDuration}s`,
                            animationDelay: `${particle.animationDelay}s`,
                        }}
                    ></div>
                ))}

                {/* Dynamic Security Beams */}
                <div className="security-beams">
                    <div className="beam-scan-line"></div>
                    <div className="beam-vertical"></div>
                    <div className="radar-sweep"></div>
                </div>
            </div>

            {/* Decorative Technical Elements */}
            <div className="tech-HUD top-left">
                <div className="hud-label">SYS.STATUS: <span className="blink-text">OFFLINE</span></div>
                <div className="hud-bar"></div>
            </div>

            <div className="tech-HUD bottom-right">
                <div className="terminal-window">
                    <pre>{terminalText}<span className="cursor">_</span></pre>
                </div>
            </div>

            {/* Center Wrapper for Flag + Card */}
            <div className="main-display-wrapper">

                {/* Holographic Flag (Left Side) - Hidden on Mobile */}
                <div className="flag-container">
                    <div className="flag-pole"></div>
                    <div className="flag-banner">
                        {/* Cyber Whisper Logo Triangle */}
                        <svg className="flag-logo" viewBox="0 0 100 100" fill="none">
                            <path d="M50 20 L80 80 L20 80 Z" stroke="var(--tech-cyan)" strokeWidth="3" fill="rgba(0, 243, 255, 0.1)" />
                            <path d="M50 35 L70 75 L30 75 Z" stroke="var(--tech-cyan)" strokeWidth="2" />
                            <path d="M45 50 L55 50" stroke="var(--tech-cyan)" strokeWidth="2" />
                        </svg>
                        <div className="flag-ripple"></div>
                    </div>
                </div>

                {/* Main Content Card (Right Side) */}
                <div className="ctf-content-card">
                    <div className="card-border-gradient"></div>
                    <div className="card-inner-glow"></div>

                    {/* Power Icon */}
                    <div className="power-icon-container">
                        <svg className="power-icon" viewBox="0 0 100 100" fill="none">
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" className="power-ring-bg" />
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" className="power-ring-active" strokeDasharray="251" strokeDashoffset="251" filter="url(#glow)" />
                            <path d="M50 20 L50 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="power-line" filter="url(#glow)" />
                        </svg>
                    </div>

                    <h1 className="ctf-title" data-text="SYSTEM OFFLINE">
                        SYSTEM OFFLINE
                    </h1>

                    <p className="ctf-description">
                        The competitive environment is currently unresponsive.
                        <br className="hidden md:block" />
                        Please refresh later or wait for the organizer to start the lab.
                    </p>

                    {/* Status Grid */}
                    <div className="status-grid">
                        <div className="status-item">
                            <span className="label">STATUS</span>
                            <span className="value red">OFFLINE</span>
                        </div>
                        <div className="status-item">
                            <span className="label">NEXT SESSION</span>
                            <span className="value highlight">TBA</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="btn-tech btn-primary" onClick={handleRefresh}>
                            <span className="btn-content">
                                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                REFRESH
                            </span>
                            <div className="btn-glitch"></div>
                        </button>
                    </div>

                    <div className="tech-footer">
                        CYBER WHISPER CTF
                    </div>
                </div>
            </div>
        </div>
    );
}
