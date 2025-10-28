import { Button } from "@/components/ui/button";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";
import { Trash2 } from "lucide-react";

const SketchClearAction = () => {
  const { canvasRef } = useSketchStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-destructive hover:text-destructive"
      onClick={() => canvasRef?.clearCanvas()}
    >
      <Trash2 className="w-4 h-4" />
      Clear
    </Button>
  );
};

export default SketchClearAction;
