import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";

export default function CanvasEditor() {
  const canvasRef = useRef(null);
  const [canvasItems, setCanvasItems] = useState([]);
  const [trayItems, setTrayItems] = useState([
    {
      id: "img1",
      type: "image",
      content: "https://img.freepik.com/premium-vector/pattern_440834-2627.jpg",
    },
    {
      id: "img2",
      type: "image",
      content:
        "https://img.freepik.com/premium-vector/geometric-pattern-seamless-vector-background_3811-8735.jpg?w=360",
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
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: 120,
      height: 120,
      zIndex: canvasItems.length + 1, // initial stacking order
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

  return (
    <div className="space-y-4 p-4">
      {/* Canvas */}
      <div
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative w-full h-[500px] border border-gray-300 bg-white rounded-md shadow-md"
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
            <img
              src={item.content}
              alt="canvas item"
              className="w-full h-full object-cover rounded"
              draggable={false}
            />

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
                JSON.stringify({ type: item.type, content: item.content })
              )
            }
            className="w-16 h-16 border border-gray-400 rounded-md overflow-hidden shadow"
          >
            <img
              src={item.content}
              alt="tray item"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Upload button */}
        <div className="w-16 h-16 border border-gray-400 rounded-md flex items-center justify-center shadow relative">
          <span className="text-xl font-bold">+</span>
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
