import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user and logout function

  const closeMenuAndNavigate = (path) => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    navigate(path);
    setDropdownOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      document.body.style.overflow = nextState ? "hidden" : "auto";
      return nextState;
    });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Mobile Menu Toggle */}
        <div
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={handleToggle}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Logo */}
        <div className="logo">
          <Link to="/">AtmaYoga</Link>
        </div>

        {/* Mobile Profile Icon */}
        <Link to={user ? "/account" : "/login"} className="mobile-profile-icon">
          <i className="fas fa-user"></i>
        </Link>

        {/* Nav Links */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/")}
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/about")}
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/asanas")}
              to="/asanas"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Asanas
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/form")}
              to="/form"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Recommendations
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/team")}
              to="/team"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Our Team
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => closeMenuAndNavigate("/asanalens")}
              to="/asanalens"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              AsanaLens
            </NavLink>
          </li>

          {/* Login/User Dropdown */}
          <li className="nav-user" ref={dropdownRef}>
            {user ? (
              <div
                className="user-dropdown"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Hi, {user.name}
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => closeMenuAndNavigate("/account")}>
                      My Account
                    </li>
                    <li
                      onClick={() => {
                        logout();
                        closeMenuAndNavigate("/");
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <NavLink
                onClick={() => closeMenuAndNavigate("/login")}
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-btn active" : "nav-btn"
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
