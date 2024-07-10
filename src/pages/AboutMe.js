// AboutMe.js
import React, { useEffect, useState } from "react";
import style from "./About.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import AboutSectionItem from "../components/About/AboutSectionItem";

import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";
import aboutMe from "../data/aboutMe.json";
import Box from "../UI/Box/Box";

const AboutMe = () => {
  const [sections, setSections] = useState([]);

  const [experience, setExperience] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [education, setEducation] = useState(null);
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    setSections(aboutMe);

    const experienceSection = aboutMe.find(
      (section) =>
        section.title.toString().toLowerCase().trim() === "experience"
    );
    const certificatesSection = aboutMe.find(
      (section) =>
        section.title.toString().toLowerCase().trim() === "certifications"
    );
    const educationSection = aboutMe.find(
      (section) => section.title.toString().toLowerCase().trim() === "education"
    );
    const achievementsSection = aboutMe.find(
      (section) =>
        section.title.toString().toLowerCase().trim() === "achievements"
    );

    setExperience(experienceSection);
    setCertificates(certificatesSection);
    setEducation(educationSection);
    setAchievements(achievementsSection);
  }, [aboutMe]);

  return (
    <>
      <Container className={style.container}>
        <Title title={"ABOUT ME"} />
        <div className="flex flex-col gap-4 mt-8">
          {/* {sections.map((section, index) => (
            <AboutSectionItem key={index} {...section} />
          ))} */}
          <div className="flex gap-4 lg:flex-row flex-col">
            <div className="flex flex-col gap-4">
              <Box className={style.summary}>
                <h2 style={{ margin: "1rem 0" }} className="text-xl">
                  Overview
                </h2>
                Results-oriented software professional with a robust background
                in full-stack development, particularly skilled in React.
                Contributed significantly to the development of sophisticated
                web applications and mobile applications like Schedula-web,
                UniStock, and Zoggy Foods. Proficient in leveraging advanced
                technologies to optimize user experiences and streamline
                processes. Proven ability to collaborate effectively within
                cross-functional teams, contributing to the success of various
                projects.
              </Box>
              {experience && (
                <AboutSectionItem
                  title={experience.title}
                  details={experience.details}
                />
              )}
            </div>
            <div className="flex flex-col gap-4 lg:min-w-96 min-w-min">
              {achievements && (
                <AboutSectionItem
                  title={achievements.title}
                  details={achievements.details}
                />
              )}
              {education && (
                <AboutSectionItem
                  title={education.title}
                  details={education.details}
                />
              )}
            </div>
          </div>
          {certificates && (
            <AboutSectionItem
              title={certificates.title}
              details={certificates.details}
            />
          )}
        </div>

        {/* </>
        )} */}
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default AboutMe;
