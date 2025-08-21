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
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        {/* Right Section (on top for mobile, right for sm+) */}
        <div className="order-1 sm:order-2 w-full sm:w-auto mb-4 sm:mb-0 flex justify-center sm:justify-end">
          <div className="grid grid-cols-2 gap-x-12 sm:gap-x-8 md:gap-x-20 text-sm sm:text-md font-unbounded">
            <div className="flex flex-col space-y-4">
              <span
                className="cursor-pointer"
                onClick={() => handleScrollNavigation("portfolio")}
              >
                Portfolio
              </span>
              <a className="cursor-pointer" href="/contact">
                Contact
              </a>
            </div>
            <div className="flex flex-col space-y-4">
              <a className="cursor-pointer" href="/services">
                Services
              </a>
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
        {/* Left Section */}
        <a
          href="/"
          className="order-2 sm:order-1 cursor-pointer space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-auto"
        >
          <h2 className="font-bethellen text-md">Blank Canvas Design Co.</h2>
          <p className="font-bethellen text-[10px] pr-3">
            Made in India, for the world
          </p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
