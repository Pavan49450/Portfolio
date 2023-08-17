import backgroundImage from "../assets/backgroubdImage-1.jpg";
import style from "./Home.module.css";

const HomePage = () => {
  return (
    <div className={style.homeContent}>
      <div className={style.title}>
        <span className={style.title__main}>
          Hi I'm <span style={{ color: "red", fontSize: "100px" }}>Pavan</span>
        </span>
        <span> I build and design web applications</span>
      </div>
      <img src={backgroundImage} alt="background"></img>
    </div>
  );
};

export default HomePage;
