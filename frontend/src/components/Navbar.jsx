import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenuAndNavigate = (path) => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    navigate(path);
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      document.body.style.overflow = nextState ? "hidden" : "auto";
      return nextState;
    });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="AtmaYoga Logo" style={{ height: "40px", width: "auto" }} />
            AtmaYoga
          </Link>
        </div>

        <div className={`menu-toggle ${isOpen ? "active" : ""}`} onClick={handleToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink onClick={() => closeMenuAndNavigate("/")} to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => closeMenuAndNavigate("/about")} to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => closeMenuAndNavigate("/asanas")} to="/asanas" className={({ isActive }) => (isActive ? "active" : "")}>
              Asanas
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => closeMenuAndNavigate("/form")} to="/form" className={({ isActive }) => (isActive ? "active" : "")}>
              Recommendations
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => closeMenuAndNavigate("/team")} to="/team" className={({ isActive }) => (isActive ? "active" : "")}>
              Our Team
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/login")}
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
