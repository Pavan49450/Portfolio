import React from "react";
import style from "./AcrobaticLoader.module.css";
const AcrobaticLoader = () => {
  return (
    <div className={style.loader}>
      <div className={style["loader div"]}></div>
      <div className={style["loader div"]}></div>
      <div className={style["loader div"]}></div>
      <div className={style["loader div"]}></div>
    </div>
  );
};

export default AcrobaticLoader;
