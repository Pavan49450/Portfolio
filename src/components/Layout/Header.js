import React, { useEffect, useRef, useState } from "react";
import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import CustomImage from "../../UI/Image/Image";

const Logo = () => (
  <div className={`${style.navbar__logo} active:scale-90 transition-all`}>
    <div
      style={{
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "50%",
        height: "100%",
      }}
    >
      <Link to="/" title="Link to home page">
        <CustomImage
          // src={`${URL.backendUrl}/image/Logo.png`}
          src={require("../../assets/uploads/Logo.png")}
          alt="logo"
          title="logo"
        />
      </Link>
    </div>
  </div>
);

const Header = () => {
  const sideNavbarRef = useRef(null);
  const overlayRef = useRef(null);
  const mobileMenuIconRef = useRef(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const breakpoint = 600;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    window.scrollTo(0, 0);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (width < breakpoint) {
      const handleOutsideClick = (event) => {
        if (
          sideNavbarRef.current &&
          !sideNavbarRef.current.contains(event.target) &&
          mobileMenuIconRef.current &&
          !mobileMenuIconRef.current.contains(event.target)
        ) {
          closeMobileMenu();
        }
      };

      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [width]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const navData = [
    { path: "/", label: "HOME", exact: true },
    { path: "/about", label: "ABOUT ME", exact: false },
    { path: "/projects", label: "PROJECTS", exact: false },
    { path: "/skills", label: "SKILLS", exact: false },
    { path: "/services", label: "SERVICES", exact: false },
  ];

  const navElements = (
    <>
      {/* <li>
        <NavLink
          to="/"
          title="Link to home page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="about"
          title="Link to about page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          ABOUT ME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="projects"
          title="Link to projects page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          PROJECTS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="skills"
          title="Link to skills page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          SKILLS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="services"
          title="Link to services page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          SERVICES
        </NavLink>
      </li> */}
      {navData.map((item, index) => (
        <li key={index} className="flex justify-center items-center">
          <NavLink
            to={item.path}
            title={`Link to ${item.label} page`}
            onClick={handleMobileMenuToggle}
            className={({ isActive }) =>
              `${
                isActive
                  ? `${style.active}  bg-black  text-white`
                  : `bg-white hover:bg-zinc-200 active:scale-90`
              } py-2 w-24 text-center rounded-xl text-sm font-bold transition-all shadow-sm`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <nav
      className={`${style.navbar} bg-slate-50 border-b-[1px] border-zinc-300`}
    >
      {width < breakpoint ? (
        <div
          className={style.mobileMenuIcon}
          onClick={handleMobileMenuToggle}
          ref={mobileMenuIconRef}
        >
          ☰
        </div>
      ) : (
        <div className={`${style.nav} gap-2`}>{navElements}</div>
      )}
      <div className="flex justify-center items-center">
        {/* <div className="">
          <span className="backdrop-blur-lg w-fit mx-auto px-6 rounded-3xl text-lg text-black">
            Coding Tomorrow's Possibilities
          </span>
        </div> */}
        <Logo />
      </div>
      {width < breakpoint && (
        <div
          className={`${style.overlay} ${
            isMobileMenuOpen ? style.show : undefined
          }`}
          ref={overlayRef}
        >
          <ul
            className={`${style.sideNavbar} ${
              isMobileMenuOpen ? style.show : undefined
            } bg-slate-100 `}
            ref={sideNavbarRef}
          >
            <div className={`${style.sideNavbar_head} p-2`}>
              <Logo />
              <button
                className={style.closeBtn}
                type="button"
                onClick={handleMobileMenuToggle}
              >
                &#x2715;
              </button>
            </div>
            <div className="flex flex-col gap-2 w-full px-4">{navElements}</div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
