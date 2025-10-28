import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const SketchClearAction = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-destructive hover:text-destructive"
    >
      <Trash2 className="w-4 h-4" />
      Clear
    </Button>
  );
};

export default SketchClearAction;
