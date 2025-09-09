// import { motion } from "framer-motion";
// import { useScrollAnimation } from "../../hooks/use-scroll-animation";
// import { TestimonialCard } from "../ui/testimonial-card";

// const testimonials = [
//   {
//     name: "Sandeep",
//     role: "CEO, Tech Startup",
//     content:
//       "Pavan built our EdTech platform from the ground up, scaling it to serve 5,000+ students worldwide. His frontend and backend expertise ensured smooth course delivery, while his optimizations drove a 35% increase in engagement and made the system future-ready.",
//     rating: 5,
//     gradient: "from-primary to-purple-600",
//   },
//   {
//     name: "Avinash Nadh",
//     role: "Product Manager",
//     content:
//       "On our solar foundation project, SPile+, Pavan has single-handedly figured out and implemented the entire payments module with Stripe webhooks, automating invoicing from days to seconds—critical for our product's success.",
//     rating: 5,
//     gradient: "from-emerald-500 to-teal-600",
//   },
//   {
//     name: "Tharine Manikanth",
//     role: "Co-worker",
//     content:
//       "I've seen Pavan consistently deliver high-impact systems across domains—whether it was scaling an e-commerce app to 1,000+ daily transactions with 99.9% uptime, or mentoring 10+ interns to improve their React.js proficiency. His mix of problem-solving, mentoring, and hands-on execution makes him a reliable teammate in any project.",
//     rating: 5,
//     gradient: "from-purple-500 to-pink-600",
//   },
// ];


// export function Testimonials() {
//   const { ref, isVisible } = useScrollAnimation();

//   return (
//     <section id="testimonials" className="py-20 bg-background">
//       <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           ref={ref}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             What People Say
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Testimonials from clients and colleagues
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.name}
//               initial={{ opacity: 0, y: 50 }}
//               animate={isVisible ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//             >
//               <TestimonialCard {...testimonial} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "framer-motion";
import { TestimonialCard } from "../ui/testimonial-card";

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
  return (
    <section id="testimonials" className="py-20 bg-background overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Testimonials from clients and colleagues
          </p>
        </div>

        {/* Auto-scrolling horizontal container */}
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20, // adjust speed (lower = faster)
            ease: "linear",
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[350px] max-w-sm flex-shrink-0"
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
