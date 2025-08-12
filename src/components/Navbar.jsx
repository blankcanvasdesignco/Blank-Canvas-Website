import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollNavigation = (targetId) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: targetId } });
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white flex justify-between items-center py-6 px-6 md:px-12 text-sm font-unbounded z-30 shadow-md top-0 left-0 right-0">
        <div className="font-bethellen text-sm sm:text-lg">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Blank Canvas Design Co.
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <button
            className="cursor-pointer"
            onClick={() => handleScrollNavigation("portfolio")}
          >
            Portfolio
          </button>
          <button
            className="cursor-pointer"
            onClick={() => navigate("/services")}
          >
            Services
          </button>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(true)}>
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-6 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-2xl">
            <XMarkIcon />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-6 space-y-4">
          <button onClick={() => handleScrollNavigation("portfolio")}>
            Portfolio
          </button>
          <button onClick={() => navigate("/services")}>Services</button>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-30 transition-opacity duration-1000"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
