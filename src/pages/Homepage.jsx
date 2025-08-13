import {
  animate,
  createAnimatable,
  createDraggable,
  stagger,
  utils,
} from "animejs";
import React, { useEffect, useRef, useState } from "react";
import icon1 from "../assets/icons/panoslice_icon.png";
import icon2 from "../assets/icons/lek_icon.png";
import icon3 from "../assets/icons/rene_icon.png";
import icon4 from "../assets/icons/cr8r_icon.png";
import icon5 from "../assets/icons/lono_icon.png";
import icon6 from "../assets/icons/tawk_icon.png";
import icon7 from "../assets/icons/plugged_icon.png";
import icon8 from "../assets/icons/swipekit_icon.png";
import icon9 from "../assets/icons/mural_icon.png";
import icon10 from "../assets/icons/found_icon.png";
import icon11 from "../assets/icons/parent_icon.png";
import design from "../assets/emojis/design.png";
import dev from "../assets/emojis/dev.png";
import gtm from "../assets/emojis/gtm.png";
import html2canvas from "html2canvas";
import { createTimeline, text } from "animejs";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import CanvasEditor from "../components/CanvasEditor";
import DotTracker from "../components/DotTracker";

const tiles = [
  {
    icon: icon1,
    name: "panoslice",
    desc: "instagram collages",
    rating: "⭐️4.7 (2,000)",
    cta: "download",
    link: "https://apps.apple.com/us/app/panoslice-carousel-splitter/id1592547810",
  },
  {
    icon: icon2,
    name: "lek",
    desc: "linkedin growth tool",
    rating: "⭐️4.6 (100)",
    cta: "download",
    link: "https://apps.apple.com/us/app/grow-your-linkedin-lek-ai/id6702005680",
  },
  {
    icon: icon3,
    name: "rene",
    desc: "make cute collages",
    rating: "⭐️4.8 (50)",
    cta: "download",
    link: "https://apps.apple.com/us/app/rene-collage-vhs-ai-maker/id6744745951",
  },
  {
    icon: icon4,
    name: "cr8r.ai",
    desc: "AI image generation",
    rating: "",
    cta: "create",
    link: "https://cr8r.ai",
  },
  {
    icon: icon5,
    name: "lono",
    desc: "viral reel templates",
    rating: "⭐️4.8 (500)",
    cta: "download",
    link: "https://apps.apple.com/us/app/lono-reels-templates-maker/id1632742723",
  },
  {
    icon: icon6,
    name: "tawk2",
    desc: "relationship building",
    rating: "⭐️4.8 (10)",
    cta: "download",
    link: "https://apps.apple.com/us/app/tawk2-conversation-starters/id6738306118",
  },
  {
    icon: icon7,
    name: "plugged",
    desc: "find mood twins",
    rating: "⭐️5 (10)",
    cta: "download",
    link: "https://apps.apple.com/us/app/plugged-find-friends-by-mood/id6746377914",
  },
  {
    icon: icon8,
    name: "swipekit",
    desc: "AI UGC slideshows",
    rating: "⭐️5 (10)",
    cta: "download",
    link: "https://apps.apple.com/us/app/swipekit-photo-swipe-carousel/id6745084550",
  },
  {
    icon: icon9,
    name: "mural",
    desc: "instagram grid & carousel",
    rating: "⭐️4.7 (100)",
    cta: "download",
    link: "https://play.google.com/store/apps/details?id=com.muralgridforinstagram.squarecrop&hl=en_IN",
  },
  {
    icon: icon10,
    name: "found",
    desc: "social grid app",
    rating: "⭐️4.7 (10)",
    cta: "download",
    link: "https://apps.apple.com/us/app/found-social-photo-grid/id6743046660",
  },
  {
    icon: icon11,
    name: "parent101",
    desc: "AI copilot for parents",
    rating: "⭐️4.7 (10)",
    cta: "download",
    link: "https://apps.apple.com/us/app/parent-101-parenting-tips/id6737198424",
  },
];

const Homepage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(
            { ...location.state, scrollTo: undefined },
            "",
            window.location.pathname + window.location.search
          );
        }, 500);
      }
    }
  }, [location.state]);

  useEffect(() => {
    const particleIntervals = {};

    const createParticle = (tileEl, emoji) => {
      const rect = tileEl.getBoundingClientRect();
      const particle = document.createElement("span");
      particle.textContent = emoji;
      particle.style.position = "fixed";
      particle.style.left = `${rect.left + rect.width / 2}px`;
      particle.style.top = `${rect.top + rect.height / 2}px`;
      particle.style.fontSize = "14px";
      particle.style.pointerEvents = "none";
      particle.style.opacity = "1";
      particle.style.transform = `translate(-50%, -50%) scale(1)`;
      document.body.appendChild(particle);

      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      const rotate = Math.random() * 360;

      particle.animate(
        [
          {
            transform: `translate(-50%, -50%) rotate(0deg) scale(1)`,
            opacity: 1,
          },
          {
            transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(0.5)`,
            opacity: 0,
          },
        ],
        { duration: 800, easing: "ease-out" }
      ).onfinish = () => {
        particle.remove();
      };
    };

    for (let i = 0; i < tiles.length; i++) {
      const tileEl = document.querySelector(`.portfolio-${i}`);
      const emoji = `✨${i + 1}`; // unique per tile

      createDraggable(`.portfolio-${i}`, {
        container: "#portfolio_container",
        onGrab: () => {
          particleIntervals[i] = setInterval(() => {
            createParticle(tileEl, emoji);
          }, 100);
        },
        onRelease: () => {
          clearInterval(particleIntervals[i]);
        },
        onMove: () => {
          // keep scattering while moving
          createParticle(tileEl, emoji);
        },
      });
    }

    return () => {
      Object.values(particleIntervals).forEach(clearInterval);
    };
  }, [tiles]);

  const handleNavigate = (link) => {
    window.location.href = link;
  };

  return (
    <div className="min-h-screen text-black">
      <DotTracker />
      {/* Hero Section */}
      <section
        data-dot-shape="square"
        className="bg-white flex flex-col items-center justify-center pt-6 pb-28 text-center space-y-2 font-unbounded"
      >
        <div className="relative flex flex-col items-center gap-3 p-10 max-w-[95%] sm:max-w-[80%] lg:max-w-[50%]">
          <h1 className="text-4xl">
            Building tools that help you create every day
          </h1>
          <h3>
            we're a mobile development studio building at the intersection of
            art, design and technology
          </h3>
        </div>

        <button
          onClick={() => navigate("/contact")}
          className="px-12 py-2 bg-white text-sm text-black border border-[#707070] rounded-[56px] opacity-100 shadow-[inset_0px_1.6px_4px_#000000,0px_3px_6px_#00000029] cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          Connect
        </button>
      </section>

      {/* Portfolio */}
      <section
        data-dot-shape="circle"
        id="portfolio"
        className="font-unbounded"
      >
        <div className="bg-black text-white">
          <div className="flex flex-col items-center pt-10 pb-2 space-y-3">
            <h2 className="text-center text-4xl">Things we've shipped</h2>
            <p className="opacity-60">drag, discover and download.</p>
          </div>
          <div
            id="portfolio_container"
            ref={canvasRef}
            className="flex flex-col items-center py-10 bg-[#000000]"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-screen mx-auto px-4">
              {tiles.map((item, i) => (
                <div key={i} className="relative">
                  <div
                    className={`portfolio portfolio-${i} relative bg-[#000000] rounded-md w-32 sm:w-40 border-[#374151] border-1 z-5`}
                  >
                    <img
                      className="object-cover rounded-md"
                      src={item.icon}
                      alt={`Portfolio icon ${i + 1}`}
                    />
                  </div>
                  <div className="absolute border border-[#6b7280] border-dashed rounded-md inset-0 flex flex-col items-center justify-center text-center p-4 space-y-1 pointer-events-none">
                    {/* App Name */}
                    <p className="text-[12px] sm:text-[14px]">{item.name}</p>

                    {/* Description */}
                    <p className="text-[8px] sm:text-[10px]">{item.desc}</p>

                    {/* Rating */}
                    {item.rating && (
                      <p className="text-[8px] sm:text-[10px]">{item.rating}</p>
                    )}

                    {/* CTA link */}
                    <p
                      onClick={() =>
                        window.open(item.link, "_blank", "noopener,noreferrer")
                      }
                      rel="noopener noreferrer"
                      className="cursor-pointer text-[10px] sm:text-[12px] opacity-[0.6] underline pointer-events-auto"
                    >
                      ↪ {item.cta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        data-dot-shape="square"
        id="services"
        className="bg-black text-white pt-12 px-4 flex flex-col justify-center items-center space-y-16 font-unbounded"
      >
        <div className="flex flex-col items-center pt-10 space-y-3">
          <h2 className="text-center text-4xl">Services</h2>
          <p className="opacity-60">
            we design, build, and launch products people love to use.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-around mx-8 lg:mx-32 lg:space-x-24 space-y-14 lg:space-y-0 text-center">
          {/* Design */}
          <div className="flex flex-1/3 flex-col items-center max-w-120 lg:max-w-60 space-y-4">
            <img className="w-12 h-12" src={design} alt="" />
            <h3 className="text-xl">Design</h3>
            <p className="text-sm leading-relaxed">
              we design clean, usable interfaces that look good and feel better.
              wireframes, ui, ux, all done in-house, always with taste.
            </p>
          </div>

          {/* Dev */}
          <div className="flex flex-1/3 flex-col items-center max-w-120 lg:max-w-60 space-y-4">
            <img className="w-12 h-12" src={dev} alt="" />
            <h3 className="text-xl">Dev</h3>
            <p className="text-sm leading-relaxed">
              swift and swiftui is our native tongue. we don’t just prototype,
              we ship. from mvps to app store-ready builds, we write fast,
              reliable, production code.
            </p>
          </div>

          {/* GTM */}
          <div className="flex flex-1/3 flex-col items-center max-w-120 lg:max-w-60 space-y-4">
            <img className="w-12 h-12" src={gtm} alt="" />
            <h3 className="text-xl">GTM</h3>
            <p className="text-sm leading-relaxed">
              we help your product get seen. naming, copy, screenshots,
              onboarding, aso, launch included.
            </p>
          </div>
        </div>

        {/* Button */}

        <button
          onClick={() => navigate("/services")}
          className="px-12 py-2 bg-white text-sm text-black border border-[#707070] rounded-[56px] opacity-100 shadow-[inset_0px_1.6px_4px_#000000,0px_3px_6px_#00000029] cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          Learn more
        </button>
      </section>

      {/* Canvas */}
      <section
        data-dot-shape="circle"
        className="hidden md:block bg-black text-white p-12 font-unbounded"
      >
        <div className="flex flex-col items-center pt-10 pb-5 space-y-3">
          <h2 className="text-center text-4xl">Make Your Mark</h2>
          <p className="opacity-60">
            start with nothing. end with something only you could make.
          </p>
        </div>
        <CanvasEditor />
      </section>

      {/* Bottom text */}
      <section
        data-dot-shape="square"
        className="bg-black text-white flex flex-col items-center justify-center pt-6 pb-28 text-center space-y-2 font-unbounded"
      >
        <div className="relative flex flex-col items-center gap-3 p-10">
          <h1 className="text-4xl">Anything great</h1>
          <h1 className="text-4xl">begins on a</h1>
          <h1 className="text-4xl font-bethellen">Blank Canvas</h1>
        </div>

        <button
          onClick={() => navigate("/contact")}
          className="px-12 py-2 bg-white text-sm text-black border border-[#707070] rounded-[56px] opacity-100 shadow-[inset_0px_1.6px_4px_#000000,0px_3px_6px_#00000029] cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          Get in touch
        </button>
      </section>
    </div>
  );
};

export default Homepage;
