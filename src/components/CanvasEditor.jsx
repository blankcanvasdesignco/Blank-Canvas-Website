import React, { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { createDraggable } from "animejs"; // Make sure this is valid or your own wrapper
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";

const trayItems = [
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
];

export default function CanvasEditor() {
  const canvasRef = useRef();
  const [canvasItems, setCanvasItems] = useState([]);
  const [isDraggingItem, setIsDraggingItem] = useState(false); // Track dragging for cursor

  // Handle drag start: store the dragged item's id
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.id);
    e.dataTransfer.setData("itemType", item.type);
    e.dataTransfer.setData("itemContent", item.content);
  };

  // Allow drop on canvas
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop: add the item to the canvas at the drop position
  const handleDrop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const itemType = e.dataTransfer.getData("itemType");
    const itemContent = e.dataTransfer.getData("itemContent");

    // Get canvas position
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    setCanvasItems((prev) => [
      ...prev,
      {
        id: nanoid(),
        originalId: itemId,
        type: itemType,
        content: itemContent,
        x: x - 32, // Center the image (assuming 64x64)
        y: y - 32,
        width: 64,
        height: 64,
      },
    ]);
  };

  // Make canvas items draggable within the canvas
  useEffect(() => {
    // Clean up previous event listeners
    const draggables = [];

    canvasItems.forEach((item) => {
      const selector = `.canvas-item-${item.id}`;
      const el = document.querySelector(selector);
      if (!el) return;

      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      const onMouseDown = (e) => {
        // Only drag if not clicking on a resize handle
        if (e.target.classList.contains("resize-handle")) return;
        isDragging = true;
        setIsDraggingItem(true);
        el.style.boxShadow = "0 0 16px 4px #6366f1";
        el.style.transform = "scale(1.08)";
        el.style.zIndex = 1000;
        // Change cursor to grabbing
        document.body.style.cursor = "grabbing";
        el.style.cursor = "grabbing";
        // Calculate offset between mouse and top-left of element
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const canvasRect = document
          .getElementById("canvas-area")
          .getBoundingClientRect();
        let newX = e.clientX - canvasRect.left - offsetX;
        let newY = e.clientY - canvasRect.top - offsetY;
        // Clamp within canvas
        newX = Math.max(0, Math.min(canvasRect.width - el.offsetWidth, newX));
        newY = Math.max(0, Math.min(canvasRect.height - el.offsetHeight, newY));
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
      };

      const onMouseUp = () => {
        if (isDragging) {
          // Update state with new position
          const canvasRect = document
            .getElementById("canvas-area")
            .getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const newX = elRect.left - canvasRect.left;
          const newY = elRect.top - canvasRect.top;
          setCanvasItems((prev) =>
            prev.map((ci) =>
              ci.id === item.id ? { ...ci, x: newX, y: newY } : ci
            )
          );
        }
        isDragging = false;
        setIsDraggingItem(false);
        el.style.boxShadow = "";
        el.style.transform = "";
        el.style.zIndex = 50;
        // Restore cursor
        document.body.style.cursor = "";
        el.style.cursor = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      el.addEventListener("mousedown", onMouseDown);
      draggables.push({ el, onMouseDown });
    });

    // Cleanup
    return () => {
      draggables.forEach(({ el, onMouseDown }) => {
        el.removeEventListener("mousedown", onMouseDown);
      });
      // Restore cursor if component unmounts while dragging
      document.body.style.cursor = "";
    };
  }, [canvasItems]);

  // --- Resizing logic ---
  // Track which item is being resized and from which corner
  const [resizing, setResizing] = useState(null);

  useEffect(() => {
    if (!resizing) return;

    const {
      id,
      corner,
      startX,
      startY,
      startWidth,
      startHeight,
      startLeft,
      startTop,
    } = resizing;

    const onMouseMove = (e) => {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      let dx = e.clientX - startX;
      let dy = e.clientY - startY;

      setCanvasItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          let newWidth = startWidth;
          let newHeight = startHeight;
          let newX = item.x;
          let newY = item.y;

          // Only allow minimum size
          const minSize = 32;

          if (corner === "se") {
            newWidth = Math.max(minSize, startWidth + dx);
            newHeight = Math.max(minSize, startHeight + dy);
          } else if (corner === "sw") {
            newWidth = Math.max(minSize, startWidth - dx);
            newHeight = Math.max(minSize, startHeight + dy);
            newX = startLeft + dx;
          } else if (corner === "ne") {
            newWidth = Math.max(minSize, startWidth + dx);
            newHeight = Math.max(minSize, startHeight - dy);
            newY = startTop + dy;
          } else if (corner === "nw") {
            newWidth = Math.max(minSize, startWidth - dx);
            newHeight = Math.max(minSize, startHeight - dy);
            newX = startLeft + dx;
            newY = startTop + dy;
          }

          // Clamp within canvas
          newWidth = Math.min(newWidth, canvasRect.width - newX);
          newHeight = Math.min(newHeight, canvasRect.height - newY);

          return {
            ...item,
            width: newWidth,
            height: newHeight,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const onMouseUp = () => {
      setResizing(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [resizing]);

  // Helper to start resizing
  const handleResizeMouseDown = (e, item, corner) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing({
      id: item.id,
      corner,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: item.width,
      startHeight: item.height,
      startLeft: item.x,
      startTop: item.y,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-center text-4xl">What's your internet aura?</h2>
        <p className="text-gray-400">drag things on the blank canvas</p>
      </div>

      {/* Canvas */}
      <div className="space-y-4">
        <div className="relative">
          <div
            id="canvas-area"
            ref={canvasRef}
            className={`relative w-full h-[500px] bg-white border rounded-md shadow-md overflow-hidden${isDraggingItem ? " cursor-grabbing" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* Render items dropped on the canvas */}
            {canvasItems.map((item) => (
              <div
                key={item.id}
                className={`canvas-item-${item.id} absolute border border-gray-400 rounded-md shadow z-50 group`}
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.width,
                  height: item.height,
                  userSelect:
                    resizing && resizing.id === item.id ? "none" : "auto",
                  cursor: isDraggingItem ? "grabbing" : "grab",
                }}
              >
                <img
                  src={item.content}
                  alt="canvas item"
                  className="w-full h-full object-cover rounded-md pointer-events-none"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                />
                {/* Resize handles */}
                {/* Show handles on hover or if resizing this item */}
                <div
                  className={`${
                    resizing && resizing.id === item.id
                      ? ""
                      : "group-hover:block hidden"
                  }`}
                >
                  {/* SE (bottom right) */}
                  <div
                    className="resize-handle absolute right-0 bottom-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nwse-resize z-50"
                    style={{ transform: "translate(50%, 50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "se")}
                  />
                  {/* SW (bottom left) */}
                  <div
                    className="resize-handle absolute left-0 bottom-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nesw-resize z-50"
                    style={{ transform: "translate(-50%, 50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "sw")}
                  />
                  {/* NE (top right) */}
                  <div
                    className="resize-handle absolute right-0 top-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nesw-resize z-50"
                    style={{ transform: "translate(50%, -50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "ne")}
                  />
                  {/* NW (top left) */}
                  <div
                    className="resize-handle absolute left-0 top-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nwse-resize z-50"
                    style={{ transform: "translate(-50%, -50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "nw")}
                  />
                </div>
              </div>
            ))}
          </div>

          <ArrowPathIcon className="absolute bottom-4 left-4 h-6 w-6 text-black" />
          <button className="absolute bottom-4 right-4 flex items-center justify-center gap-1 cursor-pointer text-xs text-white px-4 py-2 rounded-full border-2 bg-black transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]">
            Save Canvas
            <ArrowDownOnSquareIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Tray */}
        <div className="flex justify-center bg-[#707070] items-center rounded-md border border-gray-400 p-4">
          <div className="flex bg-[#707070] gap-4 rounded-md overflow-x-auto">
            {trayItems.map((item) => (
              <div
                key={item.id}
                className={`w-16 h-16 border border-gray-400 rounded-md shadow cursor-grab z-10 bg-white flex items-center justify-center`}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                style={{ position: "relative" }}
                onMouseDown={e => { e.currentTarget.style.cursor = "grabbing"; }}
                onMouseUp={e => { e.currentTarget.style.cursor = "grab"; }}
                onMouseLeave={e => { e.currentTarget.style.cursor = "grab"; }}
              >
                <img
                  src={item.content}
                  alt="tray item"
                  className="w-full h-full object-cover rounded-md pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
