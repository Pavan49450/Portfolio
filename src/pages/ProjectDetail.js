import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import style from "./ProjectDetail.module.css";
import CustomImage from "../UI/Image/Image";
import Container from "../UI/Container/Container";
import Title from "../UI/Title/Title";
import CircularLoader from "../animations/CircularLoader";
import ImageOverlay from "../components/ProjectDetails/ImageOverlay/ImageOverlay";
import {
  NextButton,
  PreviousButton,
} from "../components/ProjectDetails/ImageButtons/ImageButtons";
import Thumbnail from "../components/ProjectDetails/Thumbnail/Thumbnail";
import DetailsHead from "../components/ProjectDetails/DetailsHead/DetailsHead";

const ProjectDetail = () => {
  const { id } = useParams();
  const { isLoading, sendRequest } = useHttps();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const fetchData = (data) => {
    setProject(data);
  };

  useEffect(() => {
    if (id) {
      sendRequest({ url: `${URL.backendUrl}/projects/${id}` }, fetchData);
    }
  }, [id, sendRequest]);

  const openOverlay = (index) => {
    setCurrentImage(index);
    setShowOverlay(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const closeOverlay = (e) => {
    if (e.target.classList.contains(style.overlay)) {
    }
    setShowOverlay(false);
  };

  const navigateImage = (step) => {
    setCurrentImage(
      (prev) => (prev + step + project.images.length) % project.images.length
    );
  };

  useEffect(() => {
    console.log(currentImage);
  }, [currentImage]);

  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };
  const overlay = (
    <>
      <style>{"body{ overflow:hidden; height:100vh}"}</style>
      <div className={style.overlay} onClick={closeOverlay}>
        <div className={style.modal}>
          {/* {previousButton}
           */}
          <PreviousButton
            setLoading={setLoading}
            project={project}
            navigateImage={navigateImage}
          />
          <img
            src={
              project &&
              `${URL.backendUrl}/image/${project.images[currentImage]}`
            }
            alt={project && project.title}
            className={style.modalImage}
            onLoad={handleImageLoaded}
          />
          {loading && <CircularLoader />}
          {/* {nextButton} */}
          <NextButton
            setLoading={setLoading}
            project={project}
            navigateImage={navigateImage}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {isLoading ? (
        <AcrobaticLoader />
      ) : (
        <Container>
          <Title
            title={"Project Details"}
            websiteLink={project && project.websiteLink}
            gitLink={project && project.gitLink}
          />

          <div className={style.container}>
            <DetailsHead project={project} />
            {project && (
              <Thumbnail
                closeOverlay={closeOverlay}
                currentImage={currentImage}
                project={project}
                handleImageLoaded={handleImageLoaded}
                loading={loading}
                setLoading={setLoading}
                navigateImage={navigateImage}
                openOverlay={openOverlay}
              />
            )}
            <ul className={style.description}>
              {project &&
                project.description.map((description, index) => (
                  <li key={index}>{description}</li>
                ))}
            </ul>
          </div>
        </Container>
      )}
      {
        showOverlay && (
          <ImageOverlay
            closeOverlay={closeOverlay}
            currentImage={currentImage}
            project={project}
            handleImageLoaded={handleImageLoaded}
            loading={loading}
            setLoading={setLoading}
            navigateImage={navigateImage}
          />
        )
        // { overlay }
      }
    </>
  );
};

export default ProjectDetail;
