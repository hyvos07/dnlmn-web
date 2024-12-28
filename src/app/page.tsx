'use client';
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [])

  return (
    <div className="justify-items-center font-[family-name:var(--font-plus-jakarta-sans)]">
      <SplashScreen />
      <main className="flex justify-center items-center max-w-[1080px] min-h-screen mx-auto">
        <p className="text-6xl font-bold"><span className="align-super text-cyan-500">+</span>Jakarta</p>
      </main>
      <Footer />
    </div>
  );
}
