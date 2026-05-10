import { motion } from "framer-motion";
import { Grid3X3, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Modal } from "@mui/material";
import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { ProjectCard } from "../ui/project-card";
import { projects, type Project } from "../../data/projects";
import { ProjectDetails } from "./project-details";
import { AllProjects } from "./all-projects";

// ─── Modal State Machine ───────────────────────────────────────────────────────
type ModalState =
  | { type: "closed" }
  | { type: "all" }
  | { type: "detail"; project: Project; from: "featured" | "all" };

// ─── Featured Hero Card ────────────────────────────────────────────────────────
// function FeaturedHeroCard({
//   project,
//   onClick,
// }: {
//   project: Project;
//   onClick: () => void;
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.3 }}
//       onClick={onClick}
//       className="cursor-pointer group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col lg:flex-row mb-8"
//     >
//       {/* Image side */}
//       <div className="relative lg:w-1/2 aspect-video lg:aspect-auto min-h-[220px] overflow-hidden bg-muted">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           onError={(e) => {
//             (e.currentTarget as HTMLImageElement).style.display = "none";
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
//         {/* Badges on image */}
//         <div className="absolute top-3 left-3 flex gap-2">
//           <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white rounded-full shadow">
//             Production
//           </span>
//           <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary text-white rounded-full shadow">
//             Featured
//           </span>
//         </div>
//       </div>

//       {/* Content side */}
//       <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
//         <div>
//           <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
//             {project.title}
//           </h3>
//           <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
//             {project.description}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {project.tags.map((tag) => (
//               <Badge key={tag} variant="secondary" className="text-xs">
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         </div>
//         <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary">
//           View Project Details
//           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// ─── Projects Section ──────────────────────────────────────────────────────────
export function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [modal, setModal] = useState<ModalState>({ type: "closed" });
  const [showImage, setShowImage] = useState("");

  // const featuredProject = projects[0];
  const sideProjects = projects.slice(0, 3);

  const closeModal = () => setModal({ type: "closed" });
  const openAll = () => setModal({ type: "all" });
  const openDetail = (project: Project, from: "featured" | "all") =>
    setModal({ type: "detail", project, from });

  const handleBack = () => {
    if (modal.type === "detail") {
      if (modal.from === "all") setModal({ type: "all" });
      else closeModal();
    }
  };

  const isModalOpen = modal.type !== "closed";

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
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

        {/* ── Featured Hero Card (first project) ── */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="middle-layer"
        >
          <FeaturedHeroCard
            project={featuredProject}
            onClick={() => openDetail(featuredProject, "featured")}
          />
        </motion.div> */}

        {/* ── Side Projects Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 middle-layer">
          {sideProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="cursor-pointer"
              onClick={() => openDetail(project, "featured")}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* ── View All Button ── */}
        <div className="flex justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white px-8 py-3 rounded-[5px] font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={openAll}
          >
            <Grid3X3 className="w-5 h-5 mr-2" />
            View All Projects ({projects.length})
          </Button>
        </div>

        {/* ── Main Modal ── */}
        <Modal open={isModalOpen} onClose={closeModal}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-full max-w-6xl max-h-[90vh] bg-background border border-border rounded-xl shadow-2xl outline-none flex flex-col overflow-hidden text-foreground">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border shrink-0 gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Back button */}
                {modal.type === "detail" && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {modal.from === "all" ? "All Projects" : "Back"}
                  </button>
                )}

                {/* Breadcrumb separator */}
                {modal.type === "detail" && modal.from === "all" && (
                  <span className="text-muted-foreground/40 text-sm shrink-0">/</span>
                )}

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent truncate">
                  {modal.type === "all"
                    ? `All Projects (${projects.length})`
                    : modal.type === "detail"
                    ? modal.project.title
                    : ""}
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-5 sm:px-6 pb-6">
              {modal.type === "all" && (
                <AllProjects onProjectSelect={(p) => openDetail(p, "all")} />
              )}
              {modal.type === "detail" && (
                <ProjectDetails
                  project={modal.project}
                  setShowImage={setShowImage}
                />
              )}
            </div>
          </div>
        </Modal>

        {/* ── Image Lightbox ── */}
        <Modal open={showImage.length > 0} onClose={() => setShowImage("")}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
            onClick={() => setShowImage("")}
          >
            <img
              src={showImage}
              alt="Project screenshot"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </Modal>
      </div>
    </section>
  );
}
