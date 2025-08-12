import React, { useState, useEffect, useRef } from "react";
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
  const stacksRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false); // to ensure it runs once

  const handleExpand = (index, expand = true) => {
    animate(`.card-${index} .inner-card`, {
      translateY: (el, i) => (expand ? i * 200 : 0), // vertical spread
      rotate: (el, i) => (expand ? 0 : -4 + i * 4),
      duration: 600,
      easing: "easeOutExpo",
      delay: stagger(100, { direction: expand ? "normal" : "reverse" }),
    });

    setExpanded((prev) => ({ ...prev, [index]: expand }));
  };

  // Trigger animation when stacks come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          cardData.forEach((_, index) => {
            setTimeout(() => handleExpand(index, true), index * 500);
          });
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 } // 30% visible
    );

    if (stacksRef.current) {
      observer.observe(stacksRef.current);
    }

    return () => {
      if (stacksRef.current) observer.unobserve(stacksRef.current);
    };
  }, [hasAnimated]);

  return (
    <div className="bg-black text-white py-16 text-center px-4 font-unbounded">
      <h2 className="text-2xl font-semibold mb-2">What We Do (And Do Well)</h2>
      <p className="text-sm max-w-md mx-auto mb-16">
        From the first sketch to launch day, we build apps like they're art.
        Like it's a song. It has to move you.
      </p>

      {/* Centered row of stacks */}
      <div
        ref={stacksRef}
        className="flex flex-row justify-center gap-16 p-4 pt-8 pb-12 transition-[height] duration-700"
        style={{
          height: Object.values(expanded).some(Boolean) ? "800px" : "220px",
        }}
      >
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className={`card-${index} relative w-36 h-36 cursor-pointer`}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="inner-card absolute inset-0 border-2 border-dashed border-white rounded-md flex flex-col items-center justify-center bg-neutral-900 transition-all p-2"
                style={{
                  zIndex: 5 - i,
                  transform: `rotate(${
                    i === 0
                      ? "-8deg"
                      : i === 1
                      ? "-4deg"
                      : i === 2
                      ? "0deg"
                      : i === 3
                      ? "4deg"
                      : "8deg"
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
      </div>

      <div className="mt-16">
        <h2 className="text-xl">From Zero to Launch</h2>
      </div>
      <div className="mt-8">
        <h2 className="text-sm">
          we help you design, build, and grow ideas that move people. let’s make
          yours real.
        </h2>
      </div>
      <button
        onClick={() => navigate("/contact")}
        className="px-12 py-2 mt-8 bg-white text-sm text-black border border-[#707070] rounded-[56px] opacity-100 shadow-[inset_0px_1.6px_4px_#000000,0px_3px_6px_#00000029] cursor-pointer transition-transform duration-200 hover:scale-110"
      >
        Get in touch
      </button>
    </div>
  );
};

export default Services;
