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
          subHeading: "Full Stack Developer, Pearlthoughts",
          location: "Chennai",
          period: "Sep 2023 — Jan 2024",
          content: [
            "Spearheaded the development of Schedula, a robust doctor appointment scheduling platform, utilizing React for the frontend, Node.js for the backend, and emphasizing the power of PostgreSQL for a secure and scalable database. ",
            "Engineered Unistock, an Android E-commerce platform for bulk medicine sales, emphasizing React Native for mobile development and PostgreSQL for a high-performance database. Utilized Azure's cloud capabilities to optimize resource utilization and ensure seamless scalability.",
            "Developed Zoggy Foods, a dynamic food ordering app, with an emphasis on React Native for Android development and PostgreSQL for a robust and scalable database. Leveraged Azure for cloud services, enhancing the platform's scalability and reliability.",
          ],

          logo: "pearlthoughts-logo.jpeg",
        },
        {
          subHeading: "Assistant System Engineer at Tata Consultancy Services,",
          location: "Kolkata",
          period: "Jan 2022 — Aug 2023",
          content: [
            "Spearheaded the development of Tata-Pay's payment module with React, integrating UPI and Net banking functionalities for a secure payment process. ",
            "Achieved a 20% reduction in page load times through performance optimizations in Tata-Pay, enhancing overall user experience and satisfaction.",
            "Utilized React expertise to optimize form interactions in the CSM project, contributing to a 15% increase in submission rates, and collaborated on strategic decisions resulting in a significant 25% improvement in overall user satisfaction.",
          ],
          logo: "TCS-logo.png",
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
        <h2>ABOUT ME</h2>
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
