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
import AchievementsSection from "../components/sections/achievements";
import Grain from "../components/ui/Background/Grain";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import SkillsBackground from "../components/ui/Background/SkillsBackground";
export default function Home() {
  const orbs = [
    { size: 320, x: "10%", y: "20%", color: "rgba(99,102,241,0.4)", delay: 0 },
    { size: 200, x: "75%", y: "60%", color: "rgba(168,85,247,0.3)", delay: 2 },
    { size: 150, x: "60%", y: "10%", color: "rgba(34,211,238,0.8)", delay: 4 },
  ];

  function MouseGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    useEffect(() => {
      const move = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
      <motion.div
        className="pointer-events-none absolute inset-0 z-100"
        style={{
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(99,102,241,0.12) 0%, transparent 70%)`,
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SkillsBackground />

      <div className="fixed inset-0 z-100 pointer-events-none overflow-hidden">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px]"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: orb.color,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grain on top of orbs, still behind content */}
      <Grain />

      <MouseGlow />

      {/* ---- All page content sits above background ---- */}
      {/* <div className="relative z-30"> */}
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      <AchievementsSection />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop />
      {/* </div> */}
    </div>
  );
}
