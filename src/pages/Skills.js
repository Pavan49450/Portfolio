import { useEffect, useState } from "react";
import style from "./Skills.module.css";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";
import CustomImage from "../UI/Image/Image";
import skills from "../data/skills.json";

const Skills = () => {
  // const { isLoading, sendRequest, error } = useHttps();
  // const [skillsList, setSkillsList] = useState([]);

  // useEffect(() => {
  //   setSkillsList(skills);
  // }, [skills]);

  return (
    <>
      {/* {isLoading && <AcrobaticLoader />} */}
      <Container className={style.container}>
        <Title title={"SKILLS"} />
        <div className={style.skills}>
          <h3
            // style={{ margin: "0", marginLeft: "2rem" }}
            className={style.subHeading}
          >
            Technical Skills
          </h3>
          {skills.map((skill, index) => (
            <div className={style.skill} key={index}>
              <span>{skill.name}</span>
              <CustomImage
                // src={`${URL.backendUrl}/image/${skill.address}`}
                src={require(`../assets/uploads/${skill.address}`)}
                alt={skill.name}
                className={style.skillIcons}
                classForDiv={style.skillIconsContainer}
              />
              <div
                className={style.tooltip}
              >{`Skill Level - ${skill.skillLevel}`}</div>
            </div>
          ))}
        </div>
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default Skills;
