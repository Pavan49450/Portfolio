import style from "./Title.module.css";

const Title = ({ title }) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{title}</h2>
    </div>
  );
};

export default Title;
