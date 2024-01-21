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
            "Spearheaded the development of the payment’s module in Tata-Pay, utilizing React to elevate the user experience. Seamlessly integrated APIs, with a focus on UPI and Net banking functionalities, ensuring robust and secure payment processes. ",
            "Drove performance optimization initiatives for Tata-Pay, implementing enhancements that resulted in a 20% reduction in page load times, enhancing the overall user experience and boosting customer satisfaction. ",
            "Applied React expertise to craft visually appealing interfaces for forms in the CSM project, optimizing user interactions and significantly contributing to a 15% increase in form submission rates.",
            "Collaborated with CSM project stakeholders, providing strategic insights that shaped decision-making processes. Aligned development efforts with project goals and user-centric design principles, resulting in a 25% improvement in overall user satisfaction.",
          ],
          logo: "TCS-logo.png",
        },
        {
          subHeading: "Software Developer, Pearlthoughts",
          location: "Chennai",
          period: "Sep 2023 — Jan 2024",
          content: [
            "Led the development of the Schedula-web project at PearlThoughts, utilizing Next.js (With Typescript) and Nest.js to create a sophisticated web application. Engineered seamless appointment scheduling between patients and doctors, showcasing a commitment to cutting-edge technologies and enhancing the user experience. Resulted in a 30% increase in appointment bookings within the first quarter of launch.",
            "Significantly contributed to the UniStock project by creating login and signup pages for an Android-based E-Commerce application in the pharmaceutical industry created with React Native, driving a 25% improvement in user onboarding efficiency. Played a crucial role in implementing a systematic Scrum methodology and utilizing Jira for efficient project management. Ensured the success of crucial features, delivering projects on time and contributing to a 15% increase in team productivity.",
            "Contributed significantly to the Zoggy Foods project by streamlining the online food ordering app's interface, resulting in a 20% boost in user engagement and a 15% increase in order completion rates. Demonstrated expertise in user-centric design and project execution across diverse industry applications developed by React Native. Emphasized proficiency in developing sophisticated web applications and contributing to E-Commerce projects.",
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
