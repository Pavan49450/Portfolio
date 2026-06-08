import { motion } from "framer-motion";
import { Code, Database, BrainCircuit } from "lucide-react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const features = [
  {
    icon: Code,
    title: "Full Stack Engineering",
    description: "React, TypeScript, Node.js, NestJS, MongoDB, PostgreSQL, Stripe",
    gradient: "from-primary to-orange-600",
  },
  {
    icon: Database,
    title: "SaaS & Payments",
    description: "Multi-tenant architecture, Stripe pipelines, Azure, real-time systems",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: BrainCircuit,
    title: "AI & ML Engineering",
    description: "LangChain, Pinecone, OpenAI API, RAG Pipelines, Prompt Engineering",
    gradient: "from-purple-500 to-pink-600",
  },
];

export function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-4">
        <motion.div
          initial={{ y: 60 }}
          animate={isVisible ? { y: 0 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Full Stack & AI Engineer with 3+ years shipping production SaaS across EdTech, FinTech, and renewable energy
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", x: -30 }}
            animate={isVisible ? { clipPath: "inset(0 0% 0 0)", x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md middle-layer"
          >
            <img
              src="images/selfie.jpg"
              alt="Creative professional"
              className="rounded-xl shadow-2xl w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50 }}
            animate={isVisible ? { x: 0 } : {}}
            transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.25 }}
            className="w-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              My Journey
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
              Full Stack & AI Engineer with 3+ years shipping production SaaS across EdTech, FinTech, and renewable energy. I specialize in multi-tenant platform architecture, RAG-powered AI integrations, and complex payment systems. Recognized by the Indian Air Force for defense-grade software delivery. Ranked #1 of 50+ engineers at TCS.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ x: 30, scale: 0.95 }}
                  animate={isVisible ? { x: 0, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.4 + index * 0.12 }}
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
