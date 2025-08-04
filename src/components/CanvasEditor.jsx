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
  const [draggedTrayItem, setDraggedTrayItem] = useState(null); // For mobile tray drag
  const [resizing, setResizing] = useState(null);

  // --- Desktop drag-n-drop handlers ---
  const handleDragStart = (e, item) => {
    // Only for desktop
    e.dataTransfer.setData("itemId", item.id);
    e.dataTransfer.setData("itemType", item.type);
    e.dataTransfer.setData("itemContent", item.content);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
        x: x - 32,
        y: y - 32,
        width: 64,
        height: 64,
      },
    ]);
  };

  // --- Mobile tray drag logic ---
  // On touch start, set the dragged item and show a floating preview
  const handleTrayTouchStart = (e, item) => {
    e.preventDefault();
    setDraggedTrayItem({
      ...item,
      touchId: e.changedTouches[0].identifier,
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsDraggingItem(true);
  };

  // Move the floating preview with the finger
  const handleTrayTouchMove = (e) => {
    if (!draggedTrayItem) return;
    const touch = Array.from(e.touches).find(
      (t) => t.identifier === draggedTrayItem.touchId
    );
    if (!touch) return;
    setDraggedTrayItem((prev) => ({
      ...prev,
      x: touch.clientX,
      y: touch.clientY,
    }));
  };

  // On touch end, drop the item if over the canvas
  const handleTrayTouchEnd = (e) => {
    if (!draggedTrayItem) return;
    const touch = Array.from(e.changedTouches).find(
      (t) => t.identifier === draggedTrayItem.touchId
    );
    if (!touch) {
      setDraggedTrayItem(null);
      setIsDraggingItem(false);
      return;
    }
    // Check if dropped over canvas
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - canvasRect.left;
    const y = touch.clientY - canvasRect.top;
    if (
      touch.clientX >= canvasRect.left &&
      touch.clientX <= canvasRect.right &&
      touch.clientY >= canvasRect.top &&
      touch.clientY <= canvasRect.bottom
    ) {
      setCanvasItems((prev) => [
        ...prev,
        {
          id: nanoid(),
          originalId: draggedTrayItem.id,
          type: draggedTrayItem.type,
          content: draggedTrayItem.content,
          x: x - 32,
          y: y - 32,
          width: 64,
          height: 64,
        },
      ]);
    }
    setDraggedTrayItem(null);
    setIsDraggingItem(false);
  };

  // --- Canvas item drag (move) logic: mouse and touch ---
  useEffect(() => {
    const draggables = [];

    canvasItems.forEach((item) => {
      const selector = `.canvas-item-${item.id}`;
      const el = document.querySelector(selector);
      if (!el) return;

      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;
      let touchId = null;

      // --- Mouse events ---
      const onMouseDown = (e) => {
        if (e.target.classList.contains("resize-handle")) return;
        isDragging = true;
        setIsDraggingItem(true);
        el.style.boxShadow = "0 0 16px 4px #6366f1";
        el.style.transform = "scale(1.08)";
        el.style.zIndex = 1000;
        document.body.style.cursor = "grabbing";
        el.style.cursor = "grabbing";
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        let newX = e.clientX - canvasRect.left - offsetX;
        let newY = e.clientY - canvasRect.top - offsetY;
        newX = Math.max(0, Math.min(canvasRect.width - el.offsetWidth, newX));
        newY = Math.max(0, Math.min(canvasRect.height - el.offsetHeight, newY));
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
      };

      const onMouseUp = () => {
        if (isDragging) {
          const canvasRect = canvasRef.current.getBoundingClientRect();
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
        document.body.style.cursor = "";
        el.style.cursor = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      // --- Touch events ---
      const onTouchStart = (e) => {
        if (e.target.classList.contains("resize-handle")) return;
        if (e.touches.length > 1) return; // ignore multi-touch
        isDragging = true;
        setIsDraggingItem(true);
        el.style.boxShadow = "0 0 16px 4px #6366f1";
        el.style.transform = "scale(1.08)";
        el.style.zIndex = 1000;
        el.style.cursor = "grabbing";
        const rect = el.getBoundingClientRect();
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        touchId = touch.identifier;
        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchEnd);
        document.addEventListener("touchcancel", onTouchEnd);
      };

      const onTouchMove = (e) => {
        if (!isDragging) return;
        const touch = Array.from(e.touches).find((t) => t.identifier === touchId);
        if (!touch) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        let newX = touch.clientX - canvasRect.left - offsetX;
        let newY = touch.clientY - canvasRect.top - offsetY;
        newX = Math.max(0, Math.min(canvasRect.width - el.offsetWidth, newX));
        newY = Math.max(0, Math.min(canvasRect.height - el.offsetHeight, newY));
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
        e.preventDefault();
      };

      const onTouchEnd = (e) => {
        if (isDragging) {
          const canvasRect = canvasRef.current.getBoundingClientRect();
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
        el.style.cursor = "";
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.removeEventListener("touchcancel", onTouchEnd);
      };

      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("touchstart", onTouchStart, { passive: false });
      draggables.push({ el, onMouseDown, onTouchStart });
    });

    // Cleanup
    return () => {
      draggables.forEach(({ el, onMouseDown, onTouchStart }) => {
        el.removeEventListener("mousedown", onMouseDown);
        el.removeEventListener("touchstart", onTouchStart);
      });
      document.body.style.cursor = "";
    };
    // eslint-disable-next-line
  }, [canvasItems]);

  // --- Resizing logic (mouse and touch) ---
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
      touchId,
    } = resizing;

    // Mouse move/resize
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

    // Touch move/resize
    const onTouchMove = (e) => {
      const touch = Array.from(e.touches).find((t) => t.identifier === touchId);
      if (!touch) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      let dx = touch.clientX - startX;
      let dy = touch.clientY - startY;

      setCanvasItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          let newWidth = startWidth;
          let newHeight = startHeight;
          let newX = item.x;
          let newY = item.y;
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
      e.preventDefault();
    };

    const onTouchEnd = () => {
      setResizing(null);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
    };

    if (touchId !== undefined) {
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
      document.addEventListener("touchcancel", onTouchEnd);
      return () => {
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.removeEventListener("touchcancel", onTouchEnd);
      };
    } else {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [resizing]);

  // Helper to start resizing (mouse)
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

  // Helper to start resizing (touch)
  const handleResizeTouchStart = (e, item, corner) => {
    e.stopPropagation();
    e.preventDefault();
    const touch = e.touches[0];
    setResizing({
      id: item.id,
      corner,
      startX: touch.clientX,
      startY: touch.clientY,
      startWidth: item.width,
      startHeight: item.height,
      startLeft: item.x,
      startTop: item.y,
      touchId: touch.identifier,
    });
  };

  // --- Render ---
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
            onTouchMove={draggedTrayItem ? handleTrayTouchMove : undefined}
            onTouchEnd={draggedTrayItem ? handleTrayTouchEnd : undefined}
            onTouchCancel={draggedTrayItem ? handleTrayTouchEnd : undefined}
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
                  touchAction: "none",
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
                    onTouchStart={(e) => handleResizeTouchStart(e, item, "se")}
                  />
                  {/* SW (bottom left) */}
                  <div
                    className="resize-handle absolute left-0 bottom-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nesw-resize z-50"
                    style={{ transform: "translate(-50%, 50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "sw")}
                    onTouchStart={(e) => handleResizeTouchStart(e, item, "sw")}
                  />
                  {/* NE (top right) */}
                  <div
                    className="resize-handle absolute right-0 top-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nesw-resize z-50"
                    style={{ transform: "translate(50%, -50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "ne")}
                    onTouchStart={(e) => handleResizeTouchStart(e, item, "ne")}
                  />
                  {/* NW (top left) */}
                  <div
                    className="resize-handle absolute left-0 top-0 w-3 h-3 bg-white border border-gray-500 rounded-full cursor-nwse-resize z-50"
                    style={{ transform: "translate(-50%, -50%)" }}
                    onMouseDown={(e) => handleResizeMouseDown(e, item, "nw")}
                    onTouchStart={(e) => handleResizeTouchStart(e, item, "nw")}
                  />
                </div>
              </div>
            ))}
            {/* Mobile floating tray item preview */}
            {draggedTrayItem && (
              <div
                style={{
                  position: "fixed",
                  left: draggedTrayItem.x - 32,
                  top: draggedTrayItem.y - 32,
                  width: 64,
                  height: 64,
                  pointerEvents: "none",
                  zIndex: 9999,
                  opacity: 0.8,
                  borderRadius: "0.375rem",
                  boxShadow: "0 0 16px 4px #6366f1",
                  border: "1px solid #a3a3a3",
                  background: "#fff",
                }}
              >
                <img
                  src={draggedTrayItem.content}
                  alt="drag preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0.375rem",
                  }}
                  draggable={false}
                />
              </div>
            )}
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
                style={{ position: "relative", touchAction: "none" }}
                onMouseDown={e => { e.currentTarget.style.cursor = "grabbing"; }}
                onMouseUp={e => { e.currentTarget.style.cursor = "grab"; }}
                onMouseLeave={e => { e.currentTarget.style.cursor = "grab"; }}
                onTouchStart={e => handleTrayTouchStart(e, item)}
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
