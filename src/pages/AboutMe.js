// AboutMe.js
import React, { useEffect, useState } from "react";
import style from "./About.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import AboutSectionItem from "../components/About/AboutSectionItem";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";

const AboutMe = () => {
  const [sections, setSections] = useState([]);

  const { isLoading, sendRequest, error } = useHttps();

  const fetchMeData = (data) => {
    setSections(data);
    console.log(data);
  };
  useEffect(() => {
    sendRequest({ url: URL.backendUrl + "/aboutme" }, fetchMeData);
  }, [sendRequest]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Container className={style.container}>
        <Title title={"ABOUT ME"} />

        {!isLoading ? (
          <>
            <p className={style.summary}>
              Results-driven software professional dedicated to leveraging
              technology for enhanced applications. Skilled in Frontend and
              Backend development.
            </p>
            {sections.map((section, index) => (
              <AboutSectionItem key={index} {...section} />
            ))}
          </>
        ) : (
          <AcrobaticLoader />
        )}
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default AboutMe;
