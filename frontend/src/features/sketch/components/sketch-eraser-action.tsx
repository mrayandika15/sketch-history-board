import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

const SketchEraserAction = () => {
  return (
    <Button variant="ghost" size="sm" className="gap-2">
      <Eraser className="w-4 h-4" />
      Eraser
    </Button>
  );
};

export default SketchEraserAction;
