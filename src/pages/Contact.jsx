import React from "react";
import Navbar from "../components/Navbar";
import { ScissorsIcon } from "@heroicons/react/24/solid";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    window.location.href = `mailto:dipin@blankcanvasdesign.co?subject=Message from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
  };

  return (
    <div className="bg-black text-white font-unbounded pt-12 py-16">
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-3xl font-semibold mb-2">Let’s Talk</h1>
        <p className="text-sm text-gray-200 text-center mb-10">
          Got a question, idea, or just want to say hi?
          <br />
          We'd love to hear from you.
        </p>

        <div className="relative border border-dashed border-white p-6 w-full max-w-xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between">
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="w-[49%] px-4 py-3 bg-black border border-white rounded-2xl outline-none text-white placeholder-gray-500"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-[49%] px-4 py-3 bg-black border border-white rounded-2xl outline-none text-white placeholder-gray-500"
              />
            </div>
            <textarea
              name="message"
              placeholder="Once upon a time..."
              rows={6}
              className="w-full px-4 py-3 bg-black border border-white rounded-xl outline-none text-white placeholder-gray-500 resize-y"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Send
            </button>
          </form>

          <ScissorsIcon className="absolute bg-black w-4 left-[49%] -bottom-2" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
