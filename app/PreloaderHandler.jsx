"use client";

export default function PreloaderHandler({ children }) {
    // Preloader disabled for fast first paint; wrapper kept for future use
    return <div className="relative min-h-screen">{children}</div>;
}
