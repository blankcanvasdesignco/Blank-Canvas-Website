import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import html2canvas from "html2canvas";

export default function CanvasEditor() {
  const canvasRef = useRef(null);
  const [canvasItems, setCanvasItems] = useState([]);
  const [trayItems, setTrayItems] = useState([
    {
      id: "img1",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBhdHRlcm58ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "img2",
      type: "image",
      content:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAtUoqvSuaXlKkgWKMyT4GFhJeZK-s6E_qaQ&s",
    },
    {
      id: "shape1",
      type: "shape",
      shape: "circle",
      color: "#ff1f1f",
    },
    {
      id: "shape2",
      type: "shape",
      shape: "square",
      color: "#00b4d8",
    },
  ]);

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
              <div
                className={`w-full h-full ${
                  item.shape === "circle" ? "rounded-full" : ""
                }`}
                style={{ backgroundColor: item.color }}
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
      <div className="flex justify-center gap-4 p-2 bg-gray-200 rounded-md">
        {trayItems.map((item) => (
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
            className="w-16 h-16 border border-gray-400 rounded-md overflow-hidden shadow flex items-center justify-center"
          >
            {item.type === "image" ? (
              <img
                src={item.content}
                alt="tray item"
                className="w-full h-full object-cover"
              />
            ) : item.type === "shape" ? (
              <div
                className={`w-10 h-10 ${
                  item.shape === "circle" ? "rounded-full" : ""
                }`}
                style={{ backgroundColor: item.color }}
              />
            ) : null}
          </div>
        ))}

        {/* Upload button */}
        <div className="w-16 h-16 border border-gray-400 rounded-md flex items-center justify-center shadow relative">
          <span className="text-xl text-black">+</span>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  setTrayItems((prev) => [
                    ...prev,
                    {
                      id: nanoid(),
                      type: "image",
                      content: reader.result,
                    },
                  ]);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
