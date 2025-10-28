import { useSketchStore } from "@/features/sketch/stores/sketch.store";

const SketchPenSizeAction = () => {
  const eraserMode = useSketchStore((s) => s.eraserMode);
  const strokeWidth = useSketchStore((s) => s.strokeWidth);
  const eraserWidth = useSketchStore((s) => s.eraserWidth);
  const setActiveWidth = useSketchStore((s) => s.setActiveWidth);

  const value = eraserMode ? eraserWidth : strokeWidth;

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Brush Size:</span>
      <input
        type="range"
        min={1}
        max={20}
        value={value}
        onChange={(e) => setActiveWidth(Number(e.currentTarget.value))}
        className="w-24"
        aria-label="Brush size"
      />
    </label>
  );
};

export default SketchPenSizeAction;
