import { useSketchStore } from "@/features/sketch/stores/sketch.store";
import { useEffect, useRef, useState } from "react";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SketchCanvas = () => {
  const ref = useRef<ReactSketchCanvasRef>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

  const { setCanvasRef, strokeWidth, eraserMode, eraserWidth, strokeColor } =
    useSketchStore();

  useEffect(() => {
    setCanvasRef(ref.current);
  }, [cursorPos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursorPos((p) => ({ ...p, visible: false }));
  };

  const activeWidth = eraserMode ? eraserWidth : strokeWidth;
  const cursorBorderColor = eraserMode ? "#ef4444" : strokeColor; // red-500 for eraser, stroke color for pen

  return (
    <div className="flex-1 bg-card border-b border-border flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full bg-white rounded-none relative"
        style={{ cursor: "none" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ReactSketchCanvas
          ref={ref}
          style={{ width: "100%", height: "100%" }}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          canvasColor="#ffffff"
          withTimestamp
        />
        {cursorPos.visible && (
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: activeWidth,
              height: activeWidth,
              borderRadius: "9999px",
              border: `2px solid ${cursorBorderColor}`,
              backgroundColor: eraserMode
                ? "rgba(255,255,255,0.35)"
                : "transparent",
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
};

export default SketchCanvas;
