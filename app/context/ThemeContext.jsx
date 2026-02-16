"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Sync with the script in head: read same source so we don't overwrite with wrong theme
        const savedTheme = localStorage.getItem("theme");
        const resolved = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setTheme(resolved);
        setMounted(true);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        const current = root.classList.contains("dark") ? "dark" : "light";
        // Only update DOM if different to avoid flash (script already set it on first paint)
        if (current !== theme) {
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
};
