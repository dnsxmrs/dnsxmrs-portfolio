import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dnsxmrs.vercel.app"),
  title: "dnsxmrs - Portfolio",
  description: "Fullstack Developer with backend expertise in Laravel, C#, Python, React, PostgreSQL, and MySQL. Passionate about clean architecture and scalable systems.",
  keywords: "full stack developer, backend developer, Laravel, C#, Python, React, PostgreSQL, MySQL, web development",
  authors: [{ name: "Erice Michael D. Marial" }],
  creator: "Erice Michael D. Marial",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "qA2IY2_tl-OPqrXz_Zhfelo8kH0cN9oyTNz-2GHWzUk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Erice Michael D. Marial - Fullstack Developer",
    description: "Backend specialist with growing fullstack experience. Expert in Laravel, C#, Python, React, and database technologies.",
    url: "https://dnsxmrs.vercel.app",
    siteName: "dnsxmrs Portfolio",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erice Michael D. Marial - Fullstack Developer",
    description: "Backend specialist with growing fullstack experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased font-[family-name:var(--font-jetbrains-mono)]`}
      >
        <ThemeProvider>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
