'use client';

import { usePathname } from 'next/navigation';
import Header from "./Component/header";
import Footer from "./Component/footer";
import NewsletterSignup from "./Component/NewsletterSignup";
import WhatsAppButton from "./Component/WhatsAppButton";
import EnquiryModal from "./Component/EnquiryModal";
import { EnquiryProvider } from "./context/EnquiryContext";

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
