import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-sm">
        {/* Logo or Name */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">YourCompany</h2>
          <p>Creating digital magic with code, design, and heart.</p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#services" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-white transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              🐦
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              💻
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              💼
            </a>
            <a href="mailto:hello@example.com" className="hover:text-white">
              📧
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
