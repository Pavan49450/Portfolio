import React from "react";
import style from "./BackgroundIcons.module.css";
import generateRandomKeyframes from "./MoveImageAnimation";

const images = [
  { address: "c.png", name: "c" },
  { address: "css3.png", name: "css" },
  { address: "git.png", name: "git" },
  { address: "github.png", name: "github" },
  { address: "html5.png", name: "html" },
  { address: "icons8-java-480.png", name: "java" },
  { address: "icons8-typescript-480.png", name: "typescript" },
  { address: "javascript.png", name: "javascript" },
  { address: "mongodb.png", name: "mongodb" },
  { address: "node-js.png", name: "node" },
  { address: "python.png", name: "python" },
  { address: "react.png", name: "react" },
  { address: "visual-studio-code.png", name: "vscode" },
  { address: "sql.png", name: "sql" },
  { address: "Azure.png", name: "azure" },
];

const duration = 20;

const BackgroundIcons = () => {
  const dynamicStyles = Array.from({ length: images.length }, (_, index) =>
    generateRandomKeyframes(index)
  ).join("\n");

  return (
    <>
      <style>{dynamicStyles}</style>
      <div className={style.imageContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={require(`../../assets/${image.address}`)}
            alt={image.name}
            className={`${style.image} ${style[image.name]}`}
            style={{
              animation: `moveImage${index} ${duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundIcons;
