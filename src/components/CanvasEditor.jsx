import React, { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { createDraggable } from "animejs"; // Make sure this is valid or your own wrapper
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";

let trayItems = [
  {
    id: "img1",
    type: "image",
    content:
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  },
  {
    id: "img2",
    type: "image",
    content:
      "https://img.freepik.com/premium-photo/blurred-motion-people-sunset-lake_548821-76617.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: "img3",
    type: "image",
    content:
      "https://img.freepik.com/premium-photo/blurred-motion-people-sunset-lake_548821-76617.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: "img4",
    type: "image",
    content:
      "https://img.freepik.com/premium-photo/blurred-motion-people-sunset-lake_548821-76617.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: "img5",
    type: "image",
    content:
      "https://img.freepik.com/premium-photo/blurred-motion-people-sunset-lake_548821-76617.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: "img6",
    type: "text",
    content: "Hello World !",
  },
];

export default function CanvasEditor() {
  const canvasRef = useRef();

  useEffect(() => {
    // Delay to ensure DOM elements are mounted
    setTimeout(() => {
      trayItems.forEach((item) => {
        createDraggable(`.tray-item-${item.id}`, {
          container: "#canvas",
        });
      });
    }, 0);
  }, []);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-center text-4xl">What's your internet aura?</h2>
        <p className="text-gray-400">drag things on the blank canvas</p>
      </div>

      {/* Canvas */}
      <div id="canvas" className="space-y-4">
        <div className="relative">
          <div
            ref={canvasRef}
            className="relative w-full h-[500px] bg-white border rounded-md shadow-md overflow-hidden"
          ></div>

          <ArrowPathIcon className="absolute bottom-4 left-4 h-6 w-6 text-black" />
          <button className="absolute bottom-4 right-4 flex items-center justify-center gap-1 cursor-pointer text-xs text-white px-4 py-2 rounded-full border-2 bg-black transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]">
            Save Canvas
            <ArrowDownOnSquareIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Tray */}

        <div
          className="tray flex justify-center gap-4 bg-[#707070] items-center rounded-md border border-gray-400 p-4"
          style={{
            width: "600px",
            height: "96px",
            minWidth: "600px",
            minHeight: "96px",
            maxWidth: "600px",
            maxHeight: "96px",
            margin: "0 auto",
          }}
        >
          {trayItems.map((item) => (
            <div
              key={item.id}
              className={`tray-item-${item.id} w-16 h-16 border border-gray-400 rounded-md shadow flex items-center justify-center`}
            >
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="tray item"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-center text-base font-semibold text-black select-none">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
