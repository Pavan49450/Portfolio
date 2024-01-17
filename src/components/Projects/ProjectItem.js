import style from "./ProjectItem.module.css";

export default function ProjectItem({ index, project }) {
  return (
    <div key={index} className={style.project}>
      <div className={style.subHeading}>
        <h3>{project.title}</h3>
        <p>{project.duration}</p>
      </div>
      {project.description.map((description, index) => (
        <ul key={index}>
          <li>{description}</li>
        </ul>
      ))}
    </div>
  );
}
