import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, onClick, type = "button", children, className = "" }) => {
const baseClasses =
  "bg-[#7e57c2] text-white px-4 py-2 rounded-full font-medium hover:bg-[#4d2c91] transition inline-flex items-center justify-center";

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;