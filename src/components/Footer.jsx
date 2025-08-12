import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        {/* Left */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-sm font-bethellen"
        >
          Blank Canvas Design Co.
        </div>

        {/* Right */}
        <div
          onClick={() => navigate("/contact")}
          className="text-sm font-unbounded cursor-pointer"
        >
          Contact
        </div>
      </div>
    </footer>
  );
};

export default Footer;
