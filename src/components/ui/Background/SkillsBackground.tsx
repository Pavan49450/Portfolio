"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillList } from "../../../data/skills";
import { THEMES } from "../../../data/Themes";
import { useTheme } from "../use-theme";

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
  size: number;
  phase: number;
  amplitude: number;
  layer: 0 | 1 | 2;
  rotationBase: number;
}

// Mutable per-icon simulation state — lives outside React, mutated every frame.
interface IconSim {
  x: number; // vw %
  y: number; // vh %
  speedX: number;
  speedY: number;
  w: number; // measured px size
  h: number;
  cx: number; // current screen center px
  cy: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const ICON_BASE_PATH = "/images/skills/";
const SCROLL_FACTOR = [0.003, 0.007, 0.014] as const;
const LINE_THRESHOLD = 280;
const LINE_THRESHOLD_SQ = LINE_THRESHOLD * LINE_THRESHOLD;
const HOVER_SCALE = 1.5;

function buildIcons(skills: Skill[]): { icons: FloatingIcon[]; sims: IconSim[] } {
  const icons: FloatingIcon[] = [];
  const sims: IconSim[] = [];
  for (const skill of skills) {
    icons.push({
      id: skill._id.$oid,
      skill,
      size: rand(80, 100),
      phase: rand(0, Math.PI * 2),
      amplitude: rand(0.6, 1.8),
      layer: Math.floor(rand(0, 3)) as 0 | 1 | 2,
      rotationBase: rand(-15, 15),
    });
    sims.push({
      x: rand(5, 90),
      y: rand(5, 90),
      speedX: rand(0.012, 0.03) * (Math.random() > 0.5 ? 1 : -1),
      speedY: rand(0.008, 0.022) * (Math.random() > 0.5 ? 1 : -1),
      w: 0,
      h: 0,
      cx: -9999,
      cy: -9999,
    });
  }
  return { icons, sims };
}

// ─── Skill level → glow color / shadow ───────────────────────────────────────
const glowColor = (level: number, isDark: boolean) => {
  const a = isDark ? 0.9 : 0.85;
  if (isDark) {
    if (level >= 5) return `rgba(249,115,22,${0.7 * a})`;
    if (level >= 4) return `rgba(245,158,11,${0.6 * a})`;
    if (level >= 3) return `rgba(252,211,77,${0.55 * a})`;
    return `rgba(212,212,216,${0.4 * a})`;
  }
  if (level >= 5) return `rgba(234,88,12,${0.7 * a})`;
  if (level >= 4) return `rgba(217,119,6,${0.6 * a})`;
  if (level >= 3) return `rgba(251,191,36,${0.55 * a})`;
  return `rgba(148,163,184,${0.4 * a})`;
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
  if (level >= 5)
    return "0 6px 28px rgba(234,88,12,0.28),  0 2px 8px rgba(234,88,12,0.18)";
  if (level >= 4)
    return "0 6px 24px rgba(217,119,6,0.24),  0 2px 8px rgba(217,119,6,0.14)";
  if (level >= 3)
    return "0 5px 20px rgba(251,191,36,0.20),  0 2px 6px rgba(251,191,36,0.12)";
  return "0 4px 14px rgba(148,163,184,0.18)";
};

// ─── FloatingSkillIcon — pure presentational; position is set imperatively ───
const FloatingSkillIcon = memo(function FloatingSkillIcon({
  icon,
  isDark,
  hovered,
  registerEl,
}: {
  icon: FloatingIcon;
  isDark: boolean;
  hovered: boolean;
  registerEl: (id: string, el: HTMLDivElement | null) => void;
}) {
  const tok = isDark ? THEMES.dark : THEMES.light;
  const baseOpacity = tok.layerOpacity[icon.layer];

  return (
    <div
      ref={(el) => registerEl(icon.id, el)}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: hovered ? 10 : 2 + icon.layer,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translate3d(-9999px,-9999px,0)",
      }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: hovered ? HOVER_SCALE : 1,
          rotate: hovered ? 0 : icon.rotationBase,
          opacity: hovered ? 1 : baseOpacity,
          boxShadow: hovered
            ? glowShadow(icon.skill.skillLevel, isDark)
            : tok.cardShadow,
        }}
        transition={{
          scale: { type: "spring", stiffness: 260, damping: 18 },
          rotate: { type: "spring", stiffness: 180, damping: 14 },
          opacity: { duration: 0.3 },
          boxShadow: { duration: 0.25 },
        }}
        style={
          {
            "--card-size": `${icon.size}px`,
            borderRadius: 5,
            background: hovered ? tok.cardBgHover : tok.cardBg,
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
          } as React.CSSProperties
        }
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
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="object-contain select-none w-[50%] h-[50%]"
          style={{
            filter: hovered ? tok.imgFilterHover : tok.imgFilter,
            transition: "filter 0.3s",
          }}
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
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
});

// ─── SkillsBackground — single rAF loop drives everything ────────────────────
export default function SkillsBackground() {
  const { isDark } = useTheme();
  const [{ icons, sims }] = useState(() => buildIcons(skillList));
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const elsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -99999, y: -99999, moved: true });
  const hoveredIdxRef = useRef(-1);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  // Stable callback so memoized icons don't re-render.
  const registerElRef = useRef((id: string, el: HTMLDivElement | null) => {
    elsRef.current[id] = el;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    const linesMq = window.matchMedia("(min-width: 640px)");
    let W = window.innerWidth;
    let H = window.innerHeight;

    const measure = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      if (canvas) {
        canvas.width = W;
        canvas.height = H;
      }
      icons.forEach((ic, i) => {
        const el = elsRef.current[ic.id];
        const card = el?.firstElementChild as HTMLElement | null;
        if (card) {
          sims[i].w = card.offsetWidth;
          sims[i].h = card.offsetHeight;
        }
      });
    };
    measure();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moved = true;
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        mouseRef.current.x = -99999;
        mouseRef.current.y = -99999;
        mouseRef.current.moved = true;
      }
    };

    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onLeave);

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      const delta = Math.min(now - last, 64); // clamp after tab switch
      last = now;
      elapsed += delta * 0.001;
      const t = elapsed;
      const scrollY = window.scrollY;
      const hoveredIdx = hoveredIdxRef.current;

      // 1. Move icons (transform only — no layout, no React)
      for (let i = 0; i < icons.length; i++) {
        const ic = icons[i];
        const s = sims[i];
        if (i !== hoveredIdx) {
          const nx = s.x + s.speedX * Math.sin(t + ic.phase) * ic.amplitude;
          const ny = s.y + s.speedY * Math.cos(t * 0.7 + ic.phase) * ic.amplitude;
          if (nx < 2 || nx > 93) s.speedX *= -1;
          if (ny < 2 || ny > 93) s.speedY *= -1;
          s.x = nx < 2 ? 2 : nx > 93 ? 93 : nx;
          s.y = ny < 2 ? 2 : ny > 93 ? 93 : ny;
        }
        const px = (s.x / 100) * W;
        const py = (s.y / 100) * H - scrollY * SCROLL_FACTOR[ic.layer];
        s.cx = px + s.w / 2;
        s.cy = py + s.h / 2;
        const el = elsRef.current[ic.id];
        if (el) el.style.transform = `translate3d(${px}px,${py}px,0)`;
      }

      // 2. Hover hit-test (icons sit under page content, so DOM hover can't reach them)
      const m = mouseRef.current;
      let hit = -1;
      let hitLayer = -1;
      for (let i = 0; i < icons.length; i++) {
        const s = sims[i];
        const k = i === hoveredIdx ? HOVER_SCALE / 2 : 0.5;
        if (
          Math.abs(m.x - s.cx) <= s.w * k &&
          Math.abs(m.y - s.cy) <= s.h * k &&
          (icons[i].layer > hitLayer || i === hoveredIdx)
        ) {
          hit = i;
          hitLayer = i === hoveredIdx ? 99 : icons[i].layer;
        }
      }
      if (hit !== hoveredIdx) {
        hoveredIdxRef.current = hit;
        setHoveredId(hit === -1 ? null : icons[hit].id);
      }

      // 3. Mouse-follow gradient — only when mouse moved, via CSS vars
      if (m.moved && gradientRef.current && m.x > -9999) {
        gradientRef.current.style.setProperty("--mx", `${(m.x / W) * 100}%`);
        gradientRef.current.style.setProperty("--my", `${(m.y / H) * 100}%`);
        gradientRef.current.style.setProperty("--imx", `${100 - (m.x / W) * 100}%`);
        gradientRef.current.style.setProperty("--imy", `${100 - (m.y / H) * 100}%`);
      }
      m.moved = false;

      // 4. Connection lines
      if (ctx && canvas) {
        ctx.clearRect(0, 0, W, H);
        if (linesMq.matches) {
          const lineRgb = isDarkRef.current ? "249,115,22" : "234,88,12";
          const maxAlpha = isDarkRef.current ? 0.5 : 0.4;
          ctx.lineWidth = 1.5;
          for (let a = 0; a < sims.length; a++) {
            const pa = sims[a];
            for (let b = a + 1; b < sims.length; b++) {
              const pb = sims[b];
              const dx = pa.cx - pb.cx;
              const dy = pa.cy - pb.cy;
              const d2 = dx * dx + dy * dy;
              if (d2 < LINE_THRESHOLD_SQ) {
                const alpha = (1 - Math.sqrt(d2) / LINE_THRESHOLD) * maxAlpha;
                ctx.strokeStyle = `rgba(${lineRgb},${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.moveTo(pa.cx, pa.cy);
                ctx.lineTo(pb.cx, pb.cy);
                ctx.stroke();
              }
            }
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [icons, sims]);

  // Click on a hovered icon (anywhere not interactive) → jump to skills.
  useEffect(() => {
    if (!hoveredId) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a,button,input,textarea,select,[role=button]")) return;
      document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
    };
    document.body.style.cursor = "pointer";
    document.addEventListener("click", onClick);
    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("click", onClick);
    };
  }, [hoveredId]);

  const tok = isDark ? THEMES.dark : THEMES.light;

  return (
    <>
      <div
        ref={gradientRef}
        aria-hidden
        style={
          {
            "--mx": "50%",
            "--my": "50%",
            "--imx": "50%",
            "--imy": "50%",
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(ellipse 80vw 80vh at var(--mx) var(--my),
                ${tok.gradientA} 0%, transparent 65%),
              radial-gradient(ellipse 60vw 60vh at var(--imx) var(--imy),
                ${tok.gradientB} 0%, transparent 60%)
            `,
          } as React.CSSProperties
        }
      />

      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {icons.map((icon) => (
        <FloatingSkillIcon
          key={icon.id}
          icon={icon}
          isDark={isDark}
          hovered={hoveredId === icon.id}
          registerEl={registerElRef.current}
        />
      ))}
    </>
  );
}
