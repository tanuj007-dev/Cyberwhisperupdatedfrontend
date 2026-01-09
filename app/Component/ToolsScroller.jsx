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
        { image: tool1 },
        { image: tool2 },
        { image: tool3 },
        { image: tool4 },
        { image: tool5 },
        { image: tool6 },
        { image: tool7 },
        { image: unnamed },
        { image: hash },
        { image: opensearch },
        { image: sentinel },
        { image: images_jpg },
        { image: virustotal },
        { image: opencti },
        { image: mitre },
        { image: id8625 },
        { image: suricata },
        { image: logo_webp },
        { image: images_png },
        { image: yara },
        { image: images_1_png },
        { image: images_1_jpg },
        { image: burp },
        { image: images_2_png },
        { image: images_4_png },
        { image: aws },
        { image: azure },
        { image: terraform },
        { image: images_2_jpg },
        { image: kubernetes }
    ];

    // Double the array for seamless looping
    const scrollingTools = [...tools, ...tools, ...tools];

    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden font-sans">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-[50px] text-black font-semibold   tracking-tight mb-4 uppercase">
                        TOOLS & FRAMEWORKS
                    </h2>
                    <p className="text-slate-500 text-lg    font-medium max-w-3xl mx-auto">
                        Powered by industry-standard tools and cutting-edge technologies to deliver the most realistic training environments.
                    </p>
                </div>
            </div>

            <div className="relative flex overflow-hidden py-6">
                <motion.div
                    animate={{
                        x: ["0%", "-33.33%"]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 100,
                            ease: "linear",
                        }
                    }}
                    className="flex gap-4 md:gap-8 whitespace-nowrap"
                >
                    {scrollingTools.map((tool, i) => (
                        <div
                            key={i}
                            className="flex-none p-6 md:p-8 rounded-3xl md:rounded-4xl bg-white shadow-lg border border-slate-100 flex flex-col items-center justify-center min-w-[160px] md:min-w-[240px] group transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10"
                        >
                            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <Image
                                    src={tool.image}
                                    alt="Cyber Tool"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                        </div>
                    ))}
                </motion.div>

                {/* Left/Right Overlays for smooth fade */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
};

export default ToolsScroller;