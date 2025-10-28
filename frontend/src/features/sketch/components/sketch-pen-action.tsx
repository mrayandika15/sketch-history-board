import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

const SketchPenAction = () => {
  return (
    <Button variant="ghost" size="sm" className="gap-2">
      <Pen className="w-4 h-4" />
      Pen
    </Button>
  );
};

export default SketchPenAction;
