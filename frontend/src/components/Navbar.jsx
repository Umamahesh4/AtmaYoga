import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      document.body.style.overflow = nextState ? 'hidden' : 'auto';
      return nextState;
    });
  };

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

        <div
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={handleToggle}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink onClick={handleToggle} to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleToggle} to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleToggle} to="/asanas" className={({ isActive }) => (isActive ? "active" : "")}>
              Asanas
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleToggle} to="/form" className={({ isActive }) => (isActive ? "active" : "")}>
              Recommendations
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleToggle} to="/team" className={({ isActive }) => (isActive ? "active" : "")}>
              Our Team
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleToggle}
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
