import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import html2canvas from "html2canvas";

const ShapeRenderer = ({ shape, color, width, height }) => {
  if (shape === "triangle") {
    // Increase height & base so it looks balanced with circle/square
    const scaleFactor = 1.2; // tweak until it visually matches
    const halfW = (width * scaleFactor) / 2;
    const scaledHeight = height * scaleFactor;

    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${halfW}px solid transparent`,
          borderRight: `${halfW}px solid transparent`,
          borderBottom: `${scaledHeight}px solid ${color}`,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color,
        borderRadius: shape === "circle" ? "9999px" : "0px",
      }}
    />
  );
};

export default function CanvasEditor() {
  const canvasRef = useRef(null);
  const [canvasItems, setCanvasItems] = useState([]);
  const [showPalette, setShowPalette] = useState(false);
  const [trayItems, setTrayItems] = useState([
    {
      id: "shape1",
      type: "shape",
      shape: "circle",
      color: "#8b00ff",
    },
    {
      id: "shape2",
      type: "shape",
      shape: "square",
      color: "#00b4d8",
    },
    {
      id: "shape3",
      type: "shape",
      shape: "triangle",
      color: "#ff1493",
    },
  ]);
  const colors = [
    "#ff1f1f",
    "#00b4d8",
    "#48cae4",
    "#ffb703",
    "#8338ec",
    "#06d6a0",
    "#ff7f50",
    "#ff69b4",
    "#1e90ff",
    "#ffd700",
    "#7fff00",
    "#ff4500",
    "#8b00ff",
    "#00ced1",
    "#ff1493",
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("item"));
    const rect = canvasRef.current.getBoundingClientRect();

    const newItem = {
      id: nanoid(),
      type: data.type,
      content: data.content,
      shape: data.shape,
      color: data.color,
      x: e.clientX - rect.left - 60,
      y: e.clientY - rect.top - 60,
      width: 120,
      height: 120,
      zIndex: canvasItems.length + 1,
    };

    setCanvasItems((prev) => [...prev, newItem]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const startDragging = (e, id) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    setCanvasItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDragging: true,
              offsetX: startX - item.x,
              offsetY: startY - item.y,
              zIndex: Math.max(...prev.map((i) => i.zIndex || 1)) + 1, // bring to front
            }
          : item
      )
    );

    const handleMouseMove = (moveEvent) => {
      setCanvasItems((prev) =>
        prev.map((item) =>
          item.id === id && item.isDragging
            ? {
                ...item,
                x: moveEvent.clientX - item.offsetX,
                y: moveEvent.clientY - item.offsetY,
              }
            : item
        )
      );
    };

    const handleMouseUp = () => {
      setCanvasItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isDragging: false } : item
        )
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const startResizing = (e, id) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    setCanvasItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isResizing: true,
              startWidth: item.width,
              startHeight: item.height,
              resizeStartX: startX,
              resizeStartY: startY,
            }
          : item
      )
    );

    const handleMouseMove = (moveEvent) => {
      setCanvasItems((prev) =>
        prev.map((item) => {
          if (item.id === id && item.isResizing) {
            const deltaX = moveEvent.clientX - item.resizeStartX;
            const deltaY = moveEvent.clientY - item.resizeStartY;
            return {
              ...item,
              width: Math.max(40, item.startWidth + deltaX),
              height: Math.max(40, item.startHeight + deltaY),
            };
          }
          return item;
        })
      );
    };

    const handleMouseUp = () => {
      setCanvasItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isResizing: false } : item
        )
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const downloadCanvas = async () => {
    if (canvasRef.current) {
      const canvasImage = await html2canvas(canvasRef.current, {
        useCORS: true,
        backgroundColor: null,
      });
      const dataURL = canvasImage.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas.png";
      link.click();
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Canvas */}
      <div className="flex items-center justify-between">
        <ArrowPathIcon
          className="bottom-4 left-4 h-6 w-6 text-white cursor-pointer"
          onClick={() => {
            setCanvasItems((prev) => prev.slice(0, -1)); // removes last item
          }}
        />
        <button
          onClick={downloadCanvas}
          className="bottom-4 right-4 flex items-center justify-center gap-1 cursor-pointer text-xs text-white px-4 py-2 rounded-full border-2 bg-black transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]"
        >
          Save Canvas
          <ArrowDownOnSquareIcon className="w-4 h-4" />
        </button>
      </div>
      <div
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative w-full h-[500px] border border-[#D1D5DB] bg-white rounded-md shadow-md overflow-hidden"
      >
        {canvasItems.map((item) => (
          <div
            key={item.id}
            onMouseDown={(e) => startDragging(e, item.id)}
            className="absolute cursor-move group"
            style={{
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
              zIndex: item.zIndex,
              userSelect: "none",
            }}
          >
            {item.type === "image" ? (
              <img
                src={item.content}
                alt="canvas item"
                className="w-full h-full object-cover rounded"
                draggable={false}
                crossOrigin="anonymous"
              />
            ) : item.type === "shape" ? (
              <ShapeRenderer
                shape={item.shape}
                color={item.color}
                width={item.width}
                height={item.height}
              />
            ) : null}

            {/* Resize handle */}
            <div
              onMouseDown={(e) => startResizing(e, item.id)}
              className="absolute w-4 h-4 bottom-0 right-0 cursor-se-resize"
              style={{ opacity: 0 }}
            />
          </div>
        ))}
      </div>

      {/* Tray */}
      <div className="flex items-center justify-between bg-[#1E1E1E] px-4 py-3 rounded-lg shadow-lg">
        {/* Left Section: Color Picker + Shapes */}
        <div className="relative flex items-center gap-4 overflow-x-visible">
          {/* Color Wheel Button */}
          <button
            onClick={() => setShowPalette((prev) => !prev)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 via-yellow-400 to-green-400 border border-gray-500 shadow-inner" />
            <span className="text-xs text-gray-300">Change color</span>
          </button>

          {/* Color Palette */}
          {showPalette && (
            <div className="absolute z-1000 bottom-12 left-0 bg-black text-white rounded-xl p-4 shadow-lg border border-gray-600">
              {/* Cross mark at top right */}
              <button
                className="absolute top-1 right-1 p-1 rounded hover:bg-gray-700 transition"
                onClick={() => setShowPalette(false)}
                aria-label="Close color palette"
                tabIndex={0}
              >
                <XMarkIcon className="w-4 h-4 text-gray-300" />
              </button>
              <h3 className="text-center text-lg font-medium mb-3">
                Choose a color
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-md cursor-pointer border border-gray-500"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setTrayItems((prev) =>
                        prev.map((item) =>
                          item.type === "shape" ? { ...item, color } : item
                        )
                      );
                      setShowPalette(false);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Shapes */}

          {trayItems.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData(
                  "item",
                  JSON.stringify({
                    type: item.type,
                    content: item.content,
                    shape: item.shape,
                    color: item.color,
                  })
                )
              }
              onClick={() => {
                if (item.type === "shape") {
                  const newColor =
                    colors[Math.floor(Math.random() * colors.length)];

                  setTrayItems((prev) =>
                    prev.map((trayItem, i) =>
                      i === index ? { ...trayItem, color: newColor } : trayItem
                    )
                  );
                }
              }}
              className="w-12 h-12 overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {item.type === "shape" ? (
                <div className="w-full h-full flex items-center justify-center">
                  <ShapeRenderer
                    shape={item.shape}
                    color={item.color}
                    width={40} // match your w-12 (~48px) or w-10 size
                    height={40}
                  />
                </div>
              ) : item.type === "image" ? (
                <img
                  src={item.content}
                  alt="tray item"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-gray-600" />

        {/* Upload Image Section */}
        <label className="flex items-center justify-center w-48 h-12 border-2 border-dashed border-gray-500 rounded-lg text-gray-400 text-sm cursor-pointer hover:border-gray-300 transition-colors">
          Upload Image <span className="ml-1 text-lg">+</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  +setCanvasItems((prev) => [
                    ...prev,
                    {
                      id: nanoid(),
                      type: "image",
                      content: reader.result,
                      x: 80 + prev.length * 20,
                      y: 80 + prev.length * 20,
                      width: 150, // default width
                      height: 150, // default height
                      zIndex: prev.length + 1,
                    },
                  ]);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
