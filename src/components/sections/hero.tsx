"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Copy, Check, ChevronDown } from "lucide-react";
import { useTheme } from "../ui/theme-context";
import { THEMES } from "../../data/Themes";
import { Button } from "../ui/button";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";

// ─── Magnetic Button ──────────────────────────────────────────────────────────
// function MagneticButton({
//   children,
//   className,
//   onClick,
//   variant = "primary",
//   tok,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
//   variant?: "primary" | "outline";
//   tok: typeof THEMES.dark | typeof THEMES.light;
// }) {
//   const ref = useRef<HTMLButtonElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const springX = useSpring(x, { stiffness: 200, damping: 15 });
//   const springY = useSpring(y, { stiffness: 200, damping: 15 });

//   const handleMouse = (e: React.MouseEvent) => {
//     const rect = ref.current?.getBoundingClientRect();
//     if (!rect) return;
//     x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
//     y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
//   };

//   const reset = () => {
//     x.set(0);
//     y.set(0);
//   };

//   const base =
//     "relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden cursor-pointer";

//   const variantClass =
//     variant === "primary"
//       ? `${tok.primaryBg} ${tok.primaryShadow}`
//       : `border backdrop-blur-sm ${tok.outlineBorder}`;

//   return (
//     <motion.button
//       ref={ref}
//       style={{ x: springX, y: springY }}
//       onMouseMove={handleMouse}
//       onMouseLeave={reset}
//       onClick={onClick}
//       className={`${base} ${variantClass} ${className ?? ""}`}
//       whileTap={{ scale: 0.96 }}
//     >
//       {children}
//     </motion.button>
//   );
// }

// ─── Word-by-word stagger ─────────────────────────────────────────────────────
function AnimatedWords({
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
  const { ref, isVisible } = useScrollAnimation();
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.25em] ${iClassName}`}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          ref={ref}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Copy Email ───────────────────────────────────────────────────────────────
function CopyEmail({ tok }: { tok: typeof THEMES.dark | typeof THEMES.light }) {
  const [copied, setCopied] = useState(false);
  const email = "pavank.kattula@gmail.com";

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { isVisible } = useScrollAnimation();

  return (
    <motion.button
      onClick={copy}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ delay: 1 }}
      className={`group flex items-center gap-2 text-xs transition-colors duration-300 cursor-pointer ${tok.emailText}`}
      whileHover={{ scale: 1.02 }}
      // ref={ref}
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
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Subtle grid overlay */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${tok.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${tok.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      /> */}

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border backdrop-blur-sm text-xs tracking-widest uppercase ${tok.badgeBorder} ${tok.badgeBg} ${tok.badgeText}`}
          ref={ref}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for work
        </motion.div>

        {/* Headline */}
        <motion.div style={{ y: headlineY }}>
          <h1
            className="mb-6 leading-[1.05] font-black tracking-tighter"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <div
              className={`text-[clamp(2.8rem,8vw,7rem)] ${tok.headlineMain}`}
            >
              <AnimatedWords text="Kattula" delay={0.3} />
              <AnimatedWords
                text="Pavan"
                delay={0.4}
                iClassName="gradient-text"
              />
            </div>
            <div
              className="text-[clamp(2.8rem,8vw,7rem)] "
              // style={{
              //   background: tok.headlineGradient,
              //   WebkitBackgroundClip: "text",
              //   WebkitTextFillColor: "transparent",
              //   backgroundClip: "text",
              // }}
            >
              <AnimatedWords
                text="Kumar"
                delay={0.55}
                iClassName="gradient-text"
              />
            </div>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`text-lg md:text-xl max-w-xl mx-auto mb-3 leading-relaxed font-light middle-layer ${tok.subText}`}
          style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          ref={ref}
        >
          <span className="middle-layer inline-block">
            Full-stack developer crafting digital experiences at the
            intersection of{" "}
          </span>
          <span className={`not-italic font-medium ${tok.subHighlight}`}>
            art
          </span>{" "}
          and{" "}
          <span className={`not-italic font-medium ${tok.subHighlight}`}>
            logic
          </span>
          .
        </motion.p>

        {/* Stack tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12 mt-6 middle-layer"
          ref={ref}
        >
          {["React", "Node.js", "MongoDB", "Express.js", "CSS"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.07 }}
                className={`px-3 py-1 text-[11px] tracking-widest uppercase font-mono border ${theme === "light" ? "bg-zinc-50": "bg-zinc-900"} rounded-full transition-colors duration-300 ${tok.tagText} ${tok.tagBorder}`}
              >
                {tag}
              </motion.span>
            ),
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
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
        transition={{ delay: 2.2 }}
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer group z-50"
      >
        <span
          className={`text-[10px] tracking-widest uppercase transition-colors ${tok.scrollText}`}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors ${tok.scrollIcon}`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
