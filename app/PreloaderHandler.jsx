"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import StairsPreloader from "./Component/StairsPreloader"

export default function PreloaderHandler({ children }) {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)
    const [isFullyEntered, setIsFullyEntered] = useState(false)

    useEffect(() => {
        // Reset states when route changes
        setIsLoading(true)
        setIsFullyEntered(false)

        // Simple timer to start the exit animation
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        // Give extra time for the stairs to fully clear before allowing scroll
        const scrollTimer = setTimeout(() => {
            setIsFullyEntered(true)
        }, 3000)

        return () => {
            clearTimeout(timer)
            clearTimeout(scrollTimer)
        }
    }, [pathname])

    return (
        <>
            <AnimatePresence>
                {isLoading && <StairsPreloader key="preloader" />}
            </AnimatePresence>
            <div className={`${!isFullyEntered ? 'h-screen overflow-hidden' : 'relative min-h-screen'}`}>
                {children}
            </div>
        </>
    )
}
