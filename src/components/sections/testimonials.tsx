import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { TestimonialCard } from "../ui/testimonial-card";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Sandeep",
    role: "CEO, Tech Startup",
    content:
      "Pavan built our EdTech platform from the ground up, scaling it to serve 5,000+ students worldwide. His frontend and backend expertise ensured smooth course delivery, while his optimizations drove a 35% increase in engagement and made the system future-ready.",
    rating: 5,
    gradient: "from-primary to-purple-600",
  },
  {
    name: "Avinash Nadh",
    role: "Product Manager",
    content:
      "On our solar foundation project, SPile+, Pavan has single-handedly figured out and implemented the entire payments module with Stripe webhooks, automating invoicing from days to seconds—critical for our product's success.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Tharine Manikanth",
    role: "Co-worker",
    content:
      "I've seen Pavan consistently deliver high-impact systems across domains—whether it was scaling an e-commerce app to 1,000+ daily transactions with 99.9% uptime, or mentoring 10+ interns to improve their React.js proficiency. His mix of problem-solving, mentoring, and hands-on execution makes him a reliable teammate in any project.",
    rating: 5,
    gradient: "from-purple-500 to-pink-600",
  },
];

export function Testimonials() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;

    const halfWidth = (containerRef.current?.scrollWidth ?? 0) / 2;
    if (halfWidth === 0) return;

    const current = x.get();
    const next = current - delta * 0.05; // ⬅️ adjust speed here

    // Reset when we've scrolled through the first copy
    x.set(next <= -halfWidth ? 0 : next);
  });


  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Testimonials from clients and colleagues
          </p>
        </div>

        <div
          className={`rounded-xl transition-all duration-300 p-4 ${
            isHovered ? "bg-zinc-50/10 " : ""
          }`}
          onMouseEnter={() => {
            isPaused.current = true;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            isPaused.current = false;
            setIsHovered(false);
          }}
        >
          <motion.div ref={containerRef} className="flex gap-8 middle-layer" style={{ x }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="min-w-[350px] max-w-sm flex-shrink-0 cursor-pointer hover:scale-125 hover:z-10 transition-all">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
