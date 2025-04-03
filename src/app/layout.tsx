import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dnlmn.vercel.app"),
  title: "Daniel Liman | dnlmn",
  description: "Portfolio website made by Daniel Liman (aka dnlmn), a passionate Software Engineer based in Indonesia.",
  keywords: ["Daniel Liman", "dnlmn", "Software Engineer", "Portfolio", "Web Developer"],
  authors: [{ name: "Daniel Liman" }],
  creator: "Daniel Liman",
  openGraph: {
    title: "Daniel Liman | dnlmn",
    description: "Portfolio website made by Daniel Liman (aka dnlmn), a passionate Software Engineer based in Indonesia.",
    url: "https://dnlmn.vercel.app",
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
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Daniel Liman | dnlmn</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="google-site-verification" content="H-7ItUmiU6Th7u8XxuTg8x8hDk1ugZOrPcMdOVpRKQo" />
      </Head>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
