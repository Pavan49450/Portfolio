import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import style from "./Root.module.css";
import Footer from "../components/Layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import ContactMe from "../components/ContactMe/ContactMe";
import { Toaster } from "react-hot-toast";
const RootLayout = () => {
  return (
    <div className={style.root}>
      <Toaster />
      <Header />
      <main className={style.main}>
        <Analytics />
        <Outlet />
      </main>
      <ContactMe />

      <Footer />
    </div>
  );
};
export default RootLayout;
