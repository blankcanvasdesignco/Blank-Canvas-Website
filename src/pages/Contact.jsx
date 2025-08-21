import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { ScissorsIcon } from "@heroicons/react/24/solid";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_qlu381h", // replace with your EmailJS service ID
        "template_wie9z84", // replace with your EmailJS template ID
        form.current,
        "4XKsC6OgxFp01iIci" // replace with your EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="bg-black text-white font-unbounded pb-10">
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-3xl font-semibold mb-2">Let’s Talk</h1>
        <p className="text-sm text-gray-200 text-center mb-10">
          Got a question, idea, or just want to say hi?
          <br />
          We'd love to hear from you.
        </p>

        <div className="relative border border-dashed border-white p-6 w-full max-w-xl rounded-lg">
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full md:w-[49%] px-4 py-3 bg-black border border-white rounded-2xl outline-none text-white placeholder-gray-500"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full md:w-[49%] px-4 py-3 bg-black border border-white rounded-2xl outline-none text-white placeholder-gray-500"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Once upon a time..."
              rows={6}
              className="w-full px-4 py-3 bg-black border border-white rounded-xl outline-none text-white placeholder-gray-500 resize-y"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          <ScissorsIcon className="absolute bg-black w-4 left-[49%] -bottom-2" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
