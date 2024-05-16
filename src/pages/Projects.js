import React, { useEffect, useState } from "react";
import style from "./Projects.module.css";
import ProjectItem from "../components/Projects/ProjectItem";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";

const Projects = () => {
  const { isLoading, sendRequest, error } = useHttps();
  const [projectsList, setProjectList] = useState([]);

  const fetchProjectsData = (data) => {
    // Handle the fetched data here
    setProjectList(data);
    console.log(data);
  };

  useEffect(() => {
    sendRequest({ url: URL.backendUrl + "/projects" }, fetchProjectsData);
  }, [sendRequest]);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {isLoading && <AcrobaticLoader />}
      <Container className={style.container}>
        <Title title={"PROJECTS"} />
        <div className={style.projectClub}>
          {!isLoading && (
            <>
              <div className={style.projects}>
                <h2 className={style.subHeading}>Projects on Work</h2>
                {projectsList.map((project, index) => (
                  <>
                    {project.projectBackground === "professional" && (
                      <ProjectItem
                        index={index}
                        project={project}
                        key={index}
                      />
                    )}
                  </>
                ))}
              </div>
            </>
          )}
          {!isLoading && (
            <>
              <div className={style.projects}>
                <h2 className={style.subHeading}>Practice Projects</h2>
                {projectsList.map((project, index) => (
                  <>
                    {project.projectBackground === "learning" && (
                      <ProjectItem
                        index={index}
                        project={project}
                        key={index}
                      />
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default Projects;
