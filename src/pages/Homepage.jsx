import {
  animate,
  createAnimatable,
  createDraggable,
  stagger,
  utils,
} from "animejs";
import React, { useEffect, useRef, useState } from "react";
import icon1 from "../assets/icons/panoslice_icon.png";
import icon2 from "../assets/icons/lono_icon.png";
import icon3 from "../assets/icons/swipekit_icon.png";
import icon4 from "../assets/icons/rene_icon.png";
import icon5 from "../assets/icons/lek_icon.png";
import icon6 from "../assets/icons/parent_icon.png";
import icon7 from "../assets/icons/tawk_icon.png";
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
    fact: "The first successful photograph was taken by Joseph Nicéphore Niépce in 1826 or 1827. It took 8 hours to expose!",
    link: "https://apps.apple.com/us/app/panoslice-carousel-splitter/id1592547810",
  },
  {
    icon: icon2,
    fact: "Comes from Greek: 'photo' (light) and 'graphé' (drawing) — so it literally means 'drawing with light.'",
    link: "https://apps.apple.com/us/app/lono-reels-templates-maker/id1632742723",
  },
  {
    icon: icon3,
    fact: "Although experiments started in the 1800s, true color photography didn’t become widely available until Kodachrome film in the 1930s.",
    link: "https://apps.apple.com/us/app/swipekit-photo-swipe-carousel/id6745084550",
  },
  {
    icon: icon4,
    fact: "The default Windows XP wallpaper 'Bliss' by Charles O'Rear is considered the most viewed photo ever.",
    link: "https://apps.apple.com/us/app/rene-collage-vhs-ai-maker/id6744745951",
  },
  {
    icon: icon5,
    fact: "Over 1.8 trillion photos were taken globally in 2023, with 92% taken on smartphones.",
    link: "https://apps.apple.com/us/app/grow-your-linkedin-lek-ai/id6702005680",
  },
  {
    icon: icon6,
    fact: "The longest known camera exposure lasted 8 years — made by Regina Valkenborgh using a pinhole camera.",
    link: "https://apps.apple.com/us/app/parent-101-parenting-tips/id6737198424",
  },
  {
    icon: icon7,
    fact: "Photoshop 1.0 was released in 1990 by Adobe. Today it's one of the most powerful editing tools globally.",
    link: "https://apps.apple.com/us/app/tawk2-conversation-starters/id6738306118",
  },
];

const Homepage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 500); // small delay ensures DOM is ready
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
        <div className="relative flex flex-col items-center gap-3 p-10">
          <h1 className="text-4xl">Creating for Creators</h1>
          <h3>building at the interesection of art, design and technology</h3>
        </div>

        <button
          onClick={() => navigate("/contact")}
          className="cursor-pointer text-sm text-gray-500 px-12 py-2 rounded-full border-2 bg-white hover:bg-gray-100 transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]"
        >
          Connect
        </button>
      </section>

      {/* Portfolio */}
      <section
        data-dot-shape="circle"
        id="portfolio"
        className="pt-2 font-unbounded"
      >
        <div className="bg-black text-white">
          <div className="flex flex-col items-center pt-10 pb-2 space-y-3">
            <h2 className="text-center text-4xl">Things we've shipped</h2>
            <p className="text-gray-400">drag, discover and download</p>
          </div>
          <div
            id="portfolio_container"
            ref={canvasRef}
            className="flex flex-col items-center py-10 bg-[#000000]"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-screen mx-auto px-4">
              {tiles.map((item, i) => (
                <div key={i} className="relative">
                  <div
                    onClick={() => handleNavigate(item.link)}
                    className={`portfolio portfolio-${i} relative bg-[#000000] rounded-md w-32 sm:w-40 border-[#374151] border-1 z-5`}
                  >
                    <img
                      className="object-cover rounded-md"
                      src={item.icon}
                      alt={`Portfolio icon ${i + 1}`}
                    />
                  </div>
                  <div className="absolute border border-[#6b7280] border-dashed rounded-md inset-0 flex items-center justify-center text-center p-4 pointer-events-none">
                    <p className="text-[8px] sm:text-xs text-gray-400">
                      {item.fact}
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
        className="bg-black text-white py-12 px-4 flex flex-col justify-center items-center space-y-20 font-unbounded"
      >
        <h2 className="text-center text-4xl">Services</h2>

        <div className="flex flex-col lg:flex-row lg:justify-around mx-8 lg:mx-32 lg:space-x-24 space-y-14 lg:space-y-0 text-center">
          {/* Design */}
          <div className="flex flex-1/3 flex-col items-center max-w-120 lg:max-w-60 space-y-4">
            <div className="text-5xl">🔺</div> {/* Replace with actual icon */}
            <h3 className="text-xl">Design</h3>
            <p className="text-sm leading-relaxed">
              we design clean, usable interfaces that look good and feel better.
              wireframes, ui, ux, all done in-house, always with taste.
            </p>
          </div>

          {/* Dev */}
          <div className="flex flex-1/3 flex-col items-center max-w-120 lg:max-w-60 space-y-4">
            <div className="text-5xl">🧠</div> {/* Replace with actual icon */}
            <h3 className="text-xl">Dev</h3>
            <p className="text-sm leading-relaxed">
              swift and swiftui is our native tongue. we don’t just prototype,
              we ship. from mvps to app store-ready builds, we write fast,
              reliable, production code.
            </p>
          </div>

          {/* GTM */}
          <div className="flex flex-1/3 flex-col items-center max-w-120 lg:max-w-60 space-y-4">
            <div className="text-5xl">👜</div> {/* Replace with actual icon */}
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
          className="cursor-pointer text-sm text-gray-500 px-12 py-2 rounded-full border-2 bg-white hover:bg-gray-100 transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]"
        >
          Learn More
        </button>
      </section>

      <section
        data-dot-shape="circle"
        className="bg-black text-white p-12 font-unbounded"
      >
        <CanvasEditor />
      </section>

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
          className="cursor-pointer text-sm text-gray-500 px-12 py-2 rounded-full border-2 bg-white hover:bg-gray-100 transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]"
        >
          Let's work together
        </button>
      </section>
    </div>
  );
};

export default Homepage;
