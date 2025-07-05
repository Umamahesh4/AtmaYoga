import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, onClick, type = "button", children, className = "" }) => {
const baseClasses =
  "bg-white border-2 border-[#7e57c2] text-[#7e57c2] px-4 py-2 rounded-full font-medium transition inline-flex items-center justify-center hover:bg-[#7e57c2] hover:text-white hover:border-[#7e57c2]";

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