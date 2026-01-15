import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { ThemeProvider } from "./context/ThemeContext";

// Load font with optimal settings
const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: 'swap', // Ensure text is visible during font load
    preload: true,
});

// Lazy load preloader
const PreloaderHandler = dynamic(() => import("./PreloaderHandler"), {
    loading: () => null,
    ssr: true,
});

// Lazy load conditional layout
const ConditionalLayout = dynamic(() => import("./ConditionalLayout"), {
    ssr: true,
});

export const metadata = {
    title: "CyberWhisper - Cybersecurity Training & Solutions",
    description: "Advanced cybersecurity training, B2B solutions, and cyber range services",
    keywords: "cybersecurity, training, penetration testing, cyber range",
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    themeColor: "#ffffff",
    manifest: "/manifest.json",
    openGraph: {
        type: "website",
        locale: "en_US",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            </head>
            <body
                className={`${poppins.variable} antialiased`}
                suppressHydrationWarning
            >
                <PreloaderHandler>
                    <ThemeProvider>
                        <ConditionalLayout>
                            {children}
                        </ConditionalLayout>
                    </ThemeProvider>
                </PreloaderHandler>
            </body>
        </html>
    );
}
