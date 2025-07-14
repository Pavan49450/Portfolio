import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Grid3X3,
  Calendar,
  Users,
  Code,
  Star,
} from "lucide-react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { ProjectCard } from "../ui/project-card";
import { projects } from "../../data/projects";
import { Badge } from "../ui/badge";
import { IoArrowBackSharp } from "react-icons/io5";

// ---------------
// ✅ Project Interface
// ---------------
interface Project {
  title: string;
  liveUrl: string;
  codeUrl: string;
  description: string;
  image: string;
  tags: string[];
  detailedInfo: {
    gallery: string[];
    fullDescription: string;
    features: string[];
    duration: string;
    teamSize: string;
    role: string;
    technologies: string[];
    challenges: string;
  };
}

// ---------------
// ✅ Component
// ---------------
export function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] =
    useState<boolean>(false);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsProjectDetailsOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="cursor-pointer"
              onClick={() => openProjectDetails(project)}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => {
              setSelectedProject(null);
              setIsProjectDetailsOpen(true);
            }}
          >
            <Grid3X3 className="w-5 h-5 mr-2" />
            View All Projects ({projects.length})
          </Button>
        </div>

        {/* Modal for Project Details or All Projects */}
        <Dialog
          open={isProjectDetailsOpen}
          onOpenChange={setIsProjectDetailsOpen}
        >
          <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto scroll-container px-4 sm:px-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                {selectedProject ? (
                  <div className="flex justify-start items-center">
                    <Button
                      variant="ghost"
                      className="text-sm underline text-muted-foreground mr-2"
                      onClick={() => setSelectedProject(null)}
                    >
                      <IoArrowBackSharp />
                    </Button>
                    <span>{selectedProject.title}</span>
                  </div>
                ) : (
                  `All Projects (${projects.length})`
                )}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-start">
                {selectedProject
                  ? "Detailed project information and showcase"
                  : "Click on any project to view detailed information"}
              </DialogDescription>
            </DialogHeader>

            {selectedProject ? (
              // Project Detail View
              <div className="space-y-6 mt-6">
                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.detailedInfo.gallery.map(
                    (image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      />
                    )
                  )}
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground">
                    <Code className="w-5 h-5 text-primary" />
                    Project Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.detailedInfo.fullDescription}
                  </p>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.detailedInfo.features.map(
                        (feature: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Duration:
                      </span>
                      <span className="text-muted-foreground">
                        {selectedProject.detailedInfo.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Team Size:
                      </span>
                      <span className="text-muted-foreground">
                        {selectedProject.detailedInfo.teamSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">Role:</span>
                      <span className="text-muted-foreground">
                        {selectedProject.detailedInfo.role}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                    {selectedProject.detailedInfo.technologies.map(
                      (tech: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gradient-to-r from-primary/10 to-orange-600/10"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">
                    Key Challenges
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.detailedInfo.challenges}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 max-[600px]:flex-col">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90"
                  >
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Project
                    </a>
                  </Button>

                  {selectedProject.codeUrl !== "#" && (
                    <Button variant="outline" asChild>
                      <a
                        href={selectedProject.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              // All Projects Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
