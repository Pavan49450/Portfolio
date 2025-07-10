import { motion } from "framer-motion";
import { Code, Smartphone, Cloud, Check, Database, Gavel } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "I build fast, responsive, and dynamic web applications using cutting-edge technologies like React, Next.js, and Tailwind CSS.",
    gradient: "from-primary to-orange-600",
    features: ["React", "Next.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "I develop high-performance mobile applications using React Native and Flutter, ensuring a consistent and engaging user experience.",
    gradient: "from-emerald-500 to-teal-600",
    features: [
      "React Native",
      "Flutter",
      "Cross-platform",
      "Native Performance",
    ],
  },
  {
    icon: Database,
    title: "Backend Development",
    description:
      "I design and implement robust APIs and comprehensive database solutions using Node.js, Express.js, PostgreSQL, MongoDB, and Firebase.",
    gradient: "from-purple-500 to-pink-600",
    features: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    icon: Cloud,
    title: "Full-Stack Development",
    description:
      "I provide end-to-end solutions, handling both frontend and backend development to deliver cohesive and fully functional applications.",
    gradient: "from-blue-500 to-cyan-600",
    features: [
      "Full-Stack Solutions",
      "API Integration",
      "Database Design",
      "Deployment",
    ],
  },
  {
    icon: Gavel,
    title: "Consulting & Optimization",
    description:
      "I offer performance audits and technical consulting services to help you choose the right technologies and implement best practices.",
    gradient: "from-indigo-500 to-purple-600",
    features: [
      "Performance Optimization",
      "Technical Consulting",
      "Code Reviews",
      "Architecture Design",
    ],
  },
];

export function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive development services to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="glass-effect hover-lift h-full">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="text-left space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
