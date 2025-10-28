import { Button } from "@/components/ui/button";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";
import { Redo2, Undo2 } from "lucide-react";

const SketchUndoRedo = () => {
  const { canvasRef } = useSketchStore();

  const disabled = !canvasRef;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => canvasRef?.undo?.()}
        aria-label="Undo"
      >
        <Undo2 className="w-4 h-4" />
        Undo
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => canvasRef?.redo?.()}
        aria-label="Redo"
      >
        <Redo2 className="w-4 h-4" />
        Redo
      </Button>
    </div>
  );
};

export default SketchUndoRedo;
