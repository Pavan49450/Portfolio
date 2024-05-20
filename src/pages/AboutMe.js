// AboutMe.js
import React, { useEffect, useState } from "react";
import style from "./About.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import AboutSectionItem from "../components/About/AboutSectionItem";

import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";
import aboutMe from "../data/aboutMe.json";

const AboutMe = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(aboutMe);
  }, [aboutMe]);

  return (
    <>
      <Container className={style.container}>
        <Title title={"ABOUT ME"} />

        <p className={style.summary}>
          <h2 style={{ margin: "1rem 0" }}>Overview</h2>
          Results-driven software professional dedicated to leveraging
          technology for enhanced applications. Skilled in Frontend and Backend
          development.
        </p>
        {sections.map((section, index) => (
          <AboutSectionItem key={index} {...section} />
        ))}
        {/* </>
        )} */}
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default AboutMe;
