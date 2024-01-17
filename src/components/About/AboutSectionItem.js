import { useEffect } from "react";
import style from "./AboutSectionItem.module.css";

function AboutSectionItem({ title, details }) {
  useEffect(() => {
    console.log(details);
  });
  return (
    <div className={style.section}>
      <h3>{title}</h3>
      {details.map((detail, index) => (
        <div key={index} className={style.details}>
          <img
            src={require(`../../assets/${detail.logo}`)}
            alt={detail.logo}
            className={style.logo}
          />
          <div style={{ width: "100%" }}>
            <div className={style.subHeading}>
              <p style={{ fontWeight: "bold", color: "black" }}>
                {detail.subHeading}
              </p>
              <span>{detail.location}</span>
            </div>
            <span>{detail.period}</span>
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
