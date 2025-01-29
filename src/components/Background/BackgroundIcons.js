import React, { useEffect, useState, useRef } from "react";
import style from "./BackgroundIcons.module.css";
import AcrobaticLoader from "../../animations/AcrobaticLoader";
import skills from "../../data/skills.json";
import generateRandomKeyframes from "./MoveImageAnimation";

const BackgroundIcons = () => {
  const [skillsList, setSkillsList] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const iconsRef = useRef([]);

  useEffect(() => {
    setSkillsList(skills);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    skillsList.forEach((_, index) => {
      const keyframes = generateRandomKeyframes(index);
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
  }, [skillsList]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const calculateTransform = (image) => {
    const { x, y } = mousePosition;
    const imageRect = image.getBoundingClientRect();
    const imageCenterX = imageRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top + imageRect.height / 2;

    const deltaX = imageCenterX - x;
    const deltaY = imageCenterY - y;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 200; // Maximum distance for the icon to move
    const avoidanceFactor = Math.max(0, (maxDistance - distance) / maxDistance);

    const offsetX = deltaX * avoidanceFactor * 2; // Adjust these values for desired sensitivity
    const offsetY = deltaY * avoidanceFactor * 2;

    return `translate(${offsetX}px, ${offsetY}px)`;
  };

  return (
    <>
      {imageLoading && <AcrobaticLoader />}
      <div className={style.imageContainer}>
        {skillsList.map((image, index) => {
          const ref = iconsRef.current[index];
          return (
            <img
              key={index}
              src={require(`../../assets/uploads/${image.address}`)}
              alt={image.name}
              className={`${style.image} ${
                style[image.name.toLowerCase().split(" ").join("")]
              }`}
              ref={(el) => (iconsRef.current[index] = el)}
              style={{
                transform: ref ? calculateTransform(ref) : "", // Ensure ref is defined
                visibility: imageLoading && "hidden",
                animation: `moveImage${index} 20s ease-in-out infinite`,
                transition: "transform 400ms ease",
              }}
              onLoad={index === skillsList.length - 1 ? handleImageLoad : null}
            />
          );
        })}
      </div>
    </>
  );
};

export default BackgroundIcons;
