import React, { useEffect, useState } from "react";
import style from "./Projects.module.css";
import ProjectItem from "../components/Projects/ProjectItem";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";
import projects from "../data/projects.json";

const Projects = () => {
  const [projectsList, setProjectList] = useState([]);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  return (
    <>
      <Container className={style.container}>
        <Title title={"PROJECTS"} />
        <div className={style.projectClub}>
          <div className={style.projects}>
            <h2 className={style.subHeading}>Projects on Work</h2>
            {projectsList.map((project, index) => (
              <>
                {project.projectBackground === "professional" && (
                  <ProjectItem index={index} project={project} key={index} />
                )}
              </>
            ))}
          </div>

          <div className={style.projects}>
            <h2 className={style.subHeading}>Practice Projects</h2>
            {projectsList.map((project, index) => (
              <>
                {project.projectBackground === "learning" && (
                  <ProjectItem index={index} project={project} key={index} />
                )}
              </>
            ))}
          </div>
        </div>
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default Projects;
