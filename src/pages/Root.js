import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import style from "./Root.module.css";
import Footer from "../components/Layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const RootLayout = () => {
  return (
    <div className={style.root}>
      <Header />
      <main className={style.main}>
        <Analytics />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default RootLayout;
