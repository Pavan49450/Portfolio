import React from "react";
import style from "./Projects.module.css";
import ProjectItem from "../components/Projects/ProjectItem";
import BackgroundIcons from "../components/Background/BackgroundIcons";

const Projects = () => {
  const projectsList = [
    {
      title: "Tata Pay",
      duration: "Mar 2023 — Aug 2023",
      description: [
        "Pioneered the development of the payments component within the Tata-Pay application, leveraging React to elevate the overall user experience.",
        "Held a pivotal role in seamlessly integrating APIs, with a particular emphasis on UPI and Net banking functionalities, ensuring robust and secure payment processes.",
        "Actively participated in performance enhancement initiatives, implementing optimizations to boost the application7s responsiveness and efficiency.",
      ],
    },
    {
      title: "CSM Project",
      duration: "Mar 2022 — Dec 2024",
      description: [
        "Applied React for the frontend development of forms in the CSM project, crafting intuitive and visually appealing interfaces to optimize user interactions.",
        "Demonstrated proficiency in React to enhance the user interface of the CSM application, aligning development efforts with the project7s goals and user-centric design principles. Collaborated with project stakeholders to gather requirements, providing valuable insights and contributing to strategic decision-making processes.",
      ],
    },
    {
      title: "Schedula",
      duration: "Sep 2023 — Nov 2024",
      description: [
        "Developed a sophisticated web application using Next.js and Nest.js for the Schedula-web project at PearlThoughts, facilitating seamless appointment scheduling between patients and doctors.",
        "Incorporated advanced web technologies like to enhance the overall user experience, showcasing a commitment to cutting-edge solutions.",
      ],
    },
    {
      title: "Unistock",
      duration: "Nov 2024 — Jan 2024",
      description: [
        'Led the development of login and signup pages for "niStock," an Android-based E-Commerce application tailored for the pharmaceutical industry.',
        "Played a key role as a contributor, embracing a systematic Scrum methodology and utilizing Jira for efficient project management.",
      ],
    },
    {
      title: "Zoggy Foods",
      duration: "Nov 2024 — Jan 2024",
      description: [
        "Initiated a crucial role in the development of an online food ordering app for the Zoggy Foods project at PearlThoughts, streamlining the food ordering process.",
        "Streamlined the food ordering process, providing users with a convenient and efficient platform for satisfying culinary cravings.",
      ],
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
      <BackgroundIcons />
    </>
  );
};

export default Projects;
