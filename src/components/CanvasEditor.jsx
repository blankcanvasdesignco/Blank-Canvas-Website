import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { nanoid } from "nanoid";

const trayItems = [
  { id: "text1", type: "text", content: "Hello World" },
  {
    id: "img1",
    type: "image",
    content:
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  },
];

export default function CanvasEditor() {
  const [elements, setElements] = useState([]);
  const canvasRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("item"));
    const rect = canvasRef.current.getBoundingClientRect();
    const newElement = {
      id: nanoid(),
      type: data.type,
      content: data.content,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: 120,
      height: 120,
    };
    setElements((prev) => [...prev, newElement]);
  };

  const updateElement = (id, newProps) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  return (
    <div className="p-4 space-y-4">
      {/* Tray */}
      <div className="flex gap-4 border-b pb-2 overflow-x-auto">
        {trayItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("item", JSON.stringify(item))
            }
            className="p-2 bg-white border rounded cursor-grab shadow"
          >
            {item.type === "text" ? (
              <span>{item.content}</span>
            ) : (
              <img src={item.content} alt="item" className="h-12" />
            )}
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative w-full h-[500px] bg-white border shadow-md overflow-hidden"
      >
        {elements.map((el) => (
          <Rnd
            key={el.id}
            size={{ width: el.width, height: el.height }}
            position={{ x: el.x, y: el.y }}
            onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) =>
              updateElement(el.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                x: pos.x,
                y: pos.y,
              })
            }
            bounds="parent"
          >
            <div className="w-full h-full flex items-center justify-center select-none bg-opacity-10">
              {el.type === "text" ? (
                <span className="text-sm font-bold">{el.content}</span>
              ) : (
                <img
                  src={el.content}
                  alt="element"
                  className="object-contain w-full h-full"
                />
              )}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
