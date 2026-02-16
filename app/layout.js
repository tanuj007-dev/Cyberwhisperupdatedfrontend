import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { ThemeProvider } from "./context/ThemeContext";

// Load font with optimal settings (fewer weights = faster load)
const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: 'swap',
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
    themeColor: "#1B0D37",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var t=localStorage.getItem('theme');var d=typeof window!=='undefined'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=t||(d?'dark':'light');document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(theme);})();`,
                    }}
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preload" href="/assets/cw_logo_sample_2.png" as="image" />
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
