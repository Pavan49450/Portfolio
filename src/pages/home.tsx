import { Navigation } from "../components/sections/navigation";
import { About } from "..//components/sections/about";
import { Skills } from "../components/sections/skills";
import { Projects } from "../components/sections/projects";
import { Services } from "../components/sections/services";
import { Experience } from "../components/sections/experience";
import { Testimonials } from "../components/sections/testimonials";
import { Contact } from "../components/sections/contact";
import { Footer } from "../components/sections/footer";
import { BackToTop } from "../components/ui/back-to-top";
import { Hero } from "../components/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden scroll-container">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
