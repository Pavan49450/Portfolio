import { useEffect, useRef } from "react";
import logo from "../../assets/Logo.png";
import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const sideNavbarRef = useRef(null);
  const overlayRef = useRef(null);

  const toggleMobileMenu = () => {
    sideNavbarRef.current.classList.toggle(style.show);
    overlayRef.current.classList.toggle(style.show);
  };

  const closeMobileMenu = () => {
    sideNavbarRef.current.classList.remove(style.show);
    overlayRef.current.classList.remove(style.show);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const mobileMenuIcon = document.querySelector(`.${style.mobileMenuIcon}`);

      if (
        sideNavbarRef.current &&
        !sideNavbarRef.current.contains(event.target) &&
        !mobileMenuIcon.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <nav className={style.navbar}>
        <div className={style.navbar__logo}>
          <Link to="/" title="Link to home page">
            <img src={logo} alt="logo" title="logo"></img>
          </Link>
        </div>
        <div className={style.overlay} ref={overlayRef}>
          <ul className={style.sideNavbar} ref={sideNavbarRef}>
            <div className={style.sideNavbar_head}>
              <div className={style.navbar__logo}>
                <Link to="/" title="Link to home page">
                  <img src={logo} alt="logo" title="logo"></img>
                </Link>
              </div>

              <button
                className={style.closeBtn}
                type="button"
                onClick={toggleMobileMenu}
              >
                &#x2715;
              </button>
            </div>
            <li>
              <NavLink
                to="/"
                title="Link to home page"
                className={({ isActive }) => isActive && style.active}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                title="Link to about page"
                className={({ isActive }) => isActive && style.active}
              >
                About me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="projects"
                title="Link to projects page"
                className={({ isActive }) => isActive && style.active}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="skills"
                title="Link to skills page"
                className={({ isActive }) => isActive && style.active}
              >
                Skills
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={style.mobileMenuIcon} onClick={toggleMobileMenu}>
          ☰
        </div>
      </nav>
    </div>
  );
};

export default Header;
