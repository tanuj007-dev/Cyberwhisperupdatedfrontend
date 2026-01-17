"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const GalleryThemeContext = createContext();

export const useGalleryTheme = () => useContext(GalleryThemeContext);

export default function GalleryThemeWrapper({ children }) {
    // Use global theme context
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-[#1B0D37]" />;
    }

    return (
        <GalleryThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className={`transition-colors duration-300`}>
                <div className="bg-white dark:bg-background min-h-screen transition-colors duration-300 relative">
                    {/* Theme Toggle Button */}
                    {/* Theme Toggle Button Removed */}
                    {children}
                </div>
            </div>
        </GalleryThemeContext.Provider>
    );
}
