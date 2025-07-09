import React, { useEffect, useState, useRef } from "react";
import style from "./BackgroundIcons.module.css";
import AcrobaticLoader from "../../animations/AcrobaticLoader";
import skills from "../../data/skills.json";
import generateRandomKeyframes from "./MoveImageAnimation";
import Cookies from "js-cookie";

const BackgroundIcons = () => {
  const [skillsList, setSkillsList] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [iconPositions, setIconPositions] = useState({});
  const iconsRef = useRef([]);

  useEffect(() => {
    setSkillsList(skills);
  }, []);

  // Load positions from session cookies when the component mounts
  useEffect(() => {
    const savedPositions = Cookies.get("iconPositions");
    if (savedPositions) {
      setIconPositions(JSON.parse(savedPositions));
    }
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

  const calculateTransform = (image, index) => {
    const { x, y } = mousePosition;
    const imageRect = image.getBoundingClientRect();
    const imageCenterX = imageRect.left + imageRect.width / 2;
    const imageCenterY = imageRect.top + imageRect.height / 2;

    const deltaX = imageCenterX - x;
    const deltaY = imageCenterY - y;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 2000;
    const avoidanceFactor = Math.max(0, (maxDistance - distance) / maxDistance);

    const offsetX = deltaX * avoidanceFactor * 200;
    const offsetY = deltaY * avoidanceFactor * 200;

    const newPosition = { x: offsetX, y: offsetY };

    // Store positions in state
    setIconPositions((prev) => {
      const updatedPositions = { ...prev, [index]: newPosition };
      Cookies.set("iconPositions", JSON.stringify(updatedPositions)); // Store in cookies
      return updatedPositions;
    });

    return `translate(${newPosition.x}px, ${newPosition.y}px)`;
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
                transform: iconPositions[index]
                  ? `translate(${iconPositions[index].x}px, ${iconPositions[index].y}px)`
                  : ref
                  ? calculateTransform(ref, index)
                  : "",
                visibility: imageLoading && "hidden",
                animation: `moveImage${index} 20s ease-in-out infinite`,
                transition: "transform 40ms ease",
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
