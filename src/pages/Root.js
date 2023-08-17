import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
// import { useState } from "react";
import style from "./Root.module.css";

const RootLayout = () => {
  return (
    <div className={style.root}>
      <Header />

      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
