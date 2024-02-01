// ProjectItem.js
import { Link } from "react-router-dom";
import style from "./ProjectItem.module.css";
import CustomImage from "../../UI/Image/Image";

export default function ProjectItem({ index, project }) {
  return (
    <div key={index} className={style.project}>
      <Link to={`/projects/${project._id}`} style={{ textDecoration: "none" }}>
        <div className={style.flipper}>
          <div className={style.front}>
            {project.images && (
              <CustomImage
                src={project.images[0]}
                alt="projectImage"
                className={style.image}
                classForDiv={style.wrapper}
              />
            )}
          </div>
          <div className={`${style.back} ${style.titleWrapper}`}>
            <h3>{project.title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
