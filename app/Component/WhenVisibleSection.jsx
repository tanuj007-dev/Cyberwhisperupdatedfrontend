"use client";

import { useState, useEffect, useRef } from "react";

// Map of section keys to import functions (client-only, so no serialization issue)
const SECTION_LOADERS = {
  CoreServicesOverview: () => import("./CoreServicesOverview"),
  LearningHub: () => import("./LearningHub"),
  WeServe: () => import("./who-we-serve"),
  EnterpriseSolutions: () => import("./EnterpriseSolutions"),
  WorkshopSection: () => import("./WorkshopSection"),
  WorkProcessSection: () => import("./WorkProcessSection"),
  ToolsScroller: () => import("./ToolsScroller"),
  OurCustomers: () => import("./OurCustomers"),
  Testimonial: () => import("./Testimonial"),
  CyberRangeStats: () => import("./CyberRangeStats"),
};

/**
 * Renders a dynamically imported component only when the section enters (or is near) the viewport.
 * Reduces initial JS and speeds up TTI; sections load progressively as the user scrolls.
 */
export default function WhenVisibleSection({ section, loadingHeight = "h-96", className = "" }) {
  const [Component, setComponent] = useState(null);
  const ref = useRef(null);
  const observerRef = useRef(null);
  const importFunc = SECTION_LOADERS[section];

  useEffect(() => {
    if (!importFunc) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observerRef.current?.disconnect();
        observerRef.current = null;
        importFunc().then((mod) => {
          setComponent(() => mod.default || mod);
        });
      },
      { rootMargin: "120px", threshold: 0.01 }
    );

    observerRef.current = observer;
    observer.observe(el);
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [section, importFunc]);

  if (Component) {
    return <Component />;
  }

  return (
    <div
      ref={ref}
      className={`w-full bg-gray-900/50 ${loadingHeight} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
