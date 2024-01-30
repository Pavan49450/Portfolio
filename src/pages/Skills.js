import { useEffect, useState } from "react";
import style from "./Skills.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";

const Skills = () => {
  const { isLoading, sendRequest, error } = useHttps();
  const [skillsList, setSkillsList] = useState([]);

  const fetchSkillsData = (data) => {
    setSkillsList(data);
    console.log(data);
  };

  useEffect(() => {
    sendRequest({ url: URL.backendUrl + "/skills" }, fetchSkillsData);
  }, [sendRequest]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Container className={style.container}>
        <Title title={"SKILLS"} />
        <h3 style={{ margin: "0", marginLeft: "2rem" }}>Technical Skills</h3>
        <ul className={style.skills}>
          {isLoading ? (
            <AcrobaticLoader />
          ) : (
            skillsList.map((skill, index) => (
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
            ))
          )}
        </ul>
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default Skills;
