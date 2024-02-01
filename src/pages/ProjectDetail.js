import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHttps from "../hooks/use-https";
import URL from "../constants/url";
import AcrobaticLoader from "../animations/AcrobaticLoader";
import style from "./ProjectDetail.module.css";
import CustomImage from "../UI/Image/Image";
import Container from "../UI/Container/Container";
import Title from "../UI/Title/Title";

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
      setShowOverlay(false);
    }
  };

  const navigateImage = (step) => {
    setCurrentImage(
      (prev) => (prev + step + project.images.length) % project.images.length
    );
  };

  const nextButton = (
    <div
      className={style.previousButton}
      style={{
        display: (project && project.images.length) <= 1 ? "none" : "block",
      }}
      onClick={() => navigateImage(-1)}
    >
      <CustomImage
        src="https://cdn-icons-png.flaticon.com/512/11181/11181468.png"
        alt="previous"
        style={{
          transform: "rotate(180deg)",
        }}
        classForDiv={style.btnCenter}
      />
    </div>
  );

  const previousButton = (
    <div
      className={style.nextButton}
      onClick={() => navigateImage(1)}
      style={{
        display: (project && project.images.length) <= 1 ? "none" : "block",
      }}
    >
      <CustomImage
        src="https://cdn-icons-png.flaticon.com/512/11181/11181468.png"
        alt="next"
        classForDiv={style.btnCenter}
      />
    </div>
  );

  // const projectLinks = (
  //   <div className={style.links}>
  //     {project && project.websiteLink && (
  //       <a
  //         href={project.websiteLink}
  //         target="_blank"
  //         rel="noreferrer"
  //         title="Website Link"
  //       >
  //         <CustomImage
  //           src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png "
  //           alt="website"
  //           style={{ width: "30px" }}
  //         />
  //       </a>
  //     )}
  //     {project && project.gitLink && (
  //       <a
  //         href={project.gitLink}
  //         target="_blank"
  //         rel="noreferrer"
  //         title="GitHub Link"
  //       >
  //         <CustomImage
  //           src="https://cdn-icons-png.flaticon.com/128/733/733609.png"
  //           alt="github"
  //           style={{ width: "30px" }}
  //         />
  //       </a>
  //     )}
  //   </div>
  // );

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
            <div className={style.detailsHead}>
              {/* {projectLinks} */}
              <div className={style.titleHead}>
                <Link
                  to={"/projects"}
                  style={{
                    fontSize: "40px",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/000/589/654/non_2x/vector-back-icon.jpg"
                    alt="Back Arrow"
                    style={{ width: "40px" }}
                  ></img>
                </Link>
                <h2 className={style.title}>{project && project.title}</h2>
                <p className={style.background}>
                  ({project && project.projectBackground})
                </p>
              </div>
            </div>
            {project && (
              <div className={style.thumbnailContainer}>
                {previousButton}
                <CustomImage
                  src={project.images[currentImage]}
                  alt={project.title}
                  className={style.thumbnail}
                  onClick={() => openOverlay(currentImage)}
                />
                {nextButton}
              </div>
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
      {showOverlay && (
        <>
          <style>{"body{ overflow:hidden; height:100vh}"}</style>
          <div className={style.overlay} onClick={closeOverlay}>
            <div className={style.modal}>
              {previousButton}
              <CustomImage
                src={project && project.images[currentImage]}
                alt={project && project.title}
                className={style.modalImage}
              />
              {nextButton}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectDetail;
