import React from "react";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <div>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
        <p className="text-lg text-gray-400 mb-10 text-center max-w-xl">
          Whether you have a question, a project idea, or just want to say hello
          — feel free to reach out.
        </p>

        <form className="w-full max-w-2xl bg-gray-900 p-8 rounded-xl shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-200 text-white py-3 rounded-md font-semibold shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Social links */}
        <div className="flex space-x-6 mt-10 text-gray-400">
          <a
            href="mailto:hello@example.com"
            className="hover:text-white transition duration-200"
          >
            📧 Email
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-200"
          >
            🐦 Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-200"
          >
            💼 LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
