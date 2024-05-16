import CustomImage from "../../../UI/Image/Image";
import style from "./ImageButtons.module.css";

export const NextButton = ({ project, setLoading, navigateImage }) => {
  return (
    <div
      className={style.previousButton}
      style={{
        display: (project && project.images.length) <= 1 ? "none" : "block",
      }}
      onClick={() => {
        setLoading(true);

        navigateImage(-1);
      }}
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
};

export const PreviousButton = ({ setLoading, navigateImage, project }) => {
  return (
    <div
      className={style.nextButton}
      onClick={() => {
        setLoading(true);
        navigateImage(1);
      }}
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
};
