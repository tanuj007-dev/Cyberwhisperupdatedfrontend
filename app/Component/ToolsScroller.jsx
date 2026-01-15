"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import assets
import tool1 from './assets/1.webp';
import tool2 from './assets/2.webp';
import tool3 from './assets/3.webp';
import tool4 from './assets/4.webp';
import tool5 from './assets/5.webp';
import tool6 from './assets/6.webp';
import tool7 from './assets/7.webp';
import unnamed from './assets/2249-unnamed.pngS.webp';
import hash from './assets/5461df8fd2fe783981b0180332821184b729980e.webp';
import opensearch from './assets/opensearch-logo-png_seeklogo-406743.webp';
import sentinel from './assets/Microsoft-Sentinel-1.webp';
import images_jpg from './assets/images.jpg.webp';
import virustotal from './assets/Virustotal_logo_pixelalign.webp';
import opencti from './assets/OpenCTI.webp';
import mitre from './assets/5bfdce88cd3820f7c5c21e02_mitre.webp';
import id8625 from './assets/86256065.webp';
import suricata from './assets/Suricata_logo_600x600-1.webp';
import logo_webp from './assets/logo.webp';
import images_png from './assets/images.png.webp';
import yara from './assets/Yara_logo.svg.webp';
import images_1_png from './assets/images (1).png.webp';
import images_1_jpg from './assets/images (1).jpg.webp';
import burp from './assets/burp_suite_proxies_e6501bcb84.webp';
import images_2_png from './assets/images (2).png.webp';
import images_4_png from './assets/images (4).webp';
import aws from './assets/kisspng-amazon-web-services-logo-cloud-computing-amazon-co-logoaws-1-itnext-summit-1713897597915.webp';
import azure from './assets/Microsoft-Azure-Logo.webp';
import terraform from './assets/terraform-icon-tew8r4clf5ocvoyj0o05j.webp';
import images_2_jpg from './assets/images (2).jpg.webp';
import kubernetes from './assets/png-clipart-white-and-blue-ship-wheel-illustration-kubernetes-logo-icons-logos-emojis-tech-companies.webp';

const ToolsScroller = () => {
    const tools = [
        { image: tool1, name: "Tool 1" },
        { image: tool2, name: "Tool 2" },
        { image: tool3, name: "Tool 3" },
        { image: tool4, name: "Tool 4" },
        { image: tool5, name: "Tool 5" },
        { image: tool6, name: "Tool 6" },
        { image: tool7, name: "Tool 7" },
        { image: unnamed, name: "Tool 8" },
        { image: hash, name: "Hash" },
        { image: opensearch, name: "OpenSearch" },
        { image: sentinel, name: "Sentinel" },
        { image: images_jpg, name: "Tool 12" },
        { image: virustotal, name: "VirusTotal" },
        { image: opencti, name: "OpenCTI" },
        { image: mitre, name: "MITRE" },
        { image: id8625, name: "Tool 16" },
        { image: suricata, name: "Suricata" },
        { image: logo_webp, name: "Logo" },
        { image: images_png, name: "Tool 19" },
        { image: yara, name: "YARA" },
        { image: images_1_png, name: "Tool 21" },
        { image: images_1_jpg, name: "Tool 22" },
        { image: burp, name: "Burp Suite" },
        { image: images_2_png, name: "Tool 24" },
        { image: images_4_png, name: "Tool 25" },
        { image: aws, name: "AWS" },
        { image: azure, name: "Azure" },
        { image: terraform, name: "Terraform" },
        { image: images_2_jpg, name: "Tool 29" },
        { image: kubernetes, name: "Kubernetes" }
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
                            >
                                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                                    <Image
                                        src={tool.image}
                                        alt={tool.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain md:grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110 relative z-10"
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
                            >
                                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                                    <Image
                                        src={tool.image}
                                        alt={tool.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain md:grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110 relative z-10"
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
                    border-color: var(--primary);
                    box-shadow: 0 10px 30px -10px var(--primary);
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