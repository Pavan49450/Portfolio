import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export function Hero() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* <BackgroundIcons /> */}

      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg opacity-20"></div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-60"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-purple-500 rounded-full animate-float opacity-60"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-8 h-8 bg-emerald-500 rounded-full animate-float opacity-60"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-6 text-center relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center flex-col items-center"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-32 h-32 mx-auto mb-8 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
              alt="Professional developer workspace"
              className="w-full h-full rounded-full border-4 border-primary shadow-2xl animate-float object-cover"
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 w-fit px-8 py-4 rounded-4xl"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text">Kattula Pavan Kumar</span>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 w-fit px-8 py-4 rounded-4xl"
          >
            <span className="typing-effect">
              Coding Tomorrow's Possibilities
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto secondary w-fit px-8 py-4 rounded-4xl"
          >
            Full-stack developer with 3+ years of experience building innovative
            applications for healthcare, education, and engineering sectors.
            Specialized in React, Node.js, and modern cloud technologies with a
            proven track record of delivering enterprise-level solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => handleScrollToSection("#projects")}
              className="bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-transform"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScrollToSection("#contact")}
              className="border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => handleScrollToSection("#about")}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
