// ProjectItem.js
import { Link, useNavigate } from "react-router-dom";
import style from "./ProjectItem.module.css";
import CustomImage from "../../UI/Image/Image";
import URL from "../../constants/url";

export default function ProjectItem({ index, project }) {
  const navigate = useNavigate();
  return (
    <div
      key={index}
      className={style.project}
      onClick={() => {
        navigate(`/projects/${project._id.$oid}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {/* <div className={style.flipper}> */}
      <div className={style.front}>
        {project.images && (
          <CustomImage
            // src={`${URL.backendUrl}/image/${project.images[0]}`}
            src={require(`../../assets/uploads/${project.images[0]}`)}
            alt="projectImage"
            className={style.image}
            classForDiv={style.wrapper}
          />
        )}
      </div>
      <h3 className={style.subHeading}>{project.title}</h3>
      {/* <div className={`${style.back} ${style.titleWrapper}`}> */}
      {/* </div> */}
    </div>
    // </div>
  );
}
