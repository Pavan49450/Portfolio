import { motion } from "framer-motion";
import { Laptop, Database, Gavel } from "lucide-react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { Card, CardContent } from "../ui/card";
import { SkillBar } from "../ui/skill-bar";

const skillCategories = [
  {
    title: "Frontend",
    icon: Laptop,
    gradient: "from-primary to-orange-600",
    skills: [
      { name: "React", level: 100 },
      { name: "Next.js", level: 100 },
      { name: "Javascript", level: 100 },
      { name: "HTML", level: 100 },
      { name: "CSS", level: 80 },
      { name: "Tailwind", level: 80 },
    ],
  },
  {
    title: "Backend & Mobile",
    icon: Database,
    gradient: "from-emerald-500 to-teal-600",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "Azure", level: 80 },
      { name: "SQL", level: 80 },
      { name: "React Native", level: 80 },
      { name: "Flutter", level: 80 },
    ],
  },
  {
    title: "Tools & Languages",
    icon: Gavel,
    gradient: "from-purple-500 to-pink-600",
    skills: [
      { name: "TypeScript", level: 60 },
      { name: "Git", level: 80 },
      { name: "Github", level: 80 },
      { name: "VS Code", level: 80 },
      { name: "Python", level: 40 },
      { name: "Java", level: 40 },
      { name: "C++", level: 60 },
    ],
  },
];

export function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="glass-effect hover-lift h-full">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        gradient={category.gradient}
                        delay={skillIndex * 0.1}
                        isVisible={isVisible}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
