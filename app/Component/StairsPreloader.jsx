"use client"
import React from 'react'
import { motion } from 'framer-motion'
import logo from './assets/logo.webp'
import Image from 'next/image'

const stairsAnimation = {
    initial: {
        top: "0%",
    },
    animate: (i) => ({
        top: "-100%",
        transition: {
            duration: 0.8,
            delay: 0.1 * i,
            ease: [0.65, 0, 0.35, 1],
        },
    }),
}

// const logoAnimation = {
//     initial: {
//         opacity: 0,
//         y: 20
//     },
//     animate: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.5,
//             delay: 0.2
//         }
//     },
//     exit: {
//         opacity: 0,
//         transition: {
//             duration: 0.4
//         }
//     }
// }

const Stairs = () => {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    variants={stairsAnimation}
                    initial="initial"
                    animate="animate"
                    custom={i}
                    className="h-screen w-full bg-white relative border-l border-gray-100"
                />
            ))}
        </>
    )
}

export default function StairsPreloader() {
    return (
        <div className="fixed inset-0 z-100 flex pointer-events-none overflow-hidden h-screen bg-transparent">
            {/* The Stairs overlay */}
            <div className="flex w-screen h-screen">
                <Stairs />
            </div>

            {/* Logo in the center */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-110 pointer-events-none">
                <motion.div
                    variants={logoAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative w-48 h-20 md:w-64 md:h-24"
                >
                    <Image
                        src={logo}
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </div> */}
        </div>
    )
}
