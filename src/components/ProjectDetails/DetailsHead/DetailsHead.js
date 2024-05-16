import { Link } from "react-router-dom";
import style from "./DetailsHead.module.css";

const DetailsHead = ({ project }) => {
  return (
    <div className={style.detailsHead}>
      {/* {projectLinks} */}
      <div className={style.titleHead}>
        <Link
          to={"/projects"}
          style={{
            fontSize: "40px",
            textDecoration: "none",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/589/654/non_2x/vector-back-icon.jpg"
            alt="Back Arrow"
            style={{ width: "40px" }}
          ></img>
        </Link>
        <h2 className={style.title}>{project && project.title}</h2>
        <p className={style.background}>
          ({project && project.projectBackground})
        </p>
      </div>
    </div>
  );
};

export default DetailsHead;
