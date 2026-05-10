import {
  ExternalLink,
  Github,
  Calendar,
  Code2,
  Star,
  Maximize2,
  Zap,
  Clock,
  User,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../ui/button";
import type { Project } from "../../data/projects";
import { useTheme } from "../ui/theme-context";

interface ProjectDetailsProps {
  project: Project;
  setShowImage: (url: string) => void;
}

export function ProjectDetails({ project, setShowImage }: ProjectDetailsProps) {
    const { theme } = useTheme();
      const isDark = theme !== "light";
  return (
    <div className="space-y-10 mt-6 font-[var(--font-body)]">

      {/* ── Gallery ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {project.detailedInfo.gallery.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setShowImage(image)}
            className="group relative cursor-pointer overflow-hidden rounded-[5px] border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 aspect-video focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className={`opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300  rounded-[5px] px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium  shadow-lg ${!isDark ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm" : "bg-zinc-900/90 dark:bg-white/90 backdrop-blur-sm"}`}>
                <Maximize2 className="w-3.5 h-3.5" />
                Expand
              </div>
            </div>
            {/* Index pill */}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-[5px] backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </div>
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      <Section icon={<Code2 className="w-4 h-4" />} label="Project Overview">
        <p className="text-muted-foreground leading-relaxed text-sm">
          {project.detailedInfo.fullDescription}
        </p>
      </Section>

      {/* ── Features + Meta ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Features */}
        <div>
          <SectionLabel icon={<Zap className="w-3.5 h-3.5" />} label="Key Features" />
          <ul className="mt-3 space-y-2.5">
            {project.detailedInfo.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-3 group">
                <span className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-[5px] bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Meta cards */}
        <div className="flex flex-col gap-3">
          <MetaCard
            icon={<Clock className="w-4 h-4 text-primary" />}
            label="Duration"
            value={project.detailedInfo.duration}
          />
          <MetaCard
            icon={<User className="w-4 h-4 text-primary" />}
            label="Role"
            value={project.detailedInfo.role}
          />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <Star className="w-3 h-3 text-primary/40" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      </div>

      {/* ── Technologies ── */}
      <Section icon={<Calendar className="w-4 h-4" />} label="Technologies Used">
        <div className="flex flex-wrap gap-2 mt-1">
          {project.detailedInfo.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-[5px] text-xs font-medium border border-primary/20 bg-gradient-to-br from-primary/8 to-orange-500/8 text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Challenges ── */}
      <div className={`rounded-[5px] border  p-4 ${!isDark ? "text-black border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50" : "text-white border-amber-900/10 bg-amber-50/10"}`}>
        <SectionLabel
          icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
          label="Key Challenges"
          className="text-amber-700 dark:text-amber-400"
        />
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {project.detailedInfo.challenges}
        </p>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          asChild
          size="sm"
          className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 rounded-[5px]"
        >
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3.5 h-3.5 mr-2" />
            Live Project
          </a>
        </Button>

        {project.codeUrl !== "#" && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-zinc-300 dark:border-zinc-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-[5px]"
          >
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-3.5 h-3.5 mr-2" />
              Source Code
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

/* ── Internal helpers ── */

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SectionLabel icon={icon} label={label} />
      <div className="mt-3">{children}</div>
    </div>
  );
}

function SectionLabel({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-primary">{icon}</span>
      <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
        {label}
      </h3>
      <div className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800" />
    </div>
  );
}

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  const { theme } = useTheme();
     const isDark = theme !== "light";   
  return (
    <div className={`flex items-center gap-3 rounded-[5px] border  p-4 ${!isDark ? "text-black border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50" : "text-white border-amber-900/10 bg-amber-50/10"}`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-[5px] bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}