import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const experiences = [
  {
    icon: Briefcase,
    title: "Full Stack Developer",
    company: "Saanvi Structural Solutions",
    location: "Hyderabad",
    period: "Aug 2024 - Present",
    points: [
      "Engineered SPile+, a solar pile foundation platform, cutting 80% of manual engineering calculation work with multi-mode workflows, automated Excel ingestion, and one-click PDF reports (React, TypeScript, Node.js, MongoDB).",
      "Designed and shipped Multi-Factor Authentication across SPile+ to protect engineering data and enterprise accounts.",
      "Built a context-aware AI Helpdesk Agent on a RAG pipeline (Pinecone, LangChain, OpenAI, Node.js/Express), reducing manual support queries by 90%.",
      "Delivered a real-time project management platform with Socket.IO dashboards, push notifications, and activity tracking, improving team workflow efficiency by 40%.",
      "Cut invoice processing from 3–5 days to under 5 seconds with an end-to-end Stripe webhook pipeline for subscriptions, receipts, and multi-tenant payment sync.",
    ],
    gradient: "from-primary to-orange-600",
    logo: "/images/saanvi.webp",
  },
  {
    icon: Briefcase,
    title: "Frontend Developer",
    company: "VRPI Group of Companies",
    location: "Hyderabad",
    period: "Feb 2024 - Jul 2024",
    points: [
      "Built an EdTech LMS serving 5,000+ students worldwide, with a modular React/Redux frontend, course delivery APIs, and payment-gated subscriptions.",
      "Rebuilt the VRPI corporate website with performance-first rendering and semantic, responsive components, increasing organic traffic by 35%.",
    ],
    gradient: "from-primary to-orange-600",
    logo: "/images/vrpiLogo.webp",
  },
  {
    icon: Briefcase,
    title: "Assistant System Engineer",
    company: "Tata Consultancy Services",
    location: "Kolkata",
    period: "Jan 2022 - Aug 2023",
    points: [
      "Led full-stack development of Tata Pay's core payment module, integrating UPI, Net Banking, and tokenized card flows behind JWT-secured, PCI-compliant APIs.",
      "Improved Tata Pay page load time by 20% with code-splitting, lazy loading, and API response caching.",
      "Raised CSM form conversion by 15% and user satisfaction by 25% through A/B-tested UI flows and real-time field validation.",
    ],
    gradient: "from-primary to-orange-600",
    logo: "/images/TCS-logo.webp",
  },
  {
    icon: GraduationCap,
    title: "Bachelor of Technology",
    company: "CMR Institute of Technology",
    location: "Hyderabad",
    period: "Jun 2017 - Sep 2021",
    points: [
      "Graduated with a CGPA of 8.28.",
      "Moved into software development through self-learning and hands-on projects.",
    ],
    gradient: "from-primary to-orange-600",
    logo: "/images/CMRIT-logo.jpg",
  },
];

export function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
        <motion.div
          initial={{ y: 60 }}
          animate={isVisible ? { y: 0 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and key milestones
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <motion.div
              className="absolute left-4 max-[768px]:hidden md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-orange-600 h-full"
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-12 max-[768px]:space-y-4">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ x: index % 2 === 0 ? -60 : 60, scale: 0.92 }}
                  animate={isVisible ? { x: 0, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 140, damping: 20, delay: index * 0.18 }}
                  whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="md:w-1/2 md:px-4 mb-4 md:mb-0 middle-layer">
                    <Card className="glass-effect hover-lift">
                      <CardContent className="p-4">
                        <div className="flex gap-2 items-center">
                          <img
                            alt={`${experience.company} logo`}
                            loading="lazy"
                            decoding="async"
                            src={experience?.logo}
                            style={{
                              width: "40px",
                            }}
                          />

                          <h3 className="text-xl font-bold mb-2">
                            {experience.title}
                          </h3>
                        </div>
                        <p className="text-primary mb-2">
                          {experience.company}, {experience.location} | {experience.period}
                        </p>
                        <ul className="text-muted-foreground space-y-1 mt-1">
                          {experience.points.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative max-[768px]:hidden">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${experience.gradient} rounded-full flex items-center justify-center`}
                    >
                      <experience.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:px-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
