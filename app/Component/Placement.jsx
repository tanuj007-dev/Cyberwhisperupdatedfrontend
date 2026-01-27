'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gridImage from './assets/grid.webp';

// Import images from the people folder
import img1 from './assets/people/0c0c6eff176f94e2b6434557d4851c28698038ba.webp';
import img2 from './assets/people/16fb0a80f4751303be175bc69571e4e113a0f378.webp';
import img3 from './assets/people/2a81a256468c886be234e6b47b89f495d49d57c0.webp';
import img4 from './assets/people/2e065837623aca3bbab7d78e0db99ce0f08fb5e6.webp';
import img5 from './assets/people/3eb722ada9706815c52e177b990093ffb3652ba5.webp';
import img6 from './assets/people/4de258ab9e2fd76e0f938c041dc76be769934fd8.webp';
import img7 from './assets/people/61653c3deb47eccb79fb4ec492d6a80c9981534b.webp';
import img8 from './assets/people/780dde118751a786c91a2380f6549d8bc2e8fef4.webp';
import img9 from './assets/people/84f873944daa4d26e2da8e280524852537a9dc21.webp';
import img10 from './assets/people/8af80c194e23f9f7c0141316a23021c213f44671.webp';
import img11 from './assets/people/97d80a247fb5ac7e5ae5563d107fb3a21a9fda2c.webp';
import img12 from './assets/people/be232e00d0aea743f44c4cdaac3bb50f32c7e3e3.webp';
import img13 from './assets/people/c4cf36b1b38bee63f79d4693f4205b6b099090dd.webp';
import img14 from './assets/people/d858286ce4a38f3b78afeeb454a520f6219a326f.webp';
import img15 from './assets/people/e2d039e86864d4a8bdfd1b5df26b5280dd803f93.webp';
import img16 from './assets/people/e9916a167953d9bc0368deb59106fbf8db9fbe11.webp';

// Import brand logos
import brand1 from './assets/Brands/00332f7b3d4f8d27700575f0b61b217cea9d9717.webp';
import brand2 from './assets/Brands/0b1e2b23dbd8276e3eb1560a57f1084f9f513d4e.webp';
import brand3 from './assets/Brands/71a717e11aabee6d9f3369399039d7d15e636ceb.webp';
import brand4 from './assets/Brands/7e39a76fc89754001e93cc38a4de07d8c29135c0.webp';
import brand5 from './assets/Brands/83470d2a3495d0a8b2dbf74d52eb4fd7b488bf4b.webp';
import brand6 from './assets/Brands/8508cef27a45f68eb0d26e12e4f09f3471f7b902.webp';
import brand7 from './assets/Brands/984b561fa1af52365d5f382f9c5a2d5fd0cb6069.webp';
import brand8 from './assets/Brands/ae045a0d9ddf389f291d256483fab25e184c5a2e.webp';
import brand9 from './assets/Brands/b5083774b6690c1b65eee321c218a6645b1556eb.webp';
import brand10 from './assets/Brands/b6158405f31cc46cf45f92e859c300c040ff71c9.webp';
import brand11 from './assets/Brands/ccec915961367d712558bef60cd354b110bab83f.webp';


const students = [
    { name: 'Riya Singh', role: 'Cyber Security', companyLogo: brand1, image: img1 },
    { name: 'Rahul Verma', role: 'Cyber Security', companyLogo: brand2, image: img2 },
    { name: 'Amit Sharma', role: 'Cyber Security', companyLogo: brand3, image: img3 },
    { name: 'Ravi Kumar', role: 'Cyber Security', companyLogo: brand4, image: img4 },
    { name: 'Radhika Verma', role: 'Cyber Security', companyLogo: brand5, image: img5 },
    { name: 'Neha Gupta', role: 'Cyber Security', companyLogo: brand6, image: img6 },
    { name: 'Vikram Malhotra', role: 'Cyber Security', companyLogo: brand7, image: img7 },
    { name: 'Arjun Reddy', role: 'Cyber Security', companyLogo: brand8, image: img8 },
    { name: 'Neha Reddy', role: 'Cyber Security', companyLogo: brand9, image: img9 },
    { name: 'Aman Kapoor', role: 'Cyber Security', companyLogo: brand10, image: img10 },
    { name: 'Rajesh Iyer', role: 'Cyber Security', companyLogo: brand11, image: img11 },
    { name: 'Keshav Joshi', role: 'Cyber Security', companyLogo: brand1, image: img12 }, // Reusing logos as we have only 11 brands but 16 students
    { name: 'Manish Tiwari', role: 'Cyber Security', companyLogo: brand2, image: img13 },
    { name: 'Deepak Mehra', role: 'Cyber Security', companyLogo: brand3, image: img14 },
    { name: 'Sanjay Dutt', role: 'Cyber Security', companyLogo: brand4, image: img15 },
    { name: 'Chetan Nair', role: 'Cyber Security', companyLogo: brand5, image: img16 },
];

export default function Placement() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-gray-50 dark:bg-black font-sans overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 bg-[#6b46e5] shadow-[0_0_15px_rgba(107,70,229,0.5)]"></div>
                        <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-[0.2em]">
                            Success Stories
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-700 to-purple-900 dark:from-white dark:via-purple-200 dark:to-purple-400 leading-tight pb-2">
                        Our Recent Placement Stories
                    </h2>

                    <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Join the league of successful professionals who have transformed their careers with our industry-leading cybersecurity training.
                    </p>
                </div>

                {/* Carousel Container */}
                <Carousel students={students} />
            </div>
        </section>
    );
}

// Internal Carousel Component to handle state
function Carousel({ students }) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
    const autoPlayRef = React.useRef(null);
    const [direction, setDirection] = React.useState(0); // -1 for prev, 1 for next

    const nextSlide = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % students.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + students.length) % students.length);
    };

    React.useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(nextSlide, 3000);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlaying, students.length]);

    // Format for 3 card view: previous, current, next
    const getVisibleIndices = () => {
        const prev = (activeIndex - 1 + students.length) % students.length;
        const next = (activeIndex + 1) % students.length;
        return [prev, activeIndex, next];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <div
            className="flex flex-col items-center justify-center w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="relative w-full max-w-7xl h-[480px] flex items-center justify-center overflow-visible">
                {/* 
                  Using Layout Group or AnimatePresence for smooth transitions.
                  We render the 3 cards in valid positions.
                */}
                <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-10 w-full perspective-1000">

                    {/* Previous Card */}
                    <div className="hidden md:block flex-1 max-w-[320px] transition-all duration-500 ease-in-out transform scale-90 opacity-100 z-0">
                        <StudentCard student={students[(activeIndex - 1 + students.length) % students.length]} isActive={false} />
                    </div>

                    {/* Active Card */}
                    <div className="w-full max-w-[360px] md:max-w-[400px] z-20 scale-100 transition-all duration-500 ease-in-out">
                        <StudentCard student={students[activeIndex]} isActive={true} />
                    </div>

                    {/* Next Card */}
                    <div className="hidden md:block flex-1 max-w-[320px] transition-all duration-500 ease-in-out transform scale-90 opacity-100 z-0">
                        <StudentCard student={students[(activeIndex + 1) % students.length]} isActive={false} />
                    </div>

                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 transition-all duration-300"
                >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 transition-all duration-300"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-6">
                {students.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                            ? 'w-6 bg-purple-600'
                            : 'bg-gray-300 dark:bg-gray-700 hover:bg-purple-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

function StudentCard({ student, isActive }) {
    return (
        <div className={`
            relative flex flex-col items-center text-center rounded-[2rem] p-8 transition-all duration-500 min-h-[440px] border
            ${isActive
                ? 'bg-gradient-to-b from-[#854CE6] to-[#6b35c5] text-white shadow-[0_20px_50px_rgba(133,76,230,0.4)] scale-105 border-transparent z-10'
                : 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-100 dark:border-white/10 shadow-xl opacity-90 hover:opacity-100'
            }
        `}>
            {/* Cyber Grid Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[2rem] overflow-hidden">
                <Image src={gridImage} alt="Grid" fill className="object-cover" />
            </div>

            {/* Glowing noise texture overlay */}
            {isActive && (
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            )}

            {/* Profile Image */}
            <div className={`mb-6 relative transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
                <div className={`
                    w-32 h-32 rounded-full p-1.5 shadow-lg
                    ${isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-100 dark:bg-zinc-800'}
                 `}>
                    <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white dark:border-zinc-800">
                        <Image src={student.image} alt={student.name} fill className="object-cover" />
                    </div>
                </div>
                {/* Status Indicator */}
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
            </div>

            {/* Name */}
            <h3 className={`text-2xl font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {student.name}
            </h3>

            {/* Role */}
            <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-8 ${isActive ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'}`}>
                {student.role}
            </p>

            {/* Highlight/Score Section */}
            <div className={`mt-auto w-full flex flex-col items-center gap-3`}>
                <span className={`text-[10px] uppercase font-bold tracking-wider opacity-80 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    Placed At
                </span>

                <div className={`
                    relative w-48 h-20 flex items-center justify-center p-4 rounded-2xl
                    ${isActive ? 'bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]' : 'bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10'}
                `}>
                    <Image
                        src={student.companyLogo}
                        alt="Company"
                        className={`object-contain max-w-full max-h-full transition-all duration-300 ${isActive ? 'grayscale-0' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}
                        width={140}
                        height={60}
                    />
                </div>
            </div>

            {/* Quote */}
            <div className={`mt-6 text-sm italic leading-relaxed px-4 ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                "Cyber Whisper transformed my career with real-world skills."
            </div>
        </div>
    );
}
