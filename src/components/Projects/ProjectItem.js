import { Link } from "react-router-dom";
import style from "./ProjectItem.module.css";
import CustomImage from "../../UI/Image/Image";

export default function ProjectItem({ index, project }) {
  return (
    <div key={index} className={style.project}>
      <Link to={`/projects/${project._id}`} style={{ textDecoration: "none" }}>
        {/* <div className={style.subHeading}>
          <h3>{project.title}</h3>
          <p>({project.projectBackground})</p>
        </div> */}
        {project.images && (
          <CustomImage
            src={project.images[0]}
            alt="projectImage"
            className={style.image}
            classForDiv={style.wrapper}
          />
        )}
      </Link>
    </div>
  );
}
