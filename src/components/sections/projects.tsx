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
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { ProjectCard } from "../ui/project-card";
import { projects } from "../../data/projects";
import { Badge } from "../ui/badge";

import { IoArrowBackSharp } from "react-icons/io5";

// Featured projects to show in main section (top 3)
const featuredProjects = projects.slice(0, 3);

// Project Details Modal Component
// function ProjectDetailsModal({
//   project = null,
//   isOpen,
//   onClose,
//   setIsAllProjectsOpen,
//   openProjectDetails,
// }) {
//   if (!project) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scroll-container">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
//             {project.title}
//           </DialogTitle>
//           <DialogDescription className="text-muted-foreground">
//             Detailed project information and showcase
//           </DialogDescription>
//         </DialogHeader>

//         {project && (
//           <div className="space-y-6 mt-6">
//             {/* Project Gallery */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {project.detailedInfo.gallery.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`${project.title} screenshot ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
//                 />
//               ))}
//             </div>

//             {/* Full Description */}
//             <div>
//               <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground {">
//                 <Code className="w-5 h-5 text-primary" />
//                 Project Overview
//               </h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 {project.detailedInfo.fullDescription}
//               </p>
//             </div>

//             {/* Project Details Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Project Info */}

//               {/* Key Features */}
//               <div>
//                 <h4 className="font-semibold mb-3 text-foreground ">
//                   Key Features
//                 </h4>
//                 <ul className="space-y-2">
//                   {project.detailedInfo.features.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-2 text-sm">
//                       <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
//                       <span className="text-muted-foreground">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-primary" />
//                   <span className="font-medium text-foreground ">
//                     Duration:
//                   </span>
//                   <span className="text-muted-foreground">
//                     {project.detailedInfo.duration}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-primary" />
//                   <span className="font- text-foreground ">Team Size:</span>
//                   <span className="text-muted-foreground">
//                     {project.detailedInfo.teamSize}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 text-primary" />
//                   <span className="font-medium text-foreground ">Role:</span>
//                   <span className="text-muted-foreground">
//                     {project.detailedInfo.role}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             {/* Technologies */}
//             <div>
//               <h4 className="font-semibold mb-3 text-foreground ">
//                 Technologies Used
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {project.detailedInfo.technologies.map((tech, index) => (
//                   <Badge
//                     key={index}
//                     variant="secondary"
//                     className="bg-gradient-to-r from-primary/10 to-orange-600/10"
//                   >
//                     {tech}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             {/* Challenges */}
//             <div>
//               <h4 className="font-semibold mb- text-foreground ">
//                 Key Challenges
//               </h4>
//               <p className="text-muted-foreground leading-relaxed">
//                 {project.detailedInfo.challenges}
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 pt-4">
//               <Button
//                 asChild
//                 className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90"
//               >
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <ExternalLink className="w-4 h-4 mr-2" />
//                   View Live Project
//                 </a>
//               </Button>

//               {project.codeUrl !== "#" && (
//                 <Button variant="outline" asChild>
//                   <a
//                     href={project.codeUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
//                   >
//                     <Github className="w-4 h-4 mr-2" />
//                     View Source Code
//                   </a>
//                 </Button>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="cursor-pointer"
//               onClick={() => {
//                 setIsAllProjectsOpen(false);
//                 openProjectDetails(project);
//               }}
//             >
//               <ProjectCard {...project} />
//             </motion.div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

export function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setIsProjectDetailsOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
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
        <div className="flex justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => {
              setSelectedProject(null); // Reset view
              setIsProjectDetailsOpen(true); // Open the modal
            }}
          >
            <Grid3X3 className="w-5 h-5 mr-2" />
            View All Projects ({projects.length})
          </Button>
        </div>

        {/* View All Projects Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Dialog open={isAllProjectsOpen} onOpenChange={setIsAllProjectsOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Grid3X3 className="w-5 h-5 mr-2" />
                View All Projects ({projects.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                  All Projects ({projects.length})
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Click on any project to view detailed information
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsAllProjectsOpen(false);
                      openProjectDetails(project);
                    }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div> */}

        {/* Project Details Modal */}
        <Dialog
          open={isProjectDetailsOpen}
          onOpenChange={setIsProjectDetailsOpen}
        >
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto scroll-container">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                {selectedProject ? (
                  <div>
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
              <DialogDescription className="text-muted-foreground">
                {selectedProject
                  ? "Detailed project information and showcase"
                  : "Click on any project to view detailed information"}
              </DialogDescription>
            </DialogHeader>

            {selectedProject ? (
              // ✅ Detailed Project View
              <div className="space-y-6 mt-6">
                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.detailedInfo.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedProject.title} screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    />
                  ))}
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

                {/* Grid Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.detailedInfo.features.map(
                        (feature, index) => (
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

                  {/* Info */}
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
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.detailedInfo.technologies.map(
                      (tech, index) => (
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

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
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
              // ✅ Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                    }}
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
