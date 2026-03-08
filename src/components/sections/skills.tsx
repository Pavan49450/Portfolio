import { motion } from "framer-motion";
import { Laptop, Database, Gavel } from "lucide-react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { Card, CardContent } from "../ui/card";
import { SkillBar } from "../ui/skill-bar";
import { skillList } from "../../data/skills";

// Map skill names to their categories
const categoryMap: Record<string, string> = {
  React: "Frontend",
  Tailwind: "Frontend",
  "Next Js": "Frontend",
  Javascript: "Frontend",
  CSS: "Frontend",
  HTMl: "Frontend",

  "React Native": "Backend & Mobile",
  Flutter: "Backend & Mobile",
  Node: "Backend & Mobile",
  Mongodb: "Backend & Mobile",
  Azure: "Backend & Mobile",
  SQL: "Backend & Mobile",

  Typescript: "Tools & Languages",
  Git: "Tools & Languages",
  Github: "Tools & Languages",
  Java: "Tools & Languages",
  Python: "Tools & Languages",
  "C++": "Tools & Languages",
  "VS code": "Tools & Languages",
};

const categoryConfig = [
  {
    title: "Frontend",
    icon: Laptop,
    gradient: "from-primary to-orange-600",
  },
  {
    title: "Backend & Mobile",
    icon: Database,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Tools & Languages",
    icon: Gavel,
    gradient: "from-purple-500 to-pink-600",
  },
];

// Convert skillLevel (1–5) to percentage
const levelToPercent = (level: number) => (level / 5) * 100;

// Base URL where your skill images are served from
const IMAGE_BASE_URL = "/images/skills/"; // 👈 adjust this to your actual public path

export function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  // Group skills by category
  const categorized = categoryConfig.map((cat) => ({
    ...cat,
    skills: skillList
      .filter((s) => categoryMap[s.name] === cat.title)
      .map((s) => ({
        name: s.name,
        level: levelToPercent(s.skillLevel),
        icon: `${IMAGE_BASE_URL}${s.address}`,
      })),
  }));

  return (
    <section id="skills" className="py-20 ">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorized.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="glass-effect hover-lift h-full middle-layer">
                <CardContent className="p-6 sm:p-8">
                  {/* Category header icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className={`flex items-center gap-3 p-2 rounded-2xl glass-effect`}>
                        {/* Skill image icon */}
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8 object-contain shrink-0"
                        />
                        <div className="flex-1">
                          <SkillBar
                            name={skill.name}
                            level={skill.level}
                            gradient={category.gradient}
                            delay={skillIndex * 0.1}
                            isVisible={isVisible}
                          />
                        </div>
                      </div>
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