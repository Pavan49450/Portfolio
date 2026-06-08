import { motion } from "framer-motion";
import { Laptop, Database, Gavel, BrainCircuit } from "lucide-react";
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

  "React Native": "Backend",
  Flutter: "Backend",
  Node: "Backend",
  Mongodb: "Backend",
  Azure: "Backend",
  SQL: "Backend",
  NestJS: "Backend",

  Typescript: "Tools & DevOps",
  Git: "Tools & DevOps",
  Github: "Tools & DevOps",
  Java: "Tools & DevOps",
  Python: "Tools & DevOps",
  "C++": "Tools & DevOps",
  "VS code": "Tools & DevOps",
  Docker: "Tools & DevOps",
  "GitHub Actions": "Tools & DevOps",

  LangChain: "AI / ML",
  "Pinecone (Vector DB)": "AI / ML",
  "OpenAI API": "AI / ML",
  "RAG Pipelines": "AI / ML",
  "Prompt Engineering": "AI / ML",
  "Agentic AI Systems": "AI / ML",
};

const categoryConfig = [
  {
    title: "Frontend",
    icon: Laptop,
    gradient: "from-primary to-orange-600",
  },
  {
    title: "Backend",
    icon: Database,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Tools & DevOps",
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
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 60 }}
          animate={isVisible ? { y: 0 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
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

        <div className="grid grid-cols-4 max-lg:grid-cols-1 max-xl:grid-cols-2 gap-8">
          {categorized.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ y: 60, scale: 0.88 }}
              animate={isVisible ? { y: 0, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 170, damping: 20, delay: index * 0.12 }}
              whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 18 } }}
            >
              <Card className="glass-effect hover-lift h-full middle-layer">
                <CardContent className="p-6 sm:p-8">
                  {/* Category header icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                    initial={{ rotate: -180, scale: 0 }}
                    animate={isVisible ? { rotate: 0, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 16, delay: index * 0.12 + 0.2 }}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`flex items-center gap-3 p-2 rounded-2xl glass-effect`}
                      >
                        {/* Skill image icon */}
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className={`w-8 h-8 object-contain shrink-0 bg-white rounded-full p-1`}
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
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
