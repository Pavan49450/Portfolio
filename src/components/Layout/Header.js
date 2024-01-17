import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo.png";
import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

const Logo = () => (
  <div className={style.navbar__logo}>
    <Link to="/" title="Link to home page">
      <img src={logo} alt="logo" title="logo"></img>
    </Link>
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
          className={({ isActive }) => isActive && style.active}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="about"
          title="Link to about page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => isActive && style.active}
        >
          About me
        </NavLink>
      </li>
      <li>
        <NavLink
          to="projects"
          title="Link to projects page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => isActive && style.active}
        >
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink
          to="skills"
          title="Link to skills page"
          onClick={handleMobileMenuToggle}
          className={({ isActive }) => isActive && style.active}
        >
          Skills
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className={style.navbar}>
      <Logo />
      {width < breakpoint && (
        <div
          className={`${style.overlay} ${isMobileMenuOpen && style.show}`}
          ref={overlayRef}
        >
          <ul
            className={`${style.sideNavbar} ${isMobileMenuOpen && style.show}`}
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
    </nav>
  );
};

export default Header;
