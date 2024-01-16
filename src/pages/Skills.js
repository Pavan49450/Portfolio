import React from "react";

const Skills = () => {
  const skillsList = [
    "React",
    "MongoDB",
    "Node.js",
    "Express.js",
    "Next.js",
    "React-Native",
    "JavaScript",
    "HTML/CSS",
    "TypeScript",
    "SQL",
    "Git",
    "Selenium",
    "Robot Framework",
  ];

  return (
    <div>
      <h2>Skills</h2>
      <ul>
        {skillsList.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
