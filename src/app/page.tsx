import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Skills from "@/components/Skills";
import StatsBand from "@/components/StatsBand";

export default function Home() {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#0a0a0b]"
      >
        Lompat ke konten utama
      </a>

      <ScrollReveal />
      <SiteHeader />

      <main id="konten">
        <Hero />
        <StatsBand />
        <About />
        <ExperienceTimeline />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
