import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import NavBar from "@/components/nav/NavBar";
import { profile, seo } from "@/data/profile";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: ["Daniel Liman", "dnlmn", "Software Engineer", "Portfolio", "Web Developer", "Mobile Developer"],
  authors: [{ name: profile.name }],
  creator: profile.name,
  verification: {
    google: "H-7ItUmiU6Th7u8XxuTg8x8hDk1ugZOrPcMdOVpRKQo",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: profile.siteUrl,
    siteName: "Daniel Liman - dnlmn",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Daniel Liman | dnlmn",
      },
    ],
  },
  icons: {
    icon: "favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <MotionProvider>
          <NavBar />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
