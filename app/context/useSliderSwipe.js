'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 };

/** Mobile: 1 card. Tablet and desktop: 3 cards. */
export function useVisibleCount() {
    const [visibleCount, setVisibleCount] = useState(1);
    useEffect(() => {
        const update = () => {
            const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
            if (w < BREAKPOINTS.md) setVisibleCount(1);
            else setVisibleCount(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return visibleCount;
}

export function useSliderSwipe(slideIndex, totalSlides, goPrev, goNext) {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const SWIPE_THRESHOLD = 50;

    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback((e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - touchStartX.current;
        const deltaY = endY - touchStartY.current;
        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
        if (Math.abs(deltaX) < Math.abs(deltaY)) return;
        if (deltaX > 0) goPrev();
        else goNext();
    }, [goPrev, goNext]);

    return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd };
}

export function getCardWidthStyle(totalSlides, visibleCount) {
    const gapRem = (visibleCount - 1) * 2;
    return {
        width: `calc((100% / ${totalSlides} - ${gapRem}rem) / ${visibleCount})`,
    };
}
