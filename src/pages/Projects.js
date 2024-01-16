import React from "react";
import style from "./Projects.module.css";
import ProjectItem from "../components/Projects/ProjectItem";
import BackgroundIcons from "../components/Background/BackgroundIcons";

const Projects = () => {
  const projectsList = [
    {
      title: "Tata Pay",
      duration: "Mar 2023 — Aug 2023",
      description:
        "Pioneered the development of the payments component within the Tata-Pay application, leveraging React to elevate the overall user experience.",
    },
    {
      title: "CSM Project",
      duration: "Mar 2022 — Dec 2024",
      description:
        "Applied React for the frontend development of forms in the CSM project, crafting intuitive and visually appealing interfaces to optimize user interactions.",
    },
    {
      title: "Schedula",
      duration: "Sep 2023 — Nov 2024",
      description:
        "Developed a sophisticated web application using Next.js and Nest.js for the Schedula-web project at PearlThoughts, facilitating seamless appointment scheduling between patients and doctors.",
    },
    {
      title: "Unistock",
      duration: "Nov 2024 — Jan 2024",
      description:
        'Led the development of login and signup pages for "niStock," an Android-based E-Commerce application tailored for the pharmaceutical industry.',
    },
    {
      title: "Zoggy Foods",
      duration: "Nov 2024 — Jan 2024",
      description:
        "Initiated a crucial role in the development of an online food ordering app for the Zoggy Foods project at PearlThoughts, streamlining the food ordering process.",
    },
  ];

  return (
    <>
      <div className={style.container}>
        <h2>Projects</h2>
        {projectsList.map((project, index) => (
          <ProjectItem index={index} project={project} />
        ))}
      </div>
      <div className={style.overlay}>
        <BackgroundIcons />
      </div>
    </>
  );
};

export default Projects;
