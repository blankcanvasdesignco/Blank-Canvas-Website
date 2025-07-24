import { animate, createDraggable, utils } from "animejs";
import React, { useEffect, useRef, useState } from "react";
import icon1 from "../assets/icons/panoslice_icon.png";
import icon2 from "../assets/icons/lono_icon.png";
import icon3 from "../assets/icons/swipekit_icon.png";
import icon4 from "../assets/icons/rene_icon.png";
import icon5 from "../assets/icons/lek_icon.png";
import icon6 from "../assets/icons/parent_icon.png";
import icon7 from "../assets/icons/tawk_icon.png";
import html2canvas from "html2canvas";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
const movedTiles = new Set();
const tiles = [
  {
    icon: icon1,
    fact: "fact 1",
    link: "https://apps.apple.com/us/app/panoslice-carousel-splitter/id1592547810",
  },
  {
    icon: icon2,
    fact: "fact 2",
    link: "https://apps.apple.com/us/app/lono-reels-templates-maker/id1632742723",
  },
  {
    icon: icon3,
    fact: "fact 3",
    link: "https://apps.apple.com/us/app/swipekit-photo-swipe-carousel/id6745084550",
  },
  {
    icon: icon4,
    fact: "fact 4",
    link: "https://apps.apple.com/us/app/rene-collage-vhs-ai-maker/id6744745951",
  },
  {
    icon: icon5,
    fact: "fact 5",
    link: "https://apps.apple.com/us/app/grow-your-linkedin-lek-ai/id6702005680",
  },
  {
    icon: icon6,
    fact: "fact 6",
    link: "https://apps.apple.com/us/app/parent-101-parenting-tips/id6737198424",
  },
  {
    icon: icon7,
    fact: "fact 7",
    link: "https://apps.apple.com/us/app/tawk2-conversation-starters/id6738306118",
  },
];

const Homepage = () => {
  useEffect(() => {
    animate("span", {
      // Property keyframes
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: (_, i) => i * 50, // Function based value
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

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

  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    for (let i = 0; i < tiles.length; i++) {
      createDraggable(`.portfolio-${i}`, {
        container: "#portfolio_container",
        onSettle: () => {
          movedTiles.add(i);

          if (movedTiles.size === tiles.length) {
            setShowExport(true);
          }
        },
      });
    }
  }, []);

  const canvasRef = useRef(null);

  const handleExport = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current);
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "my-collage.png";
      link.click();
    }
  };

  const handleNavigate = (link) => {
    window.location.href = link;
  };

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-6xl font-semibold flex space-x-1">
          <span>C</span>
          <span>r</span>
          <span>e</span>
          <span>a</span>
          <span>t</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>&nbsp;</span>
          <span>f</span>
          <span>o</span>
          <span>r</span>
          <span>&nbsp;</span>
          <span>C</span>
          <span>r</span>
          <span>e</span>
          <span>a</span>
          <span>t</span>
          <span>o</span>
          <span>r</span>
          <span>s</span>
        </h2>

        <p className="my-6 text-2xl ">
          building at the interesection of art, design and technology
        </p>

        <button className="cursor-pointer mt-6 px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform duration-200 hover:scale-110">
          Connect
        </button>
      </section>

      {/* Portfolio */}
      <section id="portfolio">
        <div className="bg-black text-white">
          <div className="flex flex-col items-center pt-10 pb-6 space-y-4">
            <h2 className="text-center text-4xl font-semibold">
              Things we've shipped
            </h2>
            <p>drag, discover and download</p>
          </div>
          <div
            id="portfolio_container"
            ref={canvasRef}
            className="flex flex-col items-center py-10 bg-[#000000]"
          >
            <div className="grid grid-cols-4 gap-4 max-w-screen mx-auto px-4">
              {tiles.map((item, i) => (
                <div key={i} className="relative">
                  <div
                    onClick={() => handleNavigate(item.link)}
                    className={`portfolio portfolio-${i} relative bg-[#000000] rounded-md w-40 border-[#374151] border-1  z-5`}
                  >
                    <img
                      className="object-cover rounded-md"
                      src={item.icon}
                      alt={`Portfolio icon ${i + 1}`}
                    />
                  </div>
                  <div className="absolute border border-[#6b7280] border-dashed rounded-md inset-0 flex items-center justify-center text-center p-2 pointer-events-none">
                    <p className="text-sm font-medium text-[#ffffff]">
                      {item.fact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showExport && (
            <div className="flex justify-center pt-4 pb-8">
              <button
                onClick={() => handleExport()}
                className="flex cursor-pointer justify-center space-x-2 items-center py-2 px-4 border rounded-3xl w-40 transition-transform duration-200 hover:scale-110"
              >
                <p>Save Canvas</p>
                <ArrowDownOnSquareIcon className="size-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-black text-white py-12 px-4">
        <h2 className="text-center text-4xl font-semibold mb-12">Services</h2>

        <div className="flex flex-col md:flex-row justify-center gap-10 text-center">
          {/* Design */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="text-5xl mb-4">🔺</div>{" "}
            {/* Replace with actual icon */}
            <h3 className="text-xl font-bold mb-2">Design</h3>
            <p className="text-sm leading-relaxed">
              we design clean, usable interfaces that look good and feel better.
              wireframes, ui, ux, all done in-house, always with taste.
            </p>
          </div>

          {/* Dev */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="text-5xl mb-4">🧠</div>{" "}
            {/* Replace with actual icon */}
            <h3 className="text-xl font-bold mb-2">Dev</h3>
            <p className="text-sm leading-relaxed">
              swift and swiftui is our native tongue. we don’t just prototype,
              we ship. from mvps to app store-ready builds, we write fast,
              reliable, production code.
            </p>
          </div>

          {/* GTM */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="text-5xl mb-4">👜</div>{" "}
            {/* Replace with actual icon */}
            <h3 className="text-xl font-bold mb-2">GTM</h3>
            <p className="text-sm leading-relaxed">
              we help your product get seen. naming, copy, screenshots,
              onboarding, aso, launch included.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button className="cursor-pointer px-6 py-2 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-medium shadow-md transition-transform duration-200 hover:scale-110">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
