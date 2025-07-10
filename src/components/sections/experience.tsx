import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const experiences = [
  {
    icon: Briefcase,
    title: "Software Developer",
    company: "Structurology",
    period: "Aug 2024 - Current",
    description:
      "Contributed to developing an innovative solar pile foundation design tool, automating calculations and optimizing solar project foundations. Enhanced user experience with project management features.",
    gradient: "from-primary to-orange-600",
  },
  {
    icon: Briefcase,
    title: "Frontend Developer",
    company: "VRPI",
    period: "Feb 2024 - Jul 2024",
    description:
      "Spearheaded front-end development for an innovative Edutech application. Developed the official website for VRPI Group showcasing cutting-edge solutions and import-export services.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Briefcase,
    title: "Full Stack Developer",
    company: "Pearlthoughts",
    period: "Sep 2023 - Jan 2024",
    description:
      "Developed Schedula (doctor appointment platform), Unistock (E-commerce for medicine), and Zoggy Foods (food ordering app) using React, Node.js, and PostgreSQL with Azure cloud services.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Briefcase,
    title: "Assistant System Engineer",
    company: "Tata Consultancy Services",
    period: "Jan 2022 - Aug 2023",
    description:
      "Spearheaded Tata-Pay's payment module development with React, integrating UPI and Net banking. Achieved 20% reduction in page load times and 25% improvement in user satisfaction.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: GraduationCap,
    title: "B.Tech Mechanical Engineering",
    company: "CMRIT",
    period: "Jun 2018 - Sep 2021",
    description:
      "Graduated with CGPA of 8.28 in Mechanical Engineering. Transitioned to software development through self-learning and practical projects.",
    gradient: "from-indigo-500 to-purple-600",
  },
];

export function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
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

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-purple-600 h-full"></div>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2 md:px-8 mb-4 md:mb-0">
                    <Card className="glass-effect hover-lift">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-primary mb-2">
                          {experience.company} • {experience.period}
                        </p>
                        <p className="text-muted-foreground">
                          {experience.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative">
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
