"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import assets
// import tool1 from './assets/1.webp';
// import tool2 from './assets/2.webp';
// import tool3 from './assets/3.webp';
// import tool4 from './assets/4.webp';
// import tool5 from './assets/5.webp';
// import tool6 from './assets/6.webp';
// import tool7 from './assets/7.webp';
import unnamed from './assets/2249-unnamed.pngS.webp';
import hash from './assets/5461df8fd2fe783981b0180332821184b729980e.webp';
import opensearch from './assets/opensearch-logo-png_seeklogo-406743.webp';
import sentinel from './assets/Microsoft-Sentinel-1.webp';
import images_jpg from './assets/cf352209-6f33-4abc-92bb-b796e286e35c.png';
import virustotal from './assets/Virustotal_logo_pixelalign.webp';
import opencti from './assets/OpenCTI.webp';
import mitre from './assets/5bfdce88cd3820f7c5c21e02_mitre.webp';
import id8625 from './assets/1ff56c87-de11-4bb8-bb84-609cccd716c9.png';
import suricata from './assets/Suricata_logo_600x600-1.webp';

import images_png from './assets/cf352209-6f33-4abc-92bb-b796e286e35c.png';
import yara from './assets/Yara_logo.svg.webp';
import images_1_png from './assets/8468d7a9-4618-40c3-9ab6-d4f6d4c1e067.png';
import images_1_jpg from './assets/d4ced9b1-29d9-49b5-8eb8-f2380aed2555.png';
import burp from './assets/burp_suite_proxies_e6501bcb84.webp';
import images_2_png from './assets/4712f53c-0ddd-4302-8eeb-d5740ffbbe5f.png';
import images_4_png from './assets/603f0073-f03a-442c-8420-4b3d5f49142c.png';
import aws from './assets/25446cb0-2ab0-459e-bdf4-5709011dc0bc.png';
import azure from './assets/Microsoft-Azure-Logo.webp';
import terraform from './assets/terraform-icon-tew8r4clf5ocvoyj0o05j.webp';
import images_2_jpg from './assets/18bd6100-ee3f-4702-b597-499e0da1a9e7.png';
import kubernetes from './assets/cb26c468-4065-4491-bfd5-1debd688366c.png';
import openai from './assets/openai_logo_icon_248315.png';
import wazuh from './assets/wazuh.png';
import misp from './assets/misp.png';
import kali from './assets/15812df3-012f-4bfe-96f1-776bcd59d5e9.png';
import atomic from './assets/atomic.png';
import firewall from './assets/79-790653_next-generation-firewall-icon.png';
// import pwc from './assets/Untitled design (15).png';

const ToolsScroller = () => {
    const tools = [
        // { image: tool1, name: "Tool 1" },
        // { image: tool2, name: "Tool 2" },
        // { image: tool3, name: "Tool 3" },
        // { image: tool4, name: "Tool 4" },
        // { image: tool5, name: "Tool 5" },
        // { image: tool6, name: "Tool 6" },
        // { image: tool7, name: "Tool 7" },
        { image: unnamed, name: "Tool 8", glowColor: "#4285F4" },
        { image: hash, name: "Hash", glowColor: "#7C3AED" },
        { image: opensearch, name: "OpenSearch", glowColor: "#005EB8" },
        { image: sentinel, name: "Sentinel", glowColor: "#0078D4" },
        { image: images_jpg, name: "Tool 12", glowColor: "#3B82F6" },
        { image: virustotal, name: "VirusTotal", glowColor: "#1A56F0" },
        { image: opencti, name: "OpenCTI", glowColor: "#EF4444" },
        { image: mitre, name: "MITRE", glowColor: "#005B94" },
        { image: id8625, name: "Tool 16", glowColor: "#10B981" },
        { image: suricata, name: "Suricata", glowColor: "#EFBF00" },
        { image: images_png, name: "Tool 19", glowColor: "#6366F1" },
        { image: yara, name: "YARA", glowColor: "#F59E0B" },
        { image: images_1_png, name: "Tool 21", glowColor: "#EC4899" },
        { image: images_1_jpg, name: "Tool 22", glowColor: "#8B5CF6" },
        { image: burp, name: "Burp Suite", glowColor: "#FF6633" },
        { image: images_2_png, name: "Tool 24", glowColor: "#3B82F6" },
        { image: images_4_png, name: "Tool 25", glowColor: "#06B6D4" },
        { image: aws, name: "AWS", glowColor: "#FF9900" },
        { image: azure, name: "Azure", glowColor: "#0089D6" },
        { image: terraform, name: "Terraform", glowColor: "#7B42BC" },
        { image: images_2_jpg, name: "Tool 29", glowColor: "#F43F5E" },
        { image: kubernetes, name: "Kubernetes", glowColor: "#326CE5" },
        { image: openai, name: "OpenAI", glowColor: "#10A37F" },
        { image: wazuh, name: "Wazuh", glowColor: "#00A9E0" },
        { image: misp, name: "MISP", glowColor: "#D0021B" },
        { image: kali, name: "Kali Linux", glowColor: "#5579ED" },
        { image: atomic, name: "Atomic Red Team", glowColor: "#CF202E" },
        // { image: pwc, name: "PwC", glowColor: "#e0301e" },
    ];

    return (
        <section className="py-12 md:py-20 bg-background overflow-hidden font-sans transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-[50px] font-semibold tracking-tight mb-4 uppercase bg-linear-to-r from-primary via-foreground to-primary bg-clip-text text-transparent"
                    >
                        TOOLS & FRAMEWORKS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-muted-foreground text-lg font-medium max-w-3xl mx-auto"
                    >
                        Powered by industry-standard tools and cutting-edge technologies to deliver the most realistic training environments.
                    </motion.p>
                </div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative w-full overflow-hidden py-8 md:py-10">
                <div className="scroll-container">
                    {/* First set of logos */}
                    <div className="scroll-content">
                        {tools.map((tool, i) => (
                            <div
                                key={`original-${i}`}
                                className="tool-card group"
                                style={{ '--glow-color': tool.glowColor }}
                            >
                                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                    <div
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl"
                                        style={{ backgroundColor: tool.glowColor }}
                                    />
                                    <Image
                                        src={tool.image}
                                        alt={tool.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain  transition-all duration-300 group-hover:scale-110 relative z-10"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="scroll-content" aria-hidden="true">
                        {tools.map((tool, i) => (
                            <div
                                key={`duplicate-${i}`}
                                className="tool-card group"
                                style={{ '--glow-color': tool.glowColor }}
                            >
                                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                    <div
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl"
                                        style={{ backgroundColor: tool.glowColor }}
                                    />
                                    <Image
                                        src={tool.image}
                                        alt={tool.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 relative z-10"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient overlays */}
                <div className="absolute top-0 bottom-0 left-0 w-32 md:w-40 bg-linear-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-32 md:w-40 bg-linear-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />
            </div>

            <style jsx>{`
                .scroll-container {
                    display: flex;
                    width: max-content;
                    animation: scroll 60s linear infinite;
                    will-change: transform;
                }

                .scroll-container:hover {
                    animation-play-state: paused;
                }

                .scroll-content {
                    display: flex;
                    gap: 1.5rem;
                }

                @media (min-width: 768px) {
                    .scroll-content {
                        gap: 2.5rem;
                    }
                }

                .tool-card {
                    flex-shrink: 0;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    background: linear-gradient(135deg, var(--card) 0%, var(--card-foreground)/5 100%);
                    border: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 140px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }

                @media (min-width: 768px) {
                    .tool-card {
                        padding: 2rem;
                        border-radius: 1.5rem;
                        min-width: 190px;
                    }
                }

                .tool-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--glow-color);
                    box-shadow: 0 10px 40px -10px var(--glow-color);
                    background: linear-gradient(135deg, var(--card) 0%, var(--glow-color) 400%);
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                /* Smooth hardware acceleration */
                .scroll-container,
                .tool-card,
                .tool-card img {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default ToolsScroller;