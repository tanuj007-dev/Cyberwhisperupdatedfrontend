"use client";
import React, { createContext, useContext, useState } from 'react';

const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isB2B, setIsB2B] = useState(false);

    const openEnquiry = (fromB2B = false) => {
        // Always explicitly set isB2B to prevent state persistence
        setIsB2B(fromB2B === true);
        setIsOpen(true);
    };

    const closeEnquiry = () => {
        setIsOpen(false);
        setIsB2B(false);
    };

    return (
        <EnquiryContext.Provider value={{ isOpen, isB2B, openEnquiry, closeEnquiry }}>
            {children}
        </EnquiryContext.Provider>
    );
}

export function useEnquiry() {
    return useContext(EnquiryContext);
}
