"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const GalleryThemeContext = createContext();

export const useGalleryTheme = () => useContext(GalleryThemeContext);

export default function GalleryThemeWrapper({ children }) {
    // Default to dark mode as per original design
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    if (!mounted) {
        return <div className="min-h-screen bg-[#030014]" />;
    }

    return (
        <GalleryThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-300`}>
                <div className="bg-white dark:bg-[#030014] min-h-screen transition-colors duration-300 relative">
                    {/* Theme Toggle Button */}
                    <div className="fixed top-24 right-6 z-50">
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg text-gray-800 dark:text-white transition-all hover:scale-110 active:scale-95"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </GalleryThemeContext.Provider>
    );
}
