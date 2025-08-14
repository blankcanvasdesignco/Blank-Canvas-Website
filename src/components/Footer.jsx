import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollNavigation = (targetId) => {
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
    <footer className="bg-white border-t border-gray-300 sm:mr-6">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col space-y-8 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
        {/* Left Section */}
        <div onClick={() => navigate("/")} className="cursor-pointer space-y-4">
          <h2 className="text-2xl font-bethellen">Blank Canvas Design Co.</h2>
          <p className="font-bethellen text-xs">Made in India, for the world</p>
        </div>

        {/* Right Section */}
        <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-x-20 sm:gap-x-8 md:gap-x-20 text-xl font-unbounded">
          <div className="flex flex-col space-y-4">
            <span
              className="cursor-pointer"
              onClick={() => navigate("/services")}
            >
              Services
            </span>
            <span
              className="cursor-pointer"
              onClick={() => handleScrollNavigation("portfolio")}
            >
              Portfolio
            </span>
          </div>
          <div className="flex flex-col space-y-4">
            <span
              className="cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </span>
            <a
              href="https://www.linkedin.com/company/blank-canvas-design-co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
