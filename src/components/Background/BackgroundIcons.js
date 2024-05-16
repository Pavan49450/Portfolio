import React, { useEffect, useState } from "react";
import style from "./BackgroundIcons.module.css";
import generateRandomKeyframes from "./MoveImageAnimation";
import useHttps from "../../hooks/use-https";
import URL from "../../constants/url";
import AcrobaticLoader from "../../animations/AcrobaticLoader";

const duration = 20;

const BackgroundIcons = () => {
  const { isLoading, sendRequest, error } = useHttps();
  const [skillsList, setSkillsList] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);

  const fetchSkillsData = (data) => {
    setSkillsList(data);
    // console.log(data);
  };

  useEffect(() => {
    sendRequest({ url: URL.backendUrl + "/skills" }, fetchSkillsData);
  }, [sendRequest]);

  if (error) {
    return <p>{error}</p>;
  }

  const dynamicStyles = Array.from({ length: skillsList.length }, (_, index) =>
    generateRandomKeyframes(index)
  ).join("\n");

  const handleImageLoad = () => {
    // console.log("hey");
    setImageLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <AcrobaticLoader />
      ) : (
        <>
          {imageLoading && <AcrobaticLoader />}
          <style>{dynamicStyles}</style>
          <div className={style.imageContainer}>
            {skillsList.map((image, index) => (
              <img
                key={index}
                src={`${URL.backendUrl}/image/${image.address}`}
                alt={image.name}
                className={`${style.image} ${
                  style[image.name.toLowerCase().split(" ").join("")]
                }`}
                style={{
                  animation: `moveImage${index} ${duration}s ease-in-out infinite`,
                  visibility: imageLoading && "hidden",
                }}
                onLoad={
                  index === skillsList.length - 1 ? handleImageLoad : null
                }
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BackgroundIcons;
