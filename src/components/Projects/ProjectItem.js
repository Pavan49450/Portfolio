import { Link } from "react-router-dom";
import style from "./ProjectItem.module.css";

export default function ProjectItem({ index, project }) {
  const image = `../../assets/${project.images[0]}`;

  return (
    <div key={index} className={style.project}>
      <Link to={`/projects/${project._id}`} style={{ textDecoration: "none" }}>
        <div className={style.subHeading}>
          <h3>{project.title}</h3>
          <p>({project.projectBackground})</p>
        </div>
        {project.images && (
          <img
            src={project.images[0]}
            alt="projectImage"
            className={style.image}
          />
        )}
        {/* {project.description.map((description, index) => (
          <ul key={index}>
            <li>{description}</li>
          </ul>
        ))}
        <div className={style.links}>
          {project.websiteLink && (
            <a href={project.websiteLink} target="_blank" rel="noreferrer">
              Website
            </a>
          )}
          {project.gitLink && (
            <a href={project.gitLink} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div> */}
      </Link>
    </div>
  );
}
