import React from "react";
import style from "./About.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";

const AboutMe = () => {
  return (
    <>
      <div className={style.container}>
        <h2>About Me</h2>
        <p>
          Results-driven software professional dedicated to leveraging
          technology for enhanced applications. Skilled in Frontend and Backend
          development.
        </p>
        {/* <p>
          Currently based in Hyderabad, India. Feel free to contact me at{" "}
          <a href="tel:+916301863490">+916301863490</a> or{" "}
          <a href="mailto:pavan49450@gmail.com">pavan49450@gmail.com</a>.
        </p> */}

        <div className={style.section}>
          <h3>Education</h3>
          <p>
            B.Tech in Mechanical Engineering from CMR Institute of Technology,
            Medchal (Jun 2018 — Sep 2021). Graduated with a CGPA of 8.28.
          </p>
        </div>

        <div className={style.section}>
          <h3>Experience</h3>
          <p>
            Assistant System Engineer at Tata Consultancy Services, Kolkata (Jan
            2022 — Aug 2023):
          </p>
          <ul>
            <li>
              Spearheaded the development of the payments component in the
              Tata-Pay application, utilizing React and integrating APIs for
              secure payment processes.
            </li>
            <li>
              Played a key role in performance enhancement initiatives,
              optimizing Tata-Pay application's responsiveness and efficiency.
            </li>
            <li>
              Applied React expertise to the frontend development of forms in
              the CSM project, contributing to user-centric design principles.
            </li>
          </ul>
        </div>

        <div className={style.section}>
          <h3>Achievements</h3>
          <p>TCS Training Kolkata (Feb 2022 — Mar 2022):</p>
          <ul>
            <li>
              Attained the highest score among peers during TCS training,
              showcasing a strong grasp of concepts and dedication.
            </li>
            <li>
              Mentored fellow trainees in understanding React concepts during
              TCS training.
            </li>
          </ul>

          <p>Pearlthoughts Internship Chennai (Nov 2023 — Dec 2024):</p>
          <ul>
            <li>
              Led and supervised a cohort of interns at PearlThoughts for a
              month, cultivating an environment that thrived on collaboration
              and knowledge exchange.
            </li>
            <li>
              Prioritized mentorship, actively engaging interns in insightful
              discussions and hands-on projects to enhance their professional
              development.
            </li>
            <li>
              Established a positive and inclusive atmosphere, encouraging
              teamwork and fostering a dynamic learning culture among the
              interns.
            </li>
          </ul>
        </div>
      </div>
      <div className={style.overlay}>
        <BackgroundIcons />
      </div>
    </>
  );
};

export default AboutMe;
