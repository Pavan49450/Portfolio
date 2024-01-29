// ProjectDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import style from "./ProjectDetail.module.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const { isLoading, sendRequest } = useHttps();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Fetch project details only if id is not null
    if (id) {
      sendRequest({ url: `${URL.backendUrl}/projects/${id}` }, setProject);
    }
  }, [id, sendRequest]);

  const openOverlay = (index) => {
    setCurrentImage(index);
    setShowOverlay(true);
  };

  const closeOverlay = (e) => {
    if (e.target.classList.contains(style.overlay)) {
      setShowOverlay(false);
    }
  };

  const navigateImage = (step) => {
    setCurrentImage(
      (prev) => (prev + step + project.images.length) % project.images.length
    );
  };

  const nextButton = (
    <div className={style.previousButton}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/11181/11181468.png"
        alt="previous"
        style={{
          transform: "rotate(180deg)",
        }}
        onClick={() => navigateImage(-1)}
      />
    </div>
  );

  const previousButton = (
    <div className={style.nextButton}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/11181/11181468.png"
        alt="next"
        onClick={() => navigateImage(1)}
      />
    </div>
  );

  return (
    <>
      {isLoading ? (
        <AcrobaticLoader />
      ) : (
        <div className={style.container}>
          {project && (
            <div className={style.thumbnailContainer}>
              {previousButton}
              <img
                src={project.images[currentImage]}
                alt={project.title}
                className={style.thumbnail}
                onClick={() => openOverlay(currentImage)}
              />
              {nextButton}
              {/* {ActionsButtons} */}
            </div>
          )}
          <div className={style.details}>
            <div className={style.titleHead}>
              <h2 className={style.title}>{project && project.title}</h2>
              <p className={style.background}>
                ({project && project.projectBackground})
              </p>
            </div>
            <div className={style.description}>
              {project &&
                project.description.map((description, index) => (
                  <p key={index}>{description}</p>
                ))}
            </div>
            <div className={style.links}>
              {project && project.websiteLink && (
                <a href={project.websiteLink} target="_blank" rel="noreferrer">
                  Website
                </a>
              )}
              {project && project.gitLink && (
                <a href={project.gitLink} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {showOverlay && (
        <div className={style.overlay} onClick={closeOverlay}>
          <div className={style.modal}>
            {previousButton}
            <img
              src={project && project.images[currentImage]}
              alt={project && project.title}
              className={style.modalImage}
            />
            {nextButton}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
