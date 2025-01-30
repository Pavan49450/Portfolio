import BackgroundIcons from "../components/Background/BackgroundIcons";
import style from "./Home.module.css";
import invertedCommas from "../assets/icons/inverted-comma-left.png";
import invertedCommasR from "../assets/icons/inverted-comma-right.png";

const HomePage = () => {
  return (
    <>
      <div className={`${style.homeContent} transition-all`}>
        <div className="absolute top-8 right-8 backdrop-blur-lg w-fit mx-auto px-6 rounded-3xl ">
          <div className="w-full">
            <img
              src={invertedCommasR}
              alt="commas"
              className="w-[20px] h-[20px]"
            />
          </div>
          <span className="text-xl px-6 py-2">
            Coding Tomorrow's Possibilities
          </span>
          <div className={`w-full flex justify-end  ${style.commas}`}>
            <img
              src={invertedCommas}
              alt="commas"
              className="w-[20px] h-[20px]"
            />
          </div>
        </div>
        <div className={`${style.title}`}>
          <span
            className={`${style.title__main} backdrop-blur-sm w-fit mx-auto px-6 rounded-3xl`}
          >
            Hi I'm <span className={style.name}>Kattula Pavan Kumar</span>
          </span>
          <span className="backdrop-blur-lg w-fit mx-auto px-6 rounded-3xl">
            {" "}
            I build and design applications
          </span>
        </div>
        <BackgroundIcons />
      </div>
    </>
  );
};

export default HomePage;
