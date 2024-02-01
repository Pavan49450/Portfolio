import CustomImage from "../Image/Image";
import style from "./Title.module.css";

const Title = ({ title, gitLink, websiteLink }) => {
  const Links = (
    <div className={style.links}>
      {websiteLink && websiteLink && (
        <a
          href={websiteLink}
          target="_blank"
          rel="noreferrer"
          title="Website Link"
        >
          <CustomImage
            src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png "
            alt="website"
            style={{ width: "30px" }}
          />
        </a>
      )}
      {gitLink && gitLink && (
        <a href={gitLink} target="_blank" rel="noreferrer" title="GitHub Link">
          <CustomImage
            src="https://cdn-icons-png.flaticon.com/128/733/733609.png"
            alt="github"
            style={{ width: "30px" }}
          />
        </a>
      )}
    </div>
  );

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>
        {title}
        <div className={style.dot1}></div>
        <div className={style.dot2}></div>
        <div className={style.dot3}></div>
        <div className={style.dot4}></div>
      </h2>
      {Links}
    </div>
  );
};

export default Title;
