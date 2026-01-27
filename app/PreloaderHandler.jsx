"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

// Lazy load AnimatePresence to reduce initial bundle
const AnimatePresence = dynamic(() =>
    import('framer-motion').then(mod => ({ default: mod.AnimatePresence })),
    { ssr: false }
);

// Lazy load StairsPreloader
const StairsPreloader = dynamic(() => import("./Component/StairsPreloader"), {
    ssr: false,
});

export default function PreloaderHandler({ children }) {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)
    const [isFullyEntered, setIsFullyEntered] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile on client side
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = window.matchMedia("(max-width: 768px)").matches
            setIsMobile(isMobileDevice)

            // If mobile, skip preloader
            if (isMobileDevice) {
                setIsLoading(false)
                setIsFullyEntered(true)
            }
        }

        checkMobile()

        const mediaQuery = window.matchMedia("(max-width: 768px)")
        mediaQuery.addEventListener("change", checkMobile)

        return () => mediaQuery.removeEventListener("change", checkMobile)
    }, [])

    /*
    useEffect(() => {
        // Skip preloader effect if mobile
        if (isMobile) return

        // Reset states when route changes
        setIsLoading(true)
        setIsFullyEntered(false)

        // Use requestAnimationFrame for better performance
        const animationFrameId = requestAnimationFrame(() => {
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 1500) // Reduced from 2000ms

            // Give extra time for the stairs to fully clear before allowing scroll
            const scrollTimer = setTimeout(() => {
                setIsFullyEntered(true)
            }, 2500) // Reduced from 3000ms

            return () => {
                clearTimeout(timer)
                clearTimeout(scrollTimer)
            }
        })

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [pathname, isMobile])
    */

    return (
        <>
            {!isMobile && (
                <AnimatePresence mode="wait">
                    {isLoading && <StairsPreloader key="preloader" />}
                </AnimatePresence>
            )}
            <div className={`${!isFullyEntered && !isMobile ? 'h-screen overflow-hidden' : 'relative min-h-screen'}`}>
                {children}
            </div>
        </>
    )
}
