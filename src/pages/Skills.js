import React from "react";
import style from "./Skills.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
const Skills = () => {
  const skillsList = {
    technicalSkills: [
      { address: "react.png", name: "React", skillLevel: 5 },
      { address: "node-js.png", name: "Node", skillLevel: 4 },
      { address: "sql.png", name: "SQL", skillLevel: 4 },
      { address: "Azure.png", name: "Azure", skillLevel: 4 },
      { address: "mongodb.png", name: "Mongodb", skillLevel: 4 },
      { address: "react.png", name: "React Native", skillLevel: 4 },
      { address: "css3.png", name: "CSS", skillLevel: 4 },
      { address: "html5.png", name: "HTMl", skillLevel: 4 },
      {
        address: "icons8-typescript-480.png",
        name: "Typescript",
        skillLevel: 3,
      },
      { address: "javascript.png", name: "Javascript", skillLevel: 3 },
      { address: "c.png", name: "C++", skillLevel: 3 },
      { address: "git.png", name: "Git", skillLevel: 4 },
      { address: "github.png", name: "Github", skillLevel: 4 },
      { address: "icons8-java-480.png", name: "Java", skillLevel: 2 },
      { address: "python.png", name: "Python", skillLevel: 2 },
      { address: "visual-studio-code.png", name: "VS code", skillLevel: 4 },
    ],
  };

  return (
    <>
      <div className={style.container}>
        <h2>SKILLS</h2>
        <h3 style={{ margin: "0", marginLeft: "2rem" }}>Technical Skills</h3>
        <ul className={style.skills}>
          {skillsList.technicalSkills.map((skill, index) => (
            <div className={style.skill} key={index}>
              <li>{skill.name}</li>
              <img
                src={require(`../assets/${skill.address}`)}
                alt={skill.name}
                className={style.skillIcons}
              />
              <div
                className={style.tooltip}
              >{`Skill Level - ${skill.skillLevel}`}</div>
            </div>
          ))}
        </ul>
      </div>
      <BackgroundIcons />
    </>
  );
};

export default Skills;
