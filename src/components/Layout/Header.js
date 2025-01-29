import React, { useEffect, useRef, useState } from "react";
import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import CustomImage from "../../UI/Image/Image";

const Logo = () => (
  <div className={style.navbar__logo}>
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

  const navElements = (
    <>
      <li>
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
      </li>
    </>
  );

  return (
    <nav className={style.navbar}>
      {width < breakpoint ? (
        <div
          className={style.mobileMenuIcon}
          onClick={handleMobileMenuToggle}
          ref={mobileMenuIconRef}
        >
          ☰
        </div>
      ) : (
        <div className={style.nav}>{navElements}</div>
      )}
      <Logo />
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
            }`}
            ref={sideNavbarRef}
          >
            <div className={style.sideNavbar_head}>
              <Logo />
              <button
                className={style.closeBtn}
                type="button"
                onClick={handleMobileMenuToggle}
              >
                &#x2715;
              </button>
            </div>
            {navElements}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
