'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from "./Component/header";
import { EnquiryProvider } from "./context/EnquiryContext";

// Lazy load components not needed on every page
const Footer = dynamic(() => import("./Component/footer"), {
  loading: () => <div className="h-32 bg-gray-900" />,
  ssr: true,
});

const NewsletterSignup = dynamic(() => import("./Component/NewsletterSignup"), {
  loading: () => <div className="h-32 bg-gray-900" />,
  ssr: true,
});

const WhatsAppButton = dynamic(() => import("./Component/WhatsAppButton"), {
  loading: () => null,
  ssr: false,
});

const EnquiryModal = dynamic(() => import("./Component/EnquiryModal"), {
  loading: () => null,
  ssr: false,
});

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <EnquiryProvider>
            {!isAdminRoute && <Header />}
            {children}
            {!isAdminRoute && <WhatsAppButton />}
            {!isAdminRoute && <NewsletterSignup />}
            {!isAdminRoute && <Footer />}
            <EnquiryModal />
        </EnquiryProvider>
    );
}
