import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Madhuranga Travel Blog",
    template: "%s | Madhuranga Travel Blog",
  },
  description:
    "Explore breathtaking travel vlogs, cultural tours, and scenic adventures across Sri Lanka with Mayuru Madhuranga.",
  keywords: [
    "Sri Lanka travel",
    "Mayuru Madhuranga",
    "travel vlog",
    "trekking in Sri Lanka",
    "cultural tourism",
    "Sri Lanka hiking",
    "travel videos",
  ],
  authors: [{ name: "Mayuru Madhuranga", url: "https://madhuranga-travel-blog.vercel.app" }],
  creator: "Mayuru Madhuranga",
  metadataBase: new URL("https://madhuranga-travel-blog.vercel.app"),
  openGraph: {
    title: "Madhuranga Travel Blog",
    description:
      "Watch amazing travel vlogs and scenic journeys around Sri Lanka. Captured and edited by Mayuru Madhuranga.",
    url: "https://madhuranga-travel-blog.vercel.app",
    siteName: "Madhuranga Travel Blog",
    images: [
      {
        url: "/cover.JPG",
        width: 1200,
        height: 630,
        alt: "Madhuranga Travel Blog Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhuranga Travel Blog",
    description:
      "Watch stunning travel vlogs from across Sri Lanka by Mayuru Madhuranga.",
    images: ["/cover.JPG"],
    creator: "@mayurumaduranga",
  },
  category: "Travel",
  verification: {
    google: "BtZqLJosv8hqOAg4CbdBugkAzGjSo0bxSFIcoMCsDkA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="BtZqLJosv8hqOAg4CbdBugkAzGjSo0bxSFIcoMCsDkA"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        
      </body>
    </html>
  );
}
