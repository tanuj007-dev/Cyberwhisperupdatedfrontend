"use client";
import React, { createContext, useContext, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const B2BThemeContext = createContext();

export const useB2BTheme = () => useContext(B2BThemeContext);

export default function B2BThemeWrapper({ children }) {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <B2BThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-300`}>
                <div className="bg-white dark:bg-[#150833] min-h-screen transition-colors duration-300">
                    {/* Theme Toggle Button - Floating */}

                    {children}
                </div>
            </div>
        </B2BThemeContext.Provider>
    );
}
