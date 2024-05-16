import CircularLoader from "../../../animations/CircularLoader";
import URL from "../../../constants/url";
import { NextButton, PreviousButton } from "../ImageButtons/ImageButtons";
import style from "./ImageOverlay.module.css";

const ImageOverlay = ({
  closeOverlay,
  currentImage,
  project,
  handleImageLoaded,
  loading,
  setLoading,
  navigateImage,
}) => {
  return (
    <>
      <style>{"body{ overflow:hidden; height:100vh}"}</style>
      <div className={style.overlay} onClick={closeOverlay}></div>

      <PreviousButton
        setLoading={setLoading}
        project={project}
        navigateImage={navigateImage}
      />
      <div className={style.modal}>
        {/* {previousButton}
         */}
        <img
          src={
            project && `${URL.backendUrl}/image/${project.images[currentImage]}`
          }
          alt={project && project.title}
          className={style.modalImage}
          onLoad={handleImageLoaded}
        />
        {loading && <CircularLoader />}
        {/* {nextButton} */}

        <img
          src={require("../../../assets/icons/collapse.png")}
          alt=""
          onClick={closeOverlay}
          className={style.closeButton}
        />
      </div>
      <NextButton
        setLoading={setLoading}
        project={project}
        navigateImage={navigateImage}
      />
    </>
  );
};

export default ImageOverlay;
