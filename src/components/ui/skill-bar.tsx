import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  gradient: string;
  delay?: number;
  isVisible: boolean;
}

export function SkillBar({ name, level, gradient, delay = 0, isVisible }: SkillBarProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setAnimatedLevel(level);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, level, delay]);

  return (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          className={`skill-bar bg-gradient-to-r ${gradient} h-2 rounded-full`}
          initial={{ width: "0%" }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
