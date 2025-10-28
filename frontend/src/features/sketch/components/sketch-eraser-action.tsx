import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";

const SketchEraserAction = () => {
  const { setEraserMode, setEraserWidth, eraserMode, canvasRef } =
    useSketchStore();

  const isActive = eraserMode;

  const handleClick = () => {
    setEraserMode(true);
    canvasRef?.eraseMode(true);

    setEraserWidth(12);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-pressed={isActive}
      className={`gap-2 ${
        isActive ? "bg-black! text-white! hover:bg-black" : ""
      }`}
      onClick={handleClick}
    >
      <Eraser className="w-4 h-4" />
      Eraser
    </Button>
  );
};

export default SketchEraserAction;
