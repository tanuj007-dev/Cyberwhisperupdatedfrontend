import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Default loading skeleton component
 */
const DefaultLoader = ({ height = '400px' }) => (
  <div 
    className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse"
    style={{ height }}
  />
);

/**
 * Create a lazy loaded component with better defaults
 * @param {Function} importFunc - Dynamic import function
 * @param {Object} options - Configuration options
 * @returns {React.Component} Lazy loaded component
 */
export function createLazyComponent(importFunc, options = {}) {
  const {
    ssr = true,
    loading = DefaultLoader,
    loadingHeight = '400px',
    fallback = null,
  } = options;

  return dynamic(importFunc, {
    ssr,
    loading: loading 
      ? () => <loading height={loadingHeight} />
      : undefined,
  });
}

/**
 * Batch lazy load multiple components
 * @param {Object} imports - Object with component names as keys and import functions as values
 * @param {Object} options - Global options for all components
 * @returns {Object} Object with lazy loaded components
 */
export function lazyLoadComponents(imports, options = {}) {
  const components = {};
  
  for (const [name, importFunc] of Object.entries(imports)) {
    components[name] = createLazyComponent(importFunc, options);
  }
  
  return components;
}

/**
 * Utility to lazy load components when they come into view
 */
export function useVisibleComponent(ref, importFunc, options = {}) {
  const [Component, setComponent] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  React.useEffect(() => {
    if (isVisible) {
      importFunc().then((module) => {
        setComponent(() => module.default || module);
      });
    }
  }, [isVisible, importFunc]);

  return Component;
}

/**
 * Export common loading skeletons
 */
export const LoadingSkeletons = {
  text: ({ width = 'w-full', height = 'h-4' }) => (
    <div className={`${width} ${height} bg-gray-800 rounded animate-pulse`} />
  ),
  
  card: ({ width = 'w-full', height = 'h-64' }) => (
    <div className={`${width} ${height} bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg animate-pulse`} />
  ),
  
  circular: ({ size = 'w-12 h-12' }) => (
    <div className={`${size} bg-gray-800 rounded-full animate-pulse`} />
  ),
  
  section: ({ height = 'h-96' }) => (
    <div className={`w-full ${height} bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse`} />
  ),
  
  grid: ({ cols = 3, count = 6 }) => (
    <div className={`grid grid-cols-${cols} gap-4 w-full`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-64 bg-gray-800 rounded-lg animate-pulse" />
      ))}
    </div>
  ),
};
