import AccentController from "@/components/motion/AccentController";
import Footer from "@/components/Footer";
import Splash from "@/sections/home/Splash";
import Hero from "@/sections/home/Hero";
import About from "@/sections/about/About";
import Work from "@/sections/work/Work";
import Experience from "@/sections/experience/Experience";
import Writing from "@/sections/writing/Writing";
import Contact from "@/sections/contact/Contact";
import { sections } from "@/data/sections";
import { profile, socials, education } from "@/data/profile";
import { getLatestPosts } from "@/lib/blog";

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

const section = (id: string) => sections.find((s) => s.id === id)!;

export default function HomePage() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Splash />
      <main>
        <Hero />
        <About section={section("about")} />
        <Work section={section("work")} />
        <Experience section={section("experience")} />
        <Writing section={section("writing")} posts={latestPosts} />
        <Contact section={section("contact")} />
      </main>
      <Footer />
      <AccentController />
    </>
  );
}
