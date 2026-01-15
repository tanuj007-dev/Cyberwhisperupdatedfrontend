"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Sun, Moon } from 'lucide-react'; // Removed unused imports

const AboutThemeContext = createContext();

export const useAboutTheme = () => useContext(AboutThemeContext);

export default function AboutThemeWrapper({ children }) {
    // Determine theme from global context or parent class logic
    // actually, since the header toggle places 'dark' class on <html>, 
    // we don't strictly need to do anything here for children to see 'dark:'.
    // However, this wrapper provides specific background colors.

    return (
        <div className="transition-colors duration-300">
            <div className="bg-white dark:bg-[#0E0429] min-h-screen transition-colors duration-300 relative">
                {children}
            </div>
        </div>
    );
}
