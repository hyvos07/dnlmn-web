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
import { profile, socials, education } from "@/data/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  url: profile.siteUrl,
  jobTitle: profile.role,
  sameAs: [socials.github.href, socials.linkedin.href, socials.x.href, socials.instagram.href],
  // CONFIRM: employer (BCA) omitted from JSON-LD per 04-plan Q6
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
};

export default function HomePage() {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="justify-items-center font-[family-name:var(--font-plus-jakarta-sans)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
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
