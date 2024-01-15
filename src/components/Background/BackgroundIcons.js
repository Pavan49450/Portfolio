import React, { useEffect } from "react";
import c from "../../assets/c.png";
import css from "../../assets/css3.png";
import git from "../../assets/git.png";
import gitHub from "../../assets/github.png";
import html from "../../assets/html5.png";
import java from "../../assets/icons8-java-480.png";
import typescript from "../../assets/icons8-typescript-480.png";
import javascript from "../../assets/javascript.png";
import mongodb from "../../assets/mongodb.png";
import node from "../../assets/node-js.png";
import python from "../../assets/python.png";
import react from "../../assets/react.png";
import vscode from "../../assets/visual-studio-code.png";
import style from "./BackgroundIcons.module.css";
import GenerateRandomKeyframes from "./MoveImageAnimation";

const BackgroundIcons = () => {
  useEffect(() => {
    console.log(GenerateRandomKeyframes(0));
  }, []);

  const dynamicStyles = Array.from({ length: 12 }, (_, index) =>
    GenerateRandomKeyframes(index)
  ).join("\n");

  return (
    <div>
      <style>{dynamicStyles}</style>
      <div className={style.imageContainer}>
        <img
          src={c}
          alt="C"
          className={style.image}
          style={GenerateRandomKeyframes(0)}
        />
        <img
          src={css}
          alt="CSS"
          className={style.image}
          style={GenerateRandomKeyframes(1)}
        />
        <img
          src={git}
          alt="Git"
          className={style.image}
          style={GenerateRandomKeyframes(2)}
        />
        <img
          src={gitHub}
          alt="GitHub"
          className={style.image}
          style={GenerateRandomKeyframes(3)}
        />
        <img
          src={html}
          alt="HTML"
          className={style.image}
          style={GenerateRandomKeyframes(4)}
        />
        <img
          src={java}
          alt="Java"
          className={style.image}
          style={GenerateRandomKeyframes(5)}
        />
        <img
          src={typescript}
          alt="TypeScript"
          className={style.image}
          style={GenerateRandomKeyframes(6)}
        />
        <img
          src={javascript}
          alt="JavaScript"
          className={style.image}
          style={GenerateRandomKeyframes(7)}
        />
        <img
          src={mongodb}
          alt="MongoDB"
          className={style.image}
          style={GenerateRandomKeyframes(8)}
        />
        <img
          src={node}
          alt="Node.js"
          className={style.image}
          style={GenerateRandomKeyframes(9)}
        />
        <img
          src={python}
          alt="Python"
          className={style.image}
          style={GenerateRandomKeyframes(10)}
        />
        <img
          src={react}
          alt="React"
          className={style.image}
          style={GenerateRandomKeyframes(11)}
        />
        <img
          src={vscode}
          alt="VSCode"
          className={style.image}
          style={GenerateRandomKeyframes(12)}
        />
      </div>
    </div>
  );
};

export default BackgroundIcons;
