import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./ProjectDetail.module.css";
import Container from "../UI/Container/Container";
import Title from "../UI/Title/Title";
import ImageOverlay from "../components/ProjectDetails/ImageOverlay/ImageOverlay";
import Thumbnail from "../components/ProjectDetails/Thumbnail/Thumbnail";
import DetailsHead from "../components/ProjectDetails/DetailsHead/DetailsHead";
import projects from "../data/projects.json";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (id) {
      const filteredProject = projects.find(
        (project) => project._id.$oid === id
      );
      setProject(filteredProject);
    }
  }, [project, id]);

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

  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <>
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
      {showOverlay && (
        <ImageOverlay
          closeOverlay={closeOverlay}
          currentImage={currentImage}
          project={project}
          handleImageLoaded={handleImageLoaded}
          loading={loading}
          setLoading={setLoading}
          navigateImage={navigateImage}
        />
      )}
    </>
  );
};

export default ProjectDetail;
