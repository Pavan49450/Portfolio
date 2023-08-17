import logo from "../../assets/Logo.png";
import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      {/* <h1>Header</h1> */}
      <nav className={style.navbar}>
        <div className={style.navbar__logo}>
          <Link to="/" title="Link to home page">
            <img src={logo} alt="logo" title="logo"></img>
          </Link>
        </div>
        <ul className={style.sideNavbar}>
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
      </nav>
    </div>
  );
};

export default Header;
