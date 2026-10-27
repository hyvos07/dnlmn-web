import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Daniel Liman | dnlmn",
  description: "Portfolio website made by Daniel Liman (aka dnlmn), a passionate Software Engineer based in Indonesia.",
  keywords: ["Daniel Liman", "dnlmn", "Software Engineer", "Portfolio", "Web Developer"],
  authors: [{ name: "Daniel Liman", url: SITE_URL }],
  creator: "Daniel Liman",
  verification: {
    google: "H-7ItUmiU6Th7u8XxuTg8x8hDk1ugZOrPcMdOVpRKQo",
  },
  openGraph: {
    title: "Daniel Liman | dnlmn",
    description: "Portfolio website made by Daniel Liman (aka dnlmn), a passionate Software Engineer based in Indonesia.",
    url: SITE_URL,
    siteName: "Daniel Liman - dnlmn",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: "/images/banner-tall.png",
        width: 1200,
        height: 630,
        alt: "Daniel Liman | dnlmn",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en">
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
