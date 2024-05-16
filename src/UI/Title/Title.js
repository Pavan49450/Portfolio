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
            className={style.icons}
            classForDiv={style.icons}
            // style={{ width: "30px" }}
          />
        </a>
      )}
      {gitLink && gitLink && (
        <a href={gitLink} target="_blank" rel="noreferrer" title="GitHub Link">
          <CustomImage
            src="https://cdn-icons-png.flaticon.com/128/733/733609.png"
            alt="github"
            className={style.icons}
            classForDiv={style.icons}

            // style={{ width: "30px" }}
          />
        </a>
      )}
    </div>
  );

  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      {Links}
    </div>
  );
};

export default Title;
