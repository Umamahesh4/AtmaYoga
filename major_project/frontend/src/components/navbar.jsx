import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/src/assets/icon.png";
import Button from "./button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Asana", path: "/asanas" },
    { name: "Recommendations", path: "/form" },
    { name: "Team", path: "/team" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-bg-light/90 shadow-md py-4 w-full">
      <div className="w-full max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-primary font-bold text-3xl"
        >
          <img src={logo} alt="AtmaYoga Logo" className="h-10 w-auto" />
          <span className="ml-2 text-primary">AtmaYoga</span>
        </Link>

        {/* Toggle Button */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? (
            <X className="w-7 h-7 text-text-dark" />
          ) : (
            <Menu className="w-7 h-7 text-text-dark" />
          )}
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ name, path }) => (
            <li key={name} className="flex items-center">
              <Link
                to={path}
                className="relative font-medium text-text-dark leading-normal
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-[4px]
                  after:w-full after:h-[2px] after:scale-x-0 after:origin-center
                  after:bg-primary after:transition-transform after:duration-300
                  hover:after:scale-x-100"
              >
                {name}
              </Link>
            </li>
          ))}
          <li className="flex items-center">
            <Button to="/login">
              Login
            </Button>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute left-0 top-full w-full z-40 bg-bg-light px-6 flex flex-col gap-4 font-medium text-text-dark
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "max-h-96 py-4 shadow-lg border-b border-gray-200" : "max-h-0 py-0 border-none shadow-none"}`}
      >
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            onClick={() => setIsOpen(false)}
            className="relative leading-normal"
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
