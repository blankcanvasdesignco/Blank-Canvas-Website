import { animate, onScroll, utils } from "animejs";
import React, { useEffect } from "react";
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
  const navigate = useNavigate();

  // const handleClick = () => {
  //   utils.$(".square").forEach(($square) => {
  //     const cards = $square.querySelectorAll(".inner-card");
  //     cards.forEach(($card, index) => {
  //       animate($card, {
  //         translateY: `${index * 10}rem`, // move down based on card index
  //         rotate: index === 0 ? "0turn" : "1turn", // 0th index: 0 turns, others: 1 turn
  //         transformOrigin: "center center", // keep rotation in place
  //         duration: 2000,
  //         alternate: true,
  //         ease: "inOutQuad",
  //         autoplay: onScroll({
  //           container: ".scroll-container",
  //           sync: 1,
  //           enter: "max bottom",
  //           leave: "min top",
  //         }),
  //       });
  //     });
  //   });
  // };

  // For screens >= 640px
  useEffect(() => {
    if (window.innerWidth < 640) return;
    cardData.forEach((_, colIndex) => {
      const squares = utils.$(`.card-${colIndex} .square`);
      for (let index = 0; index < squares.length; index++) {
        let enter, leave;
        switch (index) {
          case 0:
            enter = { container: "0", target: "0" };
            leave = { container: "0", target: "0" };
            break;
          case 1:
            enter = { container: "320", target: "bottom" };
            leave = { container: "120", target: "top" };
            break;
          case 2:
            enter = { container: "320", target: "bottom+=120" };
            leave = { container: "120", target: "top+=120" };
            break;
          case 3:
            enter = { container: "320", target: "bottom+=240" };
            leave = { container: "120", target: "top+=240" };
            break;
          default:
            enter = { container: "320", target: "bottom+=360" };
            leave = { container: "120", target: "top+=360" };
            break;
        }

        const $square = squares[index];
        let rotateDeg;
        switch (index) {
          case 0:
            rotateDeg = 360;
            break;
          case 1:
            rotateDeg = 354;
            break;
          case 2:
            rotateDeg = 348;
            break;
          case 3:
            rotateDeg = 342;
            break;
          default:
            rotateDeg = 0;
        }
        animate($square, {
          y: `${index * 11}rem`,
          rotate: `${rotateDeg}deg`,
          duration: 2000,
          alternate: true,
          ease: "inOutQuad",
          autoplay: onScroll({
            container: ".square-container", // your scroll container
            sync: 1,
            enter,
            leave,
          }),
        });
      }
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 640) return; // only runs for >= 640px

    let allSquares = [];
    for (let colIndex = 0; colIndex < 12; colIndex++) {
      const squares = utils.$(`.square-${colIndex}`);
      for (let i = 0; i < squares.length; i++) {
        allSquares.push(squares[i]);
      }
    }

    for (let index = 0; index < allSquares.length; index++) {
      let enter, leave;

      switch (index) {
        case 0:
          enter = { container: "0", target: "0" };
          leave = { container: "0", target: "0" };
          break;
        case 1:
          enter = { container: "240", target: "bottom" };
          leave = { container: "40", target: "top" };
          break;
        case 2:
          enter = { container: "240", target: "bottom+=120" };
          leave = { container: "40", target: "top+=120" };
          break;
        case 3:
          enter = { container: "240", target: "bottom+=240" };
          leave = { container: "40", target: "top+=240" };
          break;
        case 4:
          enter = { container: "0", target: "0" };
          leave = { container: "0", target: "0" };
          break;
        case 5:
          enter = { container: "240", target: "bottom" };
          leave = { container: "40", target: "top" };
          break;
        case 6:
          enter = { container: "240", target: "bottom+=120" };
          leave = { container: "40", target: "top+=120" };
          break;
        case 7:
          enter = { container: "240", target: "bottom+=240" };
          leave = { container: "40", target: "top+=240" };
          break;
        case 8:
          enter = { container: "0", target: "0" };
          leave = { container: "0", target: "0" };
          break;
        case 9:
          enter = { container: "240", target: "bottom" };
          leave = { container: "40", target: "top" };
          break;
        case 10:
          enter = { container: "240", target: "bottom+=120" };
          leave = { container: "40", target: "top+=120" };
          break;
        case 11:
          enter = { container: "240", target: "bottom+=240" };
          leave = { container: "40", target: "top+=240" };
          break;
        default:
          enter = { container: "240", target: "bottom" };
          leave = { container: "40", target: "top" };
          break;
      }

      const rotationArr = [360, 354, 348, 342];
      let rotateDeg = rotationArr[index % 4];
      let yValue = (index % 4) * 11;

      animate(allSquares[index], {
        y: `${yValue}rem`,
        rotate: `${rotateDeg}deg`,
        duration: 2000,
        alternate: true,
        ease: "inOutQuad",
        autoplay: onScroll({
          container: ".square-container",
          sync: 1,
          enter,
          leave,
        }),
      });
    }
  }, [cardData]);

  return (
    <div className="bg-black text-white py-16 text-center px-4 font-unbounded">
      <h2 className="text-2xl font-semibold mb-2">What We Do (And Do Well)</h2>
      <p className="text-sm max-w-md mx-auto mb-16">
        From the first sketch to launch day, we build apps like they're art.
        Like it's a song. It has to move you.
      </p>

      {/* <div className="py-40 bg-blue-200">
        <div className="py-24 bg-green-500">
          <div className="square w-32 h-32 bg-yellow-200 rounded z-10">
            Hello
          </div>
        </div>
      </div> */}

      {/* Centered row of stacks */}
      <div
        className="hidden sm:flex flex-row justify-center gap-16 p-4 pt-8 pb-12"
        style={{ height: "700px" }}
      >
        {cardData.map((card, colIndex) => (
          <div
            key={card.id}
            className={`card-${colIndex} relative w-36 h-36 cursor-pointer`}
          >
            {[0, 1, 2, 3].map((i) => {
              const baseRot = [0, 6, 12, 18][i]; // your default “messy stack” angles
              return (
                <div
                  key={i}
                  className="square absolute inset-0" // ← this is what you already animate
                  style={{ zIndex: 5 - i, transformOrigin: "center" }}
                  data-index={i}
                >
                  <div
                    className="square-face w-full h-full border-2 border-dashed border-white rounded-md
                        flex flex-col items-center justify-center bg-neutral-900 p-2"
                    style={{ transform: `rotate(${baseRot}deg)` }} // ← static initial tilt
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
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className="sm:hidden flex flex-col items-center gap-140 justify-center p-4 pt-8 pb-120"
        style={{ minHeight: "400px" }}
      >
        {cardData.map((card, colIndex) => (
          <div
            key={card.id}
            className={`card-${colIndex} relative w-36 h-36 cursor-pointer mb-12`}
          >
            {[0, 1, 2, 3].map((i) => {
              const baseRot = [0, 6, 12, 18][i];
              const globalIndex = colIndex * 4 + i;

              return (
                <div
                  key={i}
                  className={`square-${globalIndex} absolute inset-0`}
                  style={{ zIndex: 5 - i, transformOrigin: "center" }}
                  data-index={globalIndex}
                >
                  <div
                    className="square-face w-full h-full border-2 border-dashed border-white rounded-md
                flex flex-col items-center justify-center bg-neutral-900 p-2"
                    style={{ transform: `rotate(${baseRot}deg)` }}
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
                </div>
              );
            })}
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
