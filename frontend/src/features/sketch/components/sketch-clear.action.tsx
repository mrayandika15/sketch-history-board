import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";

const SketchClearAction = () => {
  const clear = useSketchStore((s) => s.clear);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-destructive hover:text-destructive"
      onClick={() => clear()}
    >
      <Trash2 className="w-4 h-4" />
      Clear
    </Button>
  );
};

export default SketchClearAction;
