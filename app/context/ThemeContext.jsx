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
        try {
            // Sync with the script in head: read same source so we don't overwrite with wrong theme
            let savedTheme = null;
            try {
                savedTheme = localStorage.getItem("theme");
            } catch (e) {
                console.error("ThemeContext: Error reading localStorage", e);
            }

            let systemDark = false;
            if (typeof window !== "undefined" && window.matchMedia) {
                systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            }

            const resolved = savedTheme || (systemDark ? "dark" : "light");
            setTheme(resolved);
            setMounted(true);

            if (typeof window !== "undefined" && window.matchMedia) {
                const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                const handleChange = (e) => {
                    if (typeof localStorage !== "undefined") {
                        try {
                            if (!localStorage.getItem("theme")) {
                                setTheme(e.matches ? "dark" : "light");
                            }
                        } catch (err) {
                            setTheme(e.matches ? "dark" : "light");
                        }
                    }
                };

                if (mediaQuery.addEventListener) {
                    mediaQuery.addEventListener("change", handleChange);
                    return () => mediaQuery.removeEventListener("change", handleChange);
                } else if (mediaQuery.addListener) {
                    mediaQuery.addListener(handleChange);
                    return () => mediaQuery.removeListener(handleChange);
                }
            }
        } catch (globalError) {
            console.error("ThemeContext: Fatal error in initialization", globalError);
            setMounted(true); // Still marks as mounted to avoid blocking render
        }
    }, []);

    useEffect(() => {
        if (!mounted || typeof window === "undefined") return;

        try {
            const root = window.document.documentElement;
            const current = root.classList.contains("dark") ? "dark" : "light";
            // Only update DOM if different to avoid flash (script already set it on first paint)
            if (current !== theme) {
                root.classList.remove("light", "dark");
                root.classList.add(theme);
            }
            localStorage.setItem("theme", theme);
        } catch (e) {
            console.error("ThemeContext: Error syncing theme", e);
        }
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
