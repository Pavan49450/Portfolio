import { motion } from "framer-motion";
import { Code, Database, Smartphone } from "lucide-react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const features = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, Next.js, JavaScript, HTML, CSS, Tailwind",
    gradient: "from-primary to-orange-600",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Node.js, MongoDB, Azure, PostgreSQL, Firebase",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter, Cross-platform apps",
    gradient: "from-purple-500 to-pink-600",
  },
];

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a vision to create innovative solutions
            that make a difference
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          >
            <img
              src="images/selfie.jpg"
              alt="Creative professional"
              className="rounded-xl shadow-2xl w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              My Journey
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
              As a full-stack developer with a mechanical engineering
              background, I bring a unique problem-solving approach to software
              development. My expertise spans across frontend and backend
              development, with extensive experience in React, Next.js, Node.js,
              and modern cloud technologies. I've successfully delivered
              enterprise-level applications for healthcare, education, and
              engineering sectors.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div
                    className={`w-12 h-12 shrink-0 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
