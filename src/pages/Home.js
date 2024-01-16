import BackgroundIcons from "../components/Background/BackgroundIcons";
import style from "./Home.module.css";

const HomePage = () => {
  return (
    <div className={style.homeContent}>
      <div className={style.title}>
        <span className={style.title__main}>
          Hi I'm <span className={style.name}>Kattula Pavan Kumar</span>
        </span>
        <span> I build and design web applications</span>
      </div>
      <BackgroundIcons />
    </div>
  );
};

export default HomePage;
