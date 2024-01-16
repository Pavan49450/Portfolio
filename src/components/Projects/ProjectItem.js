import style from "./ProjectItem.module.css";

export default function ProjectItem({ index, project }) {
  return (
    <div key={index} className={style.project}>
      <h3>{project.title}</h3>
      <p>{project.duration}</p>
      <p>{project.description}</p>
    </div>
  );
}
