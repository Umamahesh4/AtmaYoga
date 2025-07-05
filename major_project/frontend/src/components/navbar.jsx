import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/src/assets/icon.png";
import Button from "./button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/90 shadow-md py-4 w-full">
      <div className="w-full max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="flex items-center text-primary font-bold text-3xl"
          >
            <img src={logo} alt="AtmaYoga Logo" className="h-10 w-auto" />
            <span className="ml-2 text-[#7e57c2]">AtmaYoga</span>
          </Link>
        </div>

        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? (
            <X className="w-7 h-7 text-gray-700" />
          ) : (
            <Menu className="w-7 h-7 text-gray-700" />
          )}
        </div>

        <ul
          className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li className="flex items-center">
            <Link
              to="/"
              className="relative font-medium text-gray-800 leading-normal
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-[4px]
  after:w-full after:h-[2px] after:scale-x-0 after:origin-center
  after:bg-[#7e57c2] after:transition-transform after:duration-300
  hover:after:scale-x-100"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/"
              className="relative font-medium text-gray-800 leading-normal
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-[4px]
  after:w-full after:h-[2px] after:scale-x-0 after:origin-center
  after:bg-[#7e57c2] after:transition-transform after:duration-300
  hover:after:scale-x-100"
            >
              About
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/"
              className="relative font-medium text-gray-800 leading-normal
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-[4px]
  after:w-full after:h-[2px] after:scale-x-0 after:origin-center
  after:bg-[#7e57c2] after:transition-transform after:duration-300
  hover:after:scale-x-100"
            >
              Asana
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/"
              className="relative font-medium text-gray-800 leading-normal
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-[4px]
  after:w-full after:h-[2px] after:scale-x-0 after:origin-center
  after:bg-[#7e57c2] after:transition-transform after:duration-300
  hover:after:scale-x-100"
            >
              Recommendations
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to="/"
              className="relative font-medium text-gray-800 leading-normal
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:translate-y-[4px]
  after:w-full after:h-[2px] after:scale-x-0 after:origin-center
  after:bg-[#7e57c2] after:transition-transform after:duration-300
  hover:after:scale-x-100"
            >
              Team
            </Link>
          </li>

          <li className="hidden md:flex items-center">
            <Button to="/login" className="hover:bg-[#4d2c91]">
              Login
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
