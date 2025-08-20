import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import React, { useRef, useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Image as KonvaImage,
} from "react-konva";
import useImage from "use-image";

const ShapeImage = ({ shape, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef(null);

  // attach transformer if selected
  useEffect(() => {
    if (isSelected && shape.trRef?.current && shapeRef.current) {
      shape.trRef.current.nodes([shapeRef.current]);
      shape.trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shape.trRef]);

  if (shape.type === "rect") {
    return (
      <Rect
        ref={shapeRef}
        {...shape.props}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) =>
          onChange({
            ...shape,
            props: { ...shape.props, x: e.target.x(), y: e.target.y() },
          })
        }
      />
    );
  }

  if (shape.type === "circle") {
    return (
      <Circle
        ref={shapeRef}
        {...shape.props}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) =>
          onChange({
            ...shape,
            props: { ...shape.props, x: e.target.x(), y: e.target.y() },
          })
        }
      />
    );
  }

  if (shape.type === "triangle") {
    return (
      <RegularPolygon
        ref={shapeRef}
        {...shape.props}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) =>
          onChange({
            ...shape,
            props: { ...shape.props, x: e.target.x(), y: e.target.y() },
          })
        }
      />
    );
  }

  if (shape.type === "image") {
    const [img] = useImage(shape.src);
    return (
      <KonvaImage
        ref={shapeRef}
        image={img}
        {...shape.props}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) =>
          onChange({
            ...shape,
            props: { ...shape.props, x: e.target.x(), y: e.target.y() },
          })
        }
      />
    );
  }

  return null;
};

const MobileCanvas = () => {
  const stageRef = useRef(null);
  const trRef = useRef(null);

  const [stageSize, setStageSize] = useState(300);
  const [shapes, setShapes] = useState([]);
  const [showPalette, setShowPalette] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
    "#90EE90",
  ];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 500 && screenWidth <= 768) {
        setStageSize(480);
      } else {
        setStageSize(300); // fallback size
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addShape = (type, extra = {}) => {
    const id = Date.now().toString();
    let newShape = null;
    if (type === "circle") {
      newShape = {
        id,
        type,
        props: { x: 150, y: 150, radius: 50, fill: "#8b00ff" },
        trRef,
      };
    }
    if (type === "rect") {
      newShape = {
        id,
        type,
        props: { x: 60, y: 60, width: 100, height: 80, fill: "#00b4d8" },
        trRef,
      };
    }
    if (type === "triangle") {
      newShape = {
        id,
        type,
        props: { x: 200, y: 200, sides: 3, radius: 60, fill: "#ff1493" },
        trRef,
      };
    }
    if (type === "image") {
      newShape = {
        id,
        type,
        src: extra.src,
        props: { x: 80, y: 80, width: 120, height: 120 },
        trRef,
      };
    }
    setShapes((prev) => [...prev, newShape]);
    setSelectedId(id);
  };

  const handleColorChange = (color) => {
    setShapes((prev) =>
      prev.map((s) =>
        s.id === selectedId && s.type !== "image"
          ? { ...s, props: { ...s.props, fill: color } }
          : s
      )
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addShape("image", { src: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const downloadCanvas = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // higher quality
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        style={{ width: stageSize }}
        className="
          flex items-center justify-between
          mt-6
        "
      >
        <div className="relative group flex items-center">
          <ArrowPathIcon
            className={`bottom-4 left-4 h-6 w-6 cursor-pointer ${
              selectedId ? "text-white" : "text-gray-500 pointer-events-none"
            }`}
            onClick={() => {
              if (!selectedId) return;
              setShapes((prev) => prev.filter((s) => s.id !== selectedId));
              setSelectedId(null);
              trRef.current.nodes([]);
              trRef.current.getLayer()?.batchDraw();
            }}
          />
          <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10">
            remove selected figure
          </span>
        </div>

        <button
          onClick={downloadCanvas}
          className="bottom-4 right-4 flex items-center justify-center gap-1 cursor-pointer text-xs text-white px-4 py-2 rounded-full border-2 bg-black transition-transform duration-200 hover:scale-110 backdrop-blur-sm border-[rgba(107,114,128,0.4)] shadow-[0_0_8px_2px_rgba(107,114,128,0.2)]"
        >
          Save Canvas
          <ArrowDownOnSquareIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <Stage
        ref={stageRef}
        width={stageSize}
        height={stageSize}
        style={{
          border: "1px solid #ccc",
          background: "#fff",
          borderRadius: "6px",
        }}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
            trRef.current.nodes([]); // 👈 clear selection
            trRef.current.getLayer()?.batchDraw();
          }
        }}
        onTouchStart={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
            trRef.current.nodes([]); // 👈 clear selection
            trRef.current.getLayer()?.batchDraw();
          }
        }}
      >
        <Layer>
          {shapes.map((shape) => (
            <ShapeImage
              key={shape.id}
              shape={shape}
              isSelected={shape.id === selectedId}
              onSelect={() => {
                setSelectedId(shape.id);
                setShapes((prev) => {
                  const selected = prev.find((s) => s.id === shape.id);
                  const others = prev.filter((s) => s.id !== shape.id);
                  return [...others, selected]; // put selected shape at the end
                });
              }}
              onChange={(newShape) =>
                setShapes((prev) =>
                  prev.map((s) => (s.id === shape.id ? newShape : s))
                )
              }
            />
          ))}
          <Transformer
            ref={trRef}
            rotateEnabled={false}
            enabledAnchors={[
              "top-left",
              "top-center",
              "top-right",
              "middle-left",
              "middle-right",
              "bottom-left",
              "bottom-center",
              "bottom-right",
            ]}
            anchorSize={8}
            borderDash={[4, 4]}
          />
        </Layer>
      </Stage>

      {/* Tray */}
      <div
        style={{ width: stageSize }}
        className="flex flex-col items-center gap-4 bg-neutral-900 p-4 rounded-md"
      >
        {/* Row 1: Color + Shapes */}
        <div className="flex items-center w-full justify-around gap-3">
          {/* Shapes */}
          <button
            onClick={() => addShape("circle")}
            className="w-10 h-10 bg-[#8b00ff] rounded-full shadow"
          />
          <button
            onClick={() => addShape("rect")}
            className="w-10 h-10 bg-[#00b4d8] shadow"
          />
          <button
            onClick={() => addShape("triangle")}
            className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent border-b-[#ff1493]"
          />

          {/* Color Picker */}
          <div
            className={`flex flex-col items-center gap-2 relative ${
              !selectedId ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-white p-[2px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                if (!selectedId) return;
                setShowPalette((prev) => !prev);
              }}
              style={{
                background:
                  selectedId &&
                  shapes.find((s) => s.id === selectedId)?.props?.fill
                    ? shapes.find((s) => s.id === selectedId).props.fill
                    : "#fff",
              }}
            >
              {/* Color swatch */}
              <div className="w-6 h-6 rounded-full border border-gray-300" />
            </div>
            <span
              className="text-xs text-center text-gray-300 cursor-pointer"
              onClick={() => {
                if (!selectedId) return;
                setShowPalette((prev) => !prev);
              }}
            >
              Change color
            </span>
            {/* Color palette popup */}
            {selectedId && showPalette && (
              <div
                className="absolute bottom-16 left-0 -translate-x-1/2 
      bg-gray-900 text-white rounded-xl shadow-xl 
      p-3.5 z-20 w-44"
              >
                {/* Header with title + close */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs">Choose a color</h3>
                  <button
                    onClick={() => setShowPalette(false)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Color grid */}
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="w-7 h-7 rounded-md cursor-pointer transition-transform hover:scale-110"
                      style={{ background: color }}
                      onClick={() => {
                        handleColorChange(color);
                        setShowPalette(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-600"></div>

        {/* Row 2: Upload */}
        <label className="w-full h-12 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-gray-300">
          Upload Image +
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default MobileCanvas;
