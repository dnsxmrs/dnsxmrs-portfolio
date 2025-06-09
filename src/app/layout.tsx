import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dnsxmrs - Portfolio",
  description: "Fullstack Developer with backend expertise in Laravel, C#, Python, React, PostgreSQL, and MySQL. Passionate about clean architecture and scalable systems.",
  keywords: "fullstack developer, backend developer, Laravel, C#, Python, React, PostgreSQL, MySQL, web development",
  authors: [{ name: "Erice Michael D. Marial" }],
  creator: "Erice Michael D. Marial",
  openGraph: {
    title: "Erice Michael D. Marial - Fullstack Developer",
    description: "Backend specialist with growing fullstack experience. Expert in Laravel, C#, Python, React, and database technologies.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
