import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="AtmaYoga Logo"
              style={{ height: "40px", width: "auto" }}
            />
            AtmaYoga
          </Link>
        </div>

        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/asanas" className={({ isActive }) => (isActive ? "active" : "")}>
              Asanas
            </NavLink>
          </li>
          <li>
            <NavLink to="/form" className={({ isActive }) => (isActive ? "active" : "")}>
              Recommendations
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" className={({ isActive }) => (isActive ? "active" : "")}>
              Our Team
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
