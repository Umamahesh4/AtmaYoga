import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

const Button = ({ to, onClick, type = "button", children, className = "" }) => {
const baseClasses =
   "bg-bg-light border-2 border-primary text-primary px-4 py-2 rounded-full font-medium transition inline-flex items-center justify-center hover:bg-primary hover:text-bg-light hover:border-primary";

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