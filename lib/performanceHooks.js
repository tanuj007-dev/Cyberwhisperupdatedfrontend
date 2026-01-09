import { memo, useMemo, useCallback } from 'react';

/**
 * Memoized component wrapper for preventing unnecessary re-renders
 */
export const withMemo = (Component, propsAreEqual = null) => {
  return memo(Component, propsAreEqual);
};

/**
 * Custom hook for memoizing expensive computations
 * Usage: const result = useMemoized(expensiveFunction, [dependency]);
 */
export const useMemoized = (factory, deps) => {
  return useMemo(() => factory(), deps);
};

/**
 * Custom hook for memoizing callbacks
 * Prevents callback from being recreated on every render
 */
export const useCallbackMemo = (callback, deps) => {
  return useCallback(callback, deps);
};

/**
 * Debounce hook for expensive operations
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Throttle hook for frequent events (scroll, resize)
 */
export function useThrottle(value, limit = 1000) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

/**
 * IntersectionObserver hook for lazy loading
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, defaultOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [defaultOptions, ref]);

  return isVisible;
}

/**
 * Performance monitoring hook
 */
export function usePerformanceMonitoring(componentName) {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
      }
    };
  }, [componentName]);
}

/**
 * Media query hook for responsive design
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
