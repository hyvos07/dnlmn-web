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

export default function HomePage() {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="justify-items-center font-[family-name:var(--font-plus-jakarta-sans)]">
      <SplashScreen />
      <NavBar />
      <main className="flex flex-col justify-center items-center">
        <HomeContent />
        <div className="flex flex-col justify-center items-center px-12 mx-auto lg:px-44">
          <AboutContent />
          <ProjectContent />
          <ExperienceContent />
          <BlogSection posts={latestPosts} />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
