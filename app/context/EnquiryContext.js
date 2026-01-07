"use client";
import React, { createContext, useContext, useState } from 'react';

const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const openEnquiry = () => setIsOpen(true);
    const closeEnquiry = () => setIsOpen(false);

    return (
        <EnquiryContext.Provider value={{ isOpen, openEnquiry, closeEnquiry }}>
            {children}
        </EnquiryContext.Provider>
    );
}

export function useEnquiry() {
    return useContext(EnquiryContext);
}
