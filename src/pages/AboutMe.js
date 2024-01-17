// AboutMe.js
import React from "react";
import style from "./About.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import AboutSectionItem from "../components/About/AboutSectionItem";

const AboutMe = () => {
  const sections = [
    {
      title: "Education",
      details: [
        {
          subHeading: "B.Tech in Mechanical Engineering, CMRIT,",
          location: "Medchal",
          period: "Jun 2018 — Sep 2021",
          content: ["Graduated with a CGPA of 8.28."],
          logo: "CMRIT-logo.jpg",
        },
      ],
    },
    {
      title: "Experience",
      details: [
        {
          subHeading: "Assistant System Engineer at Tata Consultancy Services,",
          location: "Kolkata",
          period: "Jan 2022 — Aug 2023",
          content: [
            "Spearheaded the development of the payments component in the Tata-Pay application, utilizing React and integrating APIs for secure payment processes.",
            "Played a key role in performance enhancement initiatives, optimizing Tata-Pay application's responsiveness and efficiency.",
            "Applied React expertise to the frontend development of forms in the CSM project, contributing to user-centric design principles.",
          ],
          logo: "TCS-logo.png",
        },
        {
          subHeading: "Software Developer, Pearlthoughts",
          location: "Chennai",
          period: "Sep 2023 — Jan 2024",
          content: [
            "Led the development of the Schedula-web project at PearlThoughts, leveraging Next.js and Nest.js to create a sophisticated web application. This innovative solution facilitated seamless appointment scheduling between patients and doctors, showcasing a commitment to cutting-edge technologies and enhancing the overall user experience.",
            "Contributed significantly to the 'niStock project by leading the development of login and signup pages for an Android-based E-Commerce application tailored to the pharmaceutical industry. Played a key role as a contributor, embracing a systematic Scrum methodology and utilizing Jira for efficient project management, ensuring the successful implementation of crucial features.",
            "Played a crucial role in the Zoggy Foods project, focusing on the development of an online food ordering app. Streamlined the food ordering process, providing users with a convenient and efficient platform for satisfying culinary cravings. Demonstrated expertise in user-centric design and project execution, contributing to the overall success of the application.",
          ],
          logo: "pearlthoughts-logo.jpeg",
        },
      ],
    },
    {
      title: "Achievements",
      details: [
        {
          subHeading: "TCS Training",
          location: "Kolkata",
          period: "Feb 2022 — Mar 2022",
          content: [
            "Attained the highest score among peers during TCS training, showcasing a strong grasp of concepts and dedication.",
            "Mentored fellow trainees in understanding React concepts during TCS training.",
          ],
          logo: "TCS-logo.png",
        },
        {
          subHeading: "Pearlthoughts Internship",
          location: "Chennai",
          period: "Nov 2023 — Dec 2024",
          content: [
            "Led and supervised a cohort of interns at PearlThoughts for a month, cultivating an environment that thrived on collaboration and knowledge exchange.",
            "Prioritized mentorship, actively engaging interns in insightful discussions and hands-on projects to enhance their professional development.",
            "Established a positive and inclusive atmosphere, encouraging teamwork and fostering a dynamic learning culture among the interns.",
          ],
          logo: "pearlthoughts-logo.jpeg",
        },
      ],
    },
  ];

  return (
    <>
      <div className={style.container}>
        <h2>About Me</h2>
        <p className={style.summary}>
          Results-driven software professional dedicated to leveraging
          technology for enhanced applications. Skilled in Frontend and Backend
          development.
        </p>

        {sections.map((section, index) => (
          <AboutSectionItem key={index} {...section} />
        ))}
      </div>
      <BackgroundIcons />
    </>
  );
};

export default AboutMe;
