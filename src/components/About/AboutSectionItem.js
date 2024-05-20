import style from "./AboutSectionItem.module.css";
import CustomImage from "../../UI/Image/Image";
import URL from "../../constants/url";

function AboutSectionItem({ title, details }) {
  // useEffect(() => {
  //   console.log(details);
  // });

  return (
    <div className={style.section}>
      <h3>{title}</h3>
      {details.map((detail, index) => (
        <div key={index} className={style.details}>
          {title !== "Certifications" ? (
            <CustomImage
              // src={`${URL.backendUrl}/image/${detail.logo}`}
              src={require(`../../assets/uploads/${detail.logo}`)}
              alt={detail.logo}
              className={style.logo}
            />
          ) : (
            <CustomImage
              src={`${detail.logo}`}
              alt={detail.logo}
              className={style.logo}
            />
          )}
          <div style={{ width: "100%" }}>
            <div className={style.subHeading}>
              <p style={{ fontWeight: "bold", color: "black" }}>
                {detail.subHeading}
              </p>
              <span>{detail.location}</span>
            </div>
            <span>{detail.period}</span>

            {/* Check if link is present before rendering */}
            {detail.link ? (
              <a href={detail.link} target="_blank" rel="noreferrer">
                Certificate Link 🔗
              </a>
            ) : null}

            {detail.content && (
              <ul>
                {detail.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutSectionItem;
