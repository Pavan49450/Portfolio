import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { TestimonialCard } from "../ui/testimonial-card";

const testimonials = [
  {
    name: "Sandeep",
    role: "CEO, Tech Startup",
    content:
      "Pavan's work on our web application was exceptional. His attention to detail, technical expertise, and proactive approach made the project a major success.",
    rating: 5,
    gradient: "from-primary to-purple-600",
  },
  {
    name: "Anivash Nadh",
    role: "Product Manager",
    content:
      "Collaborating with Pavan was seamless. He quickly understood our requirements and delivered a solution that went beyond expectations.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Tharine Manikanth",
    role: "Co-worker",
    content:
      "Pavan stands out as a dependable teammate who approaches every challenge with creativity and precision. His problem-solving mindset has made our team stronger and more effective.",
    rating: 5,
    gradient: "from-purple-500 to-pink-600",
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Testimonials from clients and colleagues
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
