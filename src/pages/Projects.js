import React, { useEffect, useState } from "react";
import style from "./Projects.module.css";
import ProjectItem from "../components/Projects/ProjectItem";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";

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
  }, []);

  // Rest of your component

  return (
    <>
      <div className={style.container}>
        <h2>PROJECTS</h2>
        {isLoading ? (
          <AcrobaticLoader />
        ) : (
          <div className={style.projects}>
            {projectsList.map((project, index) => (
              <ProjectItem index={index} project={project} key={index} />
            ))}
          </div>
        )}
      </div>
      <BackgroundIcons />
    </>
  );
};

export default Projects;
