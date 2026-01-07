'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Import images from the people folder
import img1 from './assets/people/0c0c6eff176f94e2b6434557d4851c28698038ba.png';
import img2 from './assets/people/16fb0a80f4751303be175bc69571e4e113a0f378.png';
import img3 from './assets/people/2a81a256468c886be234e6b47b89f495d49d57c0.png';
import img4 from './assets/people/2e065837623aca3bbab7d78e0db99ce0f08fb5e6.png';
import img5 from './assets/people/3eb722ada9706815c52e177b990093ffb3652ba5.png';
import img6 from './assets/people/4de258ab9e2fd76e0f938c041dc76be769934fd8.png';
import img7 from './assets/people/61653c3deb47eccb79fb4ec492d6a80c9981534b.png';
import img8 from './assets/people/780dde118751a786c91a2380f6549d8bc2e8fef4.png';
import img9 from './assets/people/84f873944daa4d26e2da8e280524852537a9dc21.png';
import img10 from './assets/people/8af80c194e23f9f7c0141316a23021c213f44671.png';
import img11 from './assets/people/97d80a247fb5ac7e5ae5563d107fb3a21a9fda2c.png';
import img12 from './assets/people/be232e00d0aea743f44c4cdaac3bb50f32c7e3e3.png';
import img13 from './assets/people/c4cf36b1b38bee63f79d4693f4205b6b099090dd.png';
import img14 from './assets/people/d858286ce4a38f3b78afeeb454a520f6219a326f.png';
import img15 from './assets/people/e2d039e86864d4a8bdfd1b5df26b5280dd803f93.png';
import img16 from './assets/people/e9916a167953d9bc0368deb59106fbf8db9fbe11.png';

// Import brand logos
import brand1 from './assets/Brands/00332f7b3d4f8d27700575f0b61b217cea9d9717.png';
import brand2 from './assets/Brands/0b1e2b23dbd8276e3eb1560a57f1084f9f513d4e.png';
import brand3 from './assets/Brands/71a717e11aabee6d9f3369399039d7d15e636ceb.png';
import brand4 from './assets/Brands/7e39a76fc89754001e93cc38a4de07d8c29135c0.png';
import brand5 from './assets/Brands/83470d2a3495d0a8b2dbf74d52eb4fd7b488bf4b.png';
import brand6 from './assets/Brands/8508cef27a45f68eb0d26e12e4f09f3471f7b902.png';
import brand7 from './assets/Brands/984b561fa1af52365d5f382f9c5a2d5fd0cb6069.png';
import brand8 from './assets/Brands/ae045a0d9ddf389f291d256483fab25e184c5a2e.png';
import brand9 from './assets/Brands/b5083774b6690c1b65eee321c218a6645b1556eb.png';
import brand10 from './assets/Brands/b6158405f31cc46cf45f92e859c300c040ff71c9.png';
import brand11 from './assets/Brands/ccec915961367d712558bef60cd354b110bab83f.png';


const students = [
    { name: 'Shubham Kumar', role: 'Cyber Security', companyLogo: brand1, image: img1 },
    { name: 'Riya Singh', role: 'Cyber Security', companyLogo: brand2, image: img2 },
    { name: 'Amit Sharma', role: 'Cyber Security', companyLogo: brand3, image: img3 },
    { name: 'Priya Patel', role: 'Cyber Security', companyLogo: brand4, image: img4 },
    { name: 'Rahul Verma', role: 'Cyber Security', companyLogo: brand5, image: img5 },
    { name: 'Neha Gupta', role: 'Cyber Security', companyLogo: brand6, image: img6 },
    { name: 'Vikram Malhotra', role: 'Cyber Security', companyLogo: brand7, image: img7 },
    { name: 'Anjali Das', role: 'Cyber Security', companyLogo: brand8, image: img8 },
    { name: 'Arjun Reddy', role: 'Cyber Security', companyLogo: brand9, image: img9 },
    { name: 'Sneha Kapoor', role: 'Cyber Security', companyLogo: brand10, image: img10 },
    { name: 'Rajesh Iyer', role: 'Cyber Security', companyLogo: brand11, image: img11 },
    { name: 'Pooja Joshi', role: 'Cyber Security', companyLogo: brand1, image: img12 }, // Reusing logos as we have only 11 brands but 16 students
    { name: 'Manish Tiwari', role: 'Cyber Security', companyLogo: brand2, image: img13 },
    { name: 'Kavita Mehra', role: 'Cyber Security', companyLogo: brand3, image: img14 },
    { name: 'Sanjay Dutt', role: 'Cyber Security', companyLogo: brand4, image: img15 },
    { name: 'Meera Nair', role: 'Cyber Security', companyLogo: brand5, image: img16 },
];

export default function Placement() {
    return (
        <section className="w-full py-20 bg-[#FBF9FF] font-sans overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-5 h-5 bg-[#7B2CFF] rounded-[4px] shadow-sm"></div>
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">SUCCESS STORIES</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
                        Our Recent Placement Stories
                    </h2>
                </div>

                {/* Grid Container - Responsive for all sizes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 mb-16">
                    {students.map((student, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05, duration: 0.4 }}
                            className="flex flex-col items-center justify-between p-3 rounded-2xl border border-[#7B2CFF] hover:border-purple-300 shadow-sm hover:shadow-md transition-all h-[180px] bg-white group"
                        >
                            {/* Profile Image */}
                            {/* Profile Image */}
                            <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2 border-2 group-hover:border-purple-200 transition-colors">
                                <Image
                                    src={student.image}
                                    alt={student.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Info */}
                            {/* Info */}
                            <div className="text-center mb-2">
                                <h3 className="text-[11px] font-bold text-[#1a1a2e] leading-tight mb-0.5">{student.name}</h3>
                                <p className="text-[9px] text-gray-400 font-medium">{student.role}</p>
                            </div>

                            {/* Company Logo Area  */}
                            <div className="mt-auto pt-1.5 border-t border-gray-50 w-full flex justify-center items-center h-8 relative">
                                <div className="relative w-20 h-6">
                                    <Image
                                        src={student.companyLogo}
                                        alt="Company Logo"
                                        fill
                                        className="object-contain" // Use contain to show the full logo cleanly
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <button className="flex items-center gap-3 bg-[#26103A] text-white pl-8 pr-2 py-3 rounded-full font-bold hover:bg-[#7B3FE4] transition-all duration-300 hover:shadow-xl active:scale-95 group">
                        View All
                        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#26103A] group-hover:scale-110 transition-transform">
                            <ArrowRight size={16} />
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
}
