import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import {
  TruncateParagraphWithTooltip,
  TruncateWithTooltip,
} from "../ui/truncated-text";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export type Achievement = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  metric?: string;
  badge?: string;
  icon?: "trophy" | "award" | "star" | "rocket" | "zap";
  href?: string;
};

export type AchievementsProps = {
  heading?: string;
  subheading?: string;
  achievements?: Achievement[];
  variant?: "cards" | "timeline";
  className?: string;
};

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
const iconMap: Record<NonNullable<Achievement["icon"]>, LucideIcon> = {
  trophy: Trophy,
  award: Award,
  star: Star,
  rocket: Rocket,
  zap: Zap,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// const shimmer =
//   "before:absolute before:inset-0 before:-translate-x-full before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent before:animate-[shimmer_1.8s_ease_infinite]";

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
export default function AchievementsSection({
  heading = "Achievements",
  subheading = "Milestones, awards, and measurable wins.",
  achievements = defaultAchievements,
  variant = "cards",
  className = "",
}: AchievementsProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="achievements"
      className={`w-full ${className} max-w-[1300px] mx-auto px-6 pt-20 max-[600px]:px-2`}
      aria-label={heading}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        ref={ref}
        className="text-center mb-16"
      >
        <header className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
          {subheading && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </header>

        {variant === "cards" ? (
          <CardsGrid achievements={achievements} />
        ) : (
          <Timeline achievements={achievements} />
        )}
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------
// Cards Variant
// ------------------------------------------------------------
function CardsGrid({ achievements }: { achievements: Achievement[] }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {achievements.map((a) => (
        <motion.li key={a.id}>
          <AchievementCard a={a} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

function AchievementCard({ a }: { a: Achievement }) {
  const Icon = a.icon ? iconMap[a.icon] : Trophy;
  return (
    <article
      // className={`relative h-full rounded-2xl border bg-card text-card-foreground p-3 shadow-sm ring-1 ring-border backdrop-blur supports-[backdrop-filter]:bg-card/80 ${shimmer}`}
      className={`relative h-full rounded-xl  bg-card text-card-foreground p-3 shadow-sm glass-effect`}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-r from-primary text-primary-foreground to-purple-600 shadow-sm">
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <TruncateWithTooltip text={a.title} />
          {a.subtitle && <TruncateParagraphWithTooltip text={a.subtitle} />}
        </div>
        {a.badge && (
          <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {a.badge}
          </span>
        )}
      </div>

      {a.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {a.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground/90">
        {a.metric && (
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {a.metric}
          </span>
        )}
        {a.date && <time className="text-xs opacity-80">{a.date}</time>}
        {a.href && (
          <a
            href={a.href}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-xs font-medium underline underline-offset-4 hover:opacity-80"
          >
            View proof
          </a>
        )}
      </div>
    </article>
  );
}

// ------------------------------------------------------------
// Timeline Variant
// ------------------------------------------------------------
function Timeline({ achievements }: { achievements: Achievement[] }) {
  return (
    <ol className="relative ml-3 border-l border-border">
      {achievements.map((a) => (
        <motion.li
          key={a.id}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="group relative -ml-[9px] pl-8 pt-6"
        >
          <span className="absolute left-0 top-8 inline-flex size-4 -translate-x-1/2 items-center justify-center rounded-full border bg-card ring-2 ring-background" />
          <div className="rounded-2xl border bg-card text-card-foreground p-5 shadow-sm ring-1 ring-border backdrop-blur supports-[backdrop-filter]:bg-card/80 hover:shadow-md">
            <div className="flex items-start gap-3">
              {a.icon && (
                <div className="mt-1">
                  {React.createElement(iconMap[a.icon], {
                    className: "size-5",
                  })}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold leading-tight">
                    {a.title}
                  </h3>
                  {a.badge && (
                    <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {a.badge}
                    </span>
                  )}
                  {a.metric && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                      {a.metric}
                    </span>
                  )}
                  {a.date && (
                    <time className="ml-auto text-xs opacity-80">{a.date}</time>
                  )}
                </div>
                {a.subtitle && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {a.subtitle}
                  </p>
                )}
                {a.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                )}
                {a.href && (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-medium underline underline-offset-4 hover:opacity-80"
                  >
                    View proof
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

// ------------------------------------------------------------
// Example data (remove in production)
// ------------------------------------------------------------
const defaultAchievements: Achievement[] = [
  {
    id: "tcs-1",
    title: "Ranked #1 in TCS training",
    subtitle: "Software development cohort of 50+ trainees",
    description:
      "Helped peers with React modules. scored highest aggregate across practicals and assessments.",
    metric: "#1 / 50+",
    date: "Aug 2022",
    icon: "trophy",
    badge: "Top Performer",
  },
  {
    id: "iaf-letter",
    title: "Appreciation letter from IFA(Indian Air Force)",
    subtitle: "Built school management app (Tettra)",
    description:
      "Designed and delivered a secure, role-based full stack application with attendance, results, and notifications. received official letter of appreciation.",
    metric: "Recognition",
    date: "Jan 2023",
    icon: "award",
    badge: "Recognition",
  },
  {
    id: "stripe-automation",
    title: "Stripe automation: 3-5 days to <5s",
    subtitle: "Structurology • Payments & Webhooks",
    description:
      "Automated invoicing and payment events with webhook orchestration. reduced manual processing time dramatically.",
    metric: "<5 seconds",
    date: "Oct 2024",
    icon: "zap",
    badge: "Impact",
  },
  {
    id: "spile-80",
    title: "SPile+ cut 80% manual calc",
    subtitle: "AI-driven solar pile foundation tool",
    description:
      "Shipped TypeScript + React UI with Node API; embedded rules engine to reduce repetitive engineering work.",
    metric: "-80% effort",
    date: "Nov 2024",
    icon: "rocket",
    badge: "AI/Automation",
  },
  {
    id: "mentored-10",
    title: "Mentored 10+ interns (React)",
    subtitle: "PearlThoughts • React/TypeScript",
    description:
      "Conducted weekly code reviews and live sessions; improved feature delivery speed and code quality across intern projects.",
    metric: "10+ mentees",
    date: "Jan 2024",
    icon: "star",
    badge: "Mentorship",
  },
];
