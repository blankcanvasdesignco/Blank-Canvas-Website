import { useEffect, useRef } from "react";

const DotTracker = () => {
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const update = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      requestAnimationFrame(update);
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX - 8;
      mouse.current.y = e.clientY - 8;
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 w-4 h-4 rounded-full bg-white z-[9999] mix-blend-difference transition-colors duration-300"
    />
  );
};

export default DotTracker;
