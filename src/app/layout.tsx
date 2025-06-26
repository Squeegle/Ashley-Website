import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { MainLayout } from "@/components/layout";

// Modern sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// Elegant serif font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

// Blank Mango font for headings
const blankMango = localFont({
  src: '../fonts/black-mango-regular.ttf',
  variable: '--font-blank-mango',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "At home with Rose | Interior Design & Lifestyle",
    template: "%s | At home with Rose"
  },
  description: "Creating beautiful, functional spaces that tell your story. Interior design and lifestyle inspiration for the modern home.",
  keywords: ["interior design", "home decor", "lifestyle", "design inspiration", "modern home"],
  authors: [{ name: "Ashley Rose" }],
  creator: "Ashley Rose",
  openGraph: {
    title: "At home with Rose | Interior Design & Lifestyle",
    description: "Creating beautiful, functional spaces that tell your story.",
    url: "https://ashleyrose.com",
    siteName: "At home with Rose",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "At home with Rose | Interior Design & Lifestyle",
    description: "Creating beautiful, functional spaces that tell your story.",
    creator: "@ashleyrose",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${blankMango.variable}`}>
      <body className="antialiased font-sans bg-white">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
