import { motion } from "framer-motion";
import { ProjectCard } from "../ui/project-card";
import { projects, type Project } from "../../data/projects";

interface AllProjectsProps {
  onProjectSelect: (project: Project) => void;
}

export function AllProjects({ onProjectSelect }: AllProjectsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="cursor-pointer"
          onClick={() => onProjectSelect(project)}
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </div>
  );
}
