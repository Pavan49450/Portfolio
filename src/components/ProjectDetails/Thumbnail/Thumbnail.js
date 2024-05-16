import CustomImage from "../../../UI/Image/Image";
import CircularLoader from "../../../animations/CircularLoader";
import URL from "../../../constants/url";
import { NextButton, PreviousButton } from "../ImageButtons/ImageButtons";
import style from "./Thumbnail.module.css";

const Thumbnail = ({
  setLoading,
  project,
  navigateImage,
  currentImage,
  handleImageLoaded,
  loading,
  openOverlay,
}) => {
  return (
    <div className={style.thumbnailContainer}>
      <PreviousButton
        setLoading={setLoading}
        project={project}
        navigateImage={navigateImage}
      />

      <div style={{ position: "relative" }}>
        <img
          src={`${URL.backendUrl}/image/${project.images[currentImage]}`}
          alt={project.title}
          className={style.thumbnail}
          onLoad={handleImageLoaded}
          // onClick={() => openOverlay(currentImage)}
        />
        {loading && <CircularLoader />}
        <CustomImage
          src={require(`../../../assets/icons/expand.png`)}
          alt={`expand icon`}
          className={style.expand}
          classForDiv={style.expandContainer}
          onClick={() => openOverlay(currentImage)}
        />
      </div>
      {/* {nextButton} */}
      <NextButton
        setLoading={setLoading}
        project={project}
        navigateImage={navigateImage}
      />
    </div>
  );
};

export default Thumbnail;
