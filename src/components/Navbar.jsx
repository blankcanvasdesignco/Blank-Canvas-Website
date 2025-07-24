import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollNavigation = (targetId) => {
    if (location.pathname === "/") {
      // Already on homepage → just scroll
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage and pass scroll target
      navigate("/", { state: { scrollTo: targetId } });
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-2 text-sm bg-[#dcebca] border-[#606f49] border-b sticky top-0 z-20">
      <div className="font-bold text-lg">
        <Link to="/">Logo</Link>
      </div>
      <div className="space-x-6">
        <button
          className="cursor-pointer"
          onClick={() => handleScrollNavigation("services")}
        >
          Services
        </button>
        <button
          className="cursor-pointer"
          onClick={() => handleScrollNavigation("portfolio")}
        >
          Portfolio
        </button>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
