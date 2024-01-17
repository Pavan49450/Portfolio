import style from "./ProjectItem.module.css";

export default function ProjectItem({ index, project }) {
  return (
    <div key={index} className={style.project}>
      <h3>{project.title}</h3>
      <p>{project.duration}</p>
      {project.description.map((description, index) => (
        <div key={index}>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}
