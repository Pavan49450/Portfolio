import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const experiences = [
  {
    icon: Briefcase,
    title: "Full Stack Developer — AI & SaaS",
    company: "Saanvi Structural Soln",
    period: "Aug 2024 - Current",
    description:
      "Built SPile+, a multi-tenant SaaS platform for solar pile engineering (React/TypeScript, Node.js, MongoDB) — eliminating 80% of manual calculation overhead. Integrated AI Helpdesk Agent using a RAG pipeline (LangChain + Pinecone + OpenAI), reducing support queries by 90%. Automated Stripe invoice pipeline cutting processing time from 3–5 days to under 5 seconds.",
    gradient: "from-primary to-orange-600",
    logo: "/images/saanvi.png",
  },
  {
    icon: Briefcase,
    title: "Frontend Developer",
    company: "VRPI",
    period: "Feb 2024 - Jul 2024",
    description:
      "Spearheaded front-end development for an innovative Edutech application. Developed the official website for VRPI Group showcasing cutting-edge solutions and import-export services.",
    gradient: "from-emerald-500 to-teal-600",
    logo: "/images/vrpiLogo.png",
  },
  // {
  //   icon: Briefcase,
  //   title: "Full Stack Developer",
  //   company: "Pearlthoughts",
  //   period: "Sep 2023 - Jan 2024",
  //   description:
  //     "Developed Schedula (doctor appointment platform), Unistock (E-commerce for medicine), and Zoggy Foods (food ordering app) using React, Node.js, and PostgreSQL with Azure cloud services.",
  //   gradient: "from-purple-500 to-pink-600",
  //   logo: "/images/pearlthoughts-logo.jpeg",
  // },
  {
    icon: Briefcase,
    title: "Assistant System Engineer",
    company: "Tata Consultancy Services",
    period: "Jan 2022 - Aug 2023",
    description:
      "Developed Tata-Pay's payment module supporting millions of daily transactions — React frontend for UPI and Net banking flows. Achieved 20% reduction in page load times and 40% improvement in workflow efficiency. Ranked #1 among 50+ engineers during TCS training program.",
    gradient: "from-blue-500 to-cyan-600",
    logo: "/images/TCS-logo.png",
  },
  {
    icon: GraduationCap,
    title: "B.Tech Mechanical Engineering",
    company: "CMRIT",
    period: "Jun 2018 - Sep 2021",
    description:
      "Graduated with CGPA of 8 in Mechanical Engineering. Transitioned to software development through self-learning and practical projects.",
    gradient: "from-indigo-500 to-purple-600",
    logo: "/images/CMRIT-logo.jpg"
  },
];

export function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
            <div className="absolute left-4 max-[768px]:hidden md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-purple-600 h-full"></div>

            <div className="space-y-12 max-[768px]:space-y-4">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="md:w-1/2 md:px-4 mb-4 md:mb-0 middle-layer">
                    <Card className="glass-effect hover-lift">
                      <CardContent className="p-4">
                        <div className="flex gap-2 items-center">
                          <img
                            title="logo"
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
                          {experience.company} • {experience.period}
                        </p>
                        <ul className="text-muted-foreground space-y-1 mt-1">
                          {experience.description
                            .split(".")
                            .map((sentence) => sentence.trim())
                            .filter(Boolean)
                            .map((sentence, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span>{sentence}.</span>
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
