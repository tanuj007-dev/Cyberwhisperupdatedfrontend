'use client';
import Image from 'next/image';
import logo from './assets/logo.png'
import { useState } from 'react';
import Link from 'next/link';
import { useEnquiry } from '../context/EnquiryContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Training', href: '/training' },
    { name: 'Courses', href: '/courses' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent font-sans">

      <div className="w-full px-4 py-4">
        <div className="mx-auto max-w-7xl">
          {/* Centered white navbar container */}
          <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-white px-6 py-3 shadow-lg transition-shadow duration-300 hover:shadow-xl">

            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Link href="/">
                {/* Logo Image */}
                <Image
                  src={logo}
                  alt="Cyber Whisper Logo"
                  width={150}
                  height={150}
                  className="rounded-lg object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[16px] font-medium text-gray-700 transition-colors duration-200 hover:text-purple-600 focus:text-purple-600 focus:outline-none font-sans"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Get Quote Button */}
            <div className="hidden md:block">
              <button
                onClick={openEnquiry}
                className="rounded-full bg-[#310E3F] px-6 py-2 text-[16px] font-semibold text-white shadow-md transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-sans"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mx-auto mt-4 max-w-8xl animate-in slide-in-from-top-2 duration-300">
              <div className="rounded-2xl bg-white px-6 py-4 shadow-lg">
                <div className="flex flex-col space-y-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-[16px] font-medium text-gray-700 transition-colors duration-200 hover:text-purple-600 focus:text-purple-600 focus:outline-none font-sans"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        openEnquiry();
                      }}
                      className="w-full rounded-full bg-[#310E3F] px-6 py-3 text-[16px] font-semibold text-white shadow-md transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-sans"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}