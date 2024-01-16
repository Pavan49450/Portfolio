import React from "react";
import style from "./About.module.css";

const AboutMe = () => {
  return (
    <div className={style.container}>
      <h2>About Me</h2>
      <p>
        Results-driven software professional dedicated to leveraging technology
        for enhanced applications. Skilled in Frontend and Backend development.
      </p>
      <p>
        Currently based in Hyderabad, India. Feel free to contact me at{" "}
        <a href="tel:+6301863490">+916301863490</a> or{" "}
        <a href="mailto:pavan49450@gmail.com">pavan49450@gmail.com</a>.
      </p>
    </div>
  );
};

export default AboutMe;
