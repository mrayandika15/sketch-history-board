import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";

const SketchPenAction = () => {
  const { setEraserMode, setStrokeColor, setStrokeWidth, eraserMode } =
    useSketchStore();

  const isActive = !eraserMode;

  const handleClick = () => {
    setEraserMode(false);
    setStrokeColor("#0f172a"); // default dark ink on light canvas
    setStrokeWidth(4);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      aria-pressed={isActive}
      className={`gap-2 ${
        isActive ? "bg-black! text-white! hover:bg-black" : ""
      }`}
      onClick={handleClick}
    >
      <Pen className="w-4 h-4" />
      Pen
    </Button>
  );
};

export default SketchPenAction;
