"user-client";

import React, { useEffect, useState, useRef } from "react";
import style from "./BackgroundIcons.module.css";
import generateRandomKeyframes from "./MoveImageAnimation";
// import Cookies from "js-cookie";
import { CircleUserIcon } from "lucide-react";
import { skillList } from "../../../data/skills";
interface Position {
  x: number;
  y: number;
}

export interface Skill {
  name: string;
  address: string;
}

const BackgroundIcons: React.FC = () => {
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [iconPositions, setIconPositions] = useState<Record<number, Position>>(
    {}
  );
  const iconsRef = useRef<(HTMLImageElement | null)[]>([]);

  // Load skills
  useEffect(() => {
    setSkillsList(skillList);
  }, []);

  // // Load from cookies
  // useEffect(() => {
  //   const savedPositions = Cookies.get("iconPositions");
  //   if (savedPositions) {
  //     try {
  //       setIconPositions(JSON.parse(savedPositions));
  //     } catch (e) {
  //       console.error("Failed to parse cookie:", e);
  //     }
  //   }
  // }, []);

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate icons away from mouse
  useEffect(() => {
    const newPositions: Record<number, Position> = {};

    iconsRef.current.forEach((image, index) => {
      if (!image) return;

      const { x, y } = mousePosition;
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = centerX - x;
      const deltaY = centerY - y;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const maxDistance = 2000;
      const avoidanceFactor = Math.max(
        0,
        (maxDistance - distance) / maxDistance
      );

      const offsetX = deltaX * avoidanceFactor * 200;
      const offsetY = deltaY * avoidanceFactor * 200;

      newPositions[index] = { x: offsetX, y: offsetY };
    });

    setIconPositions(newPositions);
    // Cookies.set("iconPositions", JSON.stringify(newPositions));
  }, [mousePosition]);

  // Inject keyframes once
  useEffect(() => {
    const styleSheet = [...document.styleSheets].find(
      (sheet) => !sheet.href || sheet.href.startsWith(window.location.origin)
    );

    if (!styleSheet || !("insertRule" in styleSheet)) return;

    skillsList.forEach((_, index) => {
      const keyframes = generateRandomKeyframes(index);
      try {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      } catch (err) {
        console.error("Insert rule failed:", err);
      }
    });
  }, [skillsList]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <>
      {imageLoading && <CircleUserIcon />}
      <div className={`${style.imageContainer} `}>
        {skillsList.map((image, index) => {
          return (
            <img
              key={index}
              src={`/uploads/${image.address}`}
              alt={image.name}
              className={`${style.image} ${
                style[image.name.toLowerCase().split(" ").join("")]
              }`}
              ref={(el) => (iconsRef.current[index] = el)}
              style={{
                transform: iconPositions[index]
                  ? `translate(${iconPositions[index].x}px, ${iconPositions[index].y}px)`
                  : "translate(0px, 0px)",
                visibility: imageLoading ? "hidden" : "visible",
                animation: `moveImage${index} 20s ease-in-out infinite`,
                transition: "transform 40ms ease",
              }}
              onLoad={
                index === skillsList.length - 1 ? handleImageLoad : undefined
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default BackgroundIcons;
