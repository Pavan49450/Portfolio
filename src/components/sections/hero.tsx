"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Copy, Check, ChevronDown } from "lucide-react";
import { useTheme } from "../ui/theme-context";
import { THEMES } from "../../data/Themes";
import { Button } from "../ui/button";

// Character-by-character animation for the name headline
function AnimatedChars({
  text,
  className,
  delay = 0,
  iClassName,
}: {
  text: string;
  className?: string;
  iClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px 0px" });

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${iClassName ?? ""}`}
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

// Copy Email
function CopyEmail({ tok }: { tok: typeof THEMES.dark | typeof THEMES.light }) {
  const [copied, setCopied] = useState(false);
  const email = "pavank.kattula@gmail.com";

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={copy}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex items-center gap-2 text-xs transition-colors duration-300 cursor-pointer ${tok.emailText}`}
      whileHover={{ scale: 1.04 }}
    >
      <span className="font-mono">{email}</span>
      {copied ? (
        <Check className="w-3 h-3 text-emerald-500" />
      ) : (
        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const tok = isDark ? THEMES.dark : THEMES.light;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Subtle mouse parallax on the headline
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) * 0.012);
    mouseY.set((e.clientY - cy) * 0.008);
  };

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen mt-12 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -10, y: 16 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 16, delay: 0.1 }}
          className={`inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border backdrop-blur-sm text-xs tracking-widest uppercase ${tok.badgeBorder} ${tok.badgeBg} ${tok.badgeText}`}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          Available for work
        </motion.div>

        {/* Headline — scroll parallax + mouse parallax */}
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
          <motion.div style={{ x: springX, y: springY }}>
            <h1
              className="mb-6 leading-[1.05] font-black tracking-tighter"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              <div className={`text-[clamp(2.8rem,8vw,7rem)] ${tok.headlineMain}`}>
                <AnimatedChars text="Kattula " delay={0.2} />
                <AnimatedChars text="Pavan" delay={0.42} iClassName="gradient-text" />
              </div>
              <div className="text-[clamp(2.8rem,8vw,7rem)]">
                <AnimatedChars text="Kumar" delay={0.72} iClassName="gradient-text" />
              </div>
            </h1>
          </motion.div>
        </motion.div>

        {/* Role Title */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xl md:text-2xl max-w-2xl mx-auto mb-2 font-semibold tracking-tight middle-layer ${tok.subText}`}
        >
          Full Stack & AI Integration Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.28, ease: [0.22, 1, 0.36, 1] }}
          className={`text-base md:text-lg max-w-2xl mx-auto mb-2 leading-relaxed font-light middle-layer ${tok.subText}`}
          style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
        >
          Building production-grade SaaS platforms, RAG-powered AI agents, and complex payment
          systems · React · TypeScript · Node.js · LangChain
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.38, ease: [0.22, 1, 0.36, 1] }}
          className={`text-sm max-w-xl mx-auto mb-3 font-mono ${tok.emailText}`}
        >
          Hyderabad, India · Open to Remote
        </motion.p>

        {/* Stack tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 mt-6 middle-layer">
          {["React", "TypeScript", "Node.js", "LangChain", "Pinecone"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
                delay: 1.45 + i * 0.07,
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`px-3 py-1 text-[11px] tracking-widest uppercase font-mono border cursor-default ${
                theme === "light" ? "bg-zinc-50" : "bg-zinc-900"
              } rounded-full transition-colors duration-300 ${tok.tagText} ${tok.tagBorder}`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 1.78 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <Button
            onClick={() => scrollTo("#projects")}
            className="bg-gradient-to-r from-primary to-purple-600 w-[150px]"
          >
            View My Work <ArrowUpRight className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => scrollTo("#contact")}
            variant="outline"
            className="w-[150px]"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Copy email */}
        <div className="flex justify-center">
          <CopyEmail tok={tok} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer group z-50"
      >
        <motion.span
          className={`text-[10px] tracking-widest uppercase ${tok.scrollText}`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 7, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className={`w-4 h-4 ${tok.scrollIcon}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}
