import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SplashScreen from "@/components/SplashScreen";
import HomeContent from "@/sections/1_home";
import AboutContent from "@/sections/2_about";
import ProjectContent from "@/sections/3_projects";
import ExperienceContent from "@/sections/4_experiences";
import BlogSection from "@/components/blog/BlogSection";
import { getLatestPosts } from "@/lib/blog";
import { profileJsonLd } from "@/lib/site";
import backgroundStyles from '@/styles/ContentBackground.module.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="justify-items-center font-[family-name:var(--font-plus-jakarta-sans)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, '\\u003c') }}
      />
      <SplashScreen />
      <NavBar />
      <main className="flex flex-col justify-center items-center">
        <HomeContent />
        <div className={backgroundStyles.background}>
          <div className="flex flex-col justify-center items-center px-12 mx-auto lg:px-44">
            <AboutContent />
            <ProjectContent />
            <ExperienceContent />
            <BlogSection posts={latestPosts} />
          </div>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
