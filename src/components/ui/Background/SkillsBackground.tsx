"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { skillList } from "../../../data/skills";
import { THEMES } from "../../../data/Themes";
import { useTheme } from "../use-theme";
// import { useScrollAnimation } from "../../../hooks/use-scroll-animation";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Skill {
  _id: { $oid: string };
  address: string;
  name: string;
  skillLevel: number;
}

interface FloatingIcon {
  id: string;
  skill: Skill;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
  amplitude: number;
  layer: number;
  rotationBase: number;
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────

// ─── Helpers ──────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const ICON_BASE_PATH = "/images/skills/";

function buildIcons(skills: Skill[]): FloatingIcon[] {
  return skills.map((skill) => ({
    id: skill._id.$oid,
    skill,
    x: rand(5, 90),
    y: rand(5, 90),
    size: rand(80, 100),
    speedX: rand(0.012, 0.03) * (Math.random() > 0.5 ? 1 : -1),
    speedY: rand(0.008, 0.022) * (Math.random() > 0.5 ? 1 : -1),
    phase: rand(0, Math.PI * 2),
    amplitude: rand(0.6, 1.8),
    layer: Math.floor(rand(0, 3)),
    rotationBase: rand(-15, 15),
  }));
}

// ─── Skill level → glow color / shadow ───────────────────────────────────────
const glowColor = (level: number, isDark: boolean) => {
  const a = isDark ? 0.9 : 0.85;
  if (isDark) {
    if (level >= 5) return `rgba(249,115,22,${0.7 * a})`; // orange-500
    if (level >= 4) return `rgba(245,158,11,${0.6 * a})`; // amber-500
    if (level >= 3) return `rgba(252,211,77,${0.55 * a})`; // amber-300
    return `rgba(212,212,216,${0.4 * a})`; // zinc-300
  }
  if (level >= 5) return `rgba(234,88,12,${0.7 * a})`; // orange-600
  if (level >= 4) return `rgba(217,119,6,${0.6 * a})`; // amber-600
  if (level >= 3) return `rgba(251,191,36,${0.55 * a})`; // amber-400
  return `rgba(148,163,184,${0.4 * a})`; // slate-400
};

const glowShadow = (level: number, isDark: boolean) => {
  if (isDark) {
    if (level >= 5)
      return "0 0 18px 4px rgba(249,115,22,0.45),  0 0 40px 8px rgba(249,115,22,0.15)";
    if (level >= 4)
      return "0 0 14px 3px rgba(245,158,11,0.40),  0 0 32px 6px rgba(245,158,11,0.12)";
    if (level >= 3)
      return "0 0 12px 2px rgba(252,211,77,0.35),  0 0 28px 5px rgba(252,211,77,0.10)";
    return "0 0 8px  2px rgba(212,212,216,0.20)";
  }
  // Light – softer diffuse lift
  if (level >= 5)
    return "0 6px 28px rgba(234,88,12,0.28),  0 2px 8px rgba(234,88,12,0.18)";
  if (level >= 4)
    return "0 6px 24px rgba(217,119,6,0.24),  0 2px 8px rgba(217,119,6,0.14)";
  if (level >= 3)
    return "0 5px 20px rgba(251,191,36,0.20),  0 2px 6px rgba(251,191,36,0.12)";
  return "0 4px 14px rgba(148,163,184,0.18)";
};

// ─── Add this near the top of the file ───────────────────────────────────────
// Shared mutable ref: iconId → current { x, y } in pixels
type PosMap = Record<string, { x: number; y: number }>;

// ─── FloatingSkillIcon — add posRef prop and write to it every frame ──────────
function FloatingSkillIcon({
  icon,
  mouseX,
  mouseY,
  scrollY,
  isDark,
  posRef,
}: {
  icon: FloatingIcon;
  mouseX: number;
  mouseY: number;
  scrollY: number;
  isDark: boolean;
  posRef: React.MutableRefObject<PosMap>;
}) {
  const tok = isDark ? THEMES.dark : THEMES.light;
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: icon.x, y: icon.y });

  const animRef = useRef<number>(0);
  const hoveredRef = useRef<boolean>(false);
  const elapsedRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const speed = 0.001;
    let lastTimestamp = performance.now();

    const update = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      if (!hoveredRef.current) {
        elapsedRef.current += delta * speed;
        const t = elapsedRef.current;
        setPos((prev) => {
          let nx =
            prev.x + icon.speedX * Math.sin(t + icon.phase) * icon.amplitude;
          let ny =
            prev.y +
            icon.speedY * Math.cos(t * 0.7 + icon.phase) * icon.amplitude;
          if (nx < 2 || nx > 93) icon.speedX *= -1;
          if (ny < 2 || ny > 93) icon.speedY *= -1;
          nx = Math.max(2, Math.min(93, nx));
          ny = Math.max(2, Math.min(93, ny));
          return { x: nx, y: ny };
        });
      }

      // Write actual screen position to shared posRef
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        posRef.current[icon.id] = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }

      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const layerFactor = [0.008, 0.018, 0.032][icon.layer];
  const scrollFactor = [0.03, 0.07, 0.14][icon.layer];
  const mouseOffsetX = (mouseX - 50) * layerFactor;
  const mouseOffsetY = (mouseY - 50) * layerFactor;
  const scrollOffset = scrollY * scrollFactor;
  const finalX = `calc(${pos.x}vw + ${mouseOffsetX}vw)`;
  const finalY = `calc(${pos.y}vh + ${mouseOffsetY}vh - ${scrollOffset * 0.1}px)`;
  const baseOpacity = tok.layerOpacity[icon.layer as 0 | 1 | 2];

  return (
    <motion.div
      ref={(node) => {
        divRef.current = node; // ← single clean ref, no merging needed
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.5 : 1,
        rotate: hovered ? 0 : icon.rotationBase,
        opacity: hovered ? 1 : baseOpacity,
        filter: hovered ? tok.imgFilterHover : tok.imgFilter,
      }}
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 18 },
        rotate: { type: "spring", stiffness: 180, damping: 14 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
      }}
      style={{
        position: "fixed",
        left: finalX,
        top: finalY,
        zIndex: 2 + icon.layer,
        pointerEvents: "auto",
        cursor: "pointer",
        willChange: "transform",
      }}
      onClick={() => {
        document
          .querySelector("#skills")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? glowShadow(icon.skill.skillLevel, isDark)
            : tok.cardShadow,
        }}
        transition={{ duration: 0.25 }}
        style={{
          "--card-size": `${icon.size}px`,
          borderRadius: 5,
          background: hovered ? tok.cardBgHover : tok.cardBg,
          backdropFilter: "blur(12px) saturate(1.5)",
          WebkitBackdropFilter: "blur(12px) saturate(1.5)",
          border: hovered
            ? `1.5px solid ${glowColor(icon.skill.skillLevel, isDark)}`
            : `1px solid ${tok.cardBorder}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: 8,
          transition: "background 0.25s, border 0.25s",
          position: "relative",
          overflow: "hidden",
        } as React.CSSProperties}
        className="w-[calc(var(--card-size)*0.6)] h-[calc(var(--card-size)*0.6)] sm:w-[calc(var(--card-size)*0.8)] sm:h-[calc(var(--card-size)*0.8)] md:w-[var(--card-size)] md:h-[var(--card-size)]"
      >
        {hovered && (
          <motion.div
            initial={{ x: "-120%", skewX: -20 }}
            animate={{ x: "220%" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              width: "40%",
              background: tok.shimmer,
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        )}

        <img
          src={`${ICON_BASE_PATH}${icon.skill.address}`}
          alt={icon.skill.name}
          // We pass the base size as a CSS variable
          style={{ "--base-size": `${icon.size}px` } as React.CSSProperties}
          className={`
            object-cover user-select-none
            w-[50%] h-[50%]
          `}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {hovered && (
          <>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: tok.labelColor,
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              {icon.skill.name}
            </motion.span>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              style={{ display: "flex", gap: 3 }}
            >
              {Array.from({ length: 5 }).map((_, di) => (
                <div
                  key={di}
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background:
                      di < icon.skill.skillLevel
                        ? glowColor(icon.skill.skillLevel, isDark)
                        : tok.dotEmpty,
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── ConnectionLines — reads from posRef instead of recalculating ─────────────
function ConnectionLines({
  icons,
  isDark,
  posRef, // ← NEW
}: {
  icons: FloatingIcon[];
  isDark: boolean;
  posRef: React.MutableRefObject<PosMap>; // ← NEW
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const lineRgb = isDark ? "249,115,22" : "234,88,12";
    const maxAlpha = isDark ? 0.5 : 0.4;
    const threshold = 280;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Use actual icon positions from the shared ref ──
      const positions = icons
        .map((ic) => posRef.current[ic.id])
        .filter(Boolean); // skip icons not yet measured

      for (let a = 0; a < positions.length; a++) {
        for (let b = a + 1; b < positions.length; b++) {
          const pa = positions[a];
          const pb = positions[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * maxAlpha;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(${lineRgb},${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [icons, isDark, posRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}

// ─── SkillsBackground — create posRef and pass it down ───────────────────────
export default function SkillsBackground() {
  const { isDark } = useTheme();
  const [icons] = useState<FloatingIcon[]>(() => buildIcons(skillList));
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);

  // ── Shared position map ──
  const posRef = useRef<PosMap>({}); // ← NEW

  const smoothMouseX = useSpring(useMotionValue(50), {
    stiffness: 60,
    damping: 20,
  });
  const smoothMouseY = useSpring(useMotionValue(50), {
    stiffness: 60,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      smoothMouseX.set(x);
      smoothMouseY.set(y);
    },
    [smoothMouseX, smoothMouseY],
  );

  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  const tok = isDark ? THEMES.dark : THEMES.light;

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 80vw 80vh at ${mousePos.x}% ${mousePos.y}%,
              ${tok.gradientA} 0%, transparent 65%),
            radial-gradient(ellipse 60vw 60vh at ${100 - mousePos.x}% ${100 - mousePos.y}%,
              ${tok.gradientB} 0%, transparent 60%)
          `,
          transition: "background 0.08s linear",
        }}
      />

      {/* Pass posRef to both */}
      <div className="sm:block hidden">
        <ConnectionLines icons={icons} isDark={isDark} posRef={posRef} />
      </div>

      {icons.map((icon) => (
        <FloatingSkillIcon
          key={icon.id}
          icon={icon}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          scrollY={scrollY}
          isDark={isDark}
          posRef={posRef} // ← NEW
        />
      ))}
    </>
  );
}
