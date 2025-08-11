import React, { useState } from "react";
import { animate, stagger } from "animejs";
import lek_icon from "../assets/icons/lek_icon.png";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    id: 1,
    title: "1. Design",
    items: [
      {
        title: "Product Strategy",
        description: "User journeys, competitive mapping, idea refinement",
      },
      {
        title: "UI/UX Design",
        description:
          "Beautiful interfaces that convert. Every screen. Every state.",
      },
      {
        title: "Rapid Prototyping",
        description:
          "Beautiful interfaces that convert. Every screen. Every state.",
      },
    ],
  },
  {
    id: 2,
    title: "2. Dev",
    items: [
      {
        title: "Architecture & Stack",
        description:
          "Scalable foundations. Smart choices that don’t need rewriting.",
      },
      {
        title: "Frontend Engineering",
        description:
          "Pixel-perfect, production-grade builds. Fast, responsive, accessible.",
      },
      {
        title: "Backend Systems",
        description:
          "Solid APIs. Secure infra. Built to scale with your product.",
      },
    ],
  },
  {
    id: 3,
    title: "3. GTM",
    items: [
      {
        title: "Positioning & Messaging",
        description:
          "Story, slogan, and strategy. What you say and how it sticks.",
      },
      {
        title: "Landing Pages",
        description:
          "Designed to convert. Fast to load. Built to test and learn.",
      },
      {
        title: "Launch & Growth Experiments",
        description:
          "Tactical GTM moves. A/B tests. Community drops. Distribution loops.",
      },
    ],
  },
];

const Services = () => {
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  const handleClick = (index) => {
    const isExpanded = expanded[index];

    animate(`.card-${index} .inner-card`, {
      translateX: (el, i) => (isExpanded ? 0 : i * 200),
      rotate: (el, i) => (isExpanded ? -8 + i * 8 : 0),
      duration: 600,
      easing: "easeOutExpo",
      delay: stagger(100, { direction: isExpanded ? "reverse" : "normal" }),
    });

    setExpanded((prev) => ({ ...prev, [index]: !isExpanded }));
  };

  return (
    <div className="bg-black text-white py-16 text-center px-4 font-unbounded">
      <h2 className="text-2xl font-semibold mb-2">What We Do (And Do Well)</h2>
      <p className="text-sm max-w-md mx-auto mb-16">
        From the first sketch to launch day, we build apps like they're art.
        Like it's a song. It has to move you.
      </p>

      <div className="relative overflow-x-auto flex overflow-y-clip flex-col gap-16 p-4 py-8">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className={`card-${index} relative w-36 h-36 cursor-pointer`}
            onClick={() => handleClick(index)}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="inner-card absolute inset-0 border-2 border-dashed border-white rounded-md flex flex-col items-center justify-center bg-neutral-900 transition-all p-2"
                style={{
                  zIndex: 5 - i,
                  transform: `rotate(${
                    i === 0
                      ? "-16deg"
                      : i === 1
                      ? "-8deg"
                      : i === 2
                      ? "0deg"
                      : i === 3
                      ? "8deg"
                      : "16deg"
                  })`,
                }}
              >
                {i === 0 ? (
                  <span className="text-sm">{card.title}</span>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xs">{card.items[i - 1].title}</h3>
                    <p className="text-[10px] text-gray-300 mt-1">
                      {card.items[i - 1].description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="absolute top-[45%] right-20">
          <h2 className="text-3xl font-bethellen">Blank Canvs & Design Co.</h2>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl ">From Zero to Launch</h2>
      </div>
      <div className="mt-8">
        <h2 className="text-sm">
          we help you design, build, and grow ideas that move people. let’s make
          yours real.
        </h2>
      </div>
      <button
        onClick={() => navigate("/contact")}
        className="cursor-pointer mt-8 text-sm text-gray-900 px-12 py-2 rounded-full border-2 bg-white hover:bg-gray-100 transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]"
      >
        Get in touch
      </button>
    </div>
  );
};

export default Services;
