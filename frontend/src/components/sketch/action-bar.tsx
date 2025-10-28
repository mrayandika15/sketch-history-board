import { Button } from "@/components/ui/button";
import { Undo2, Redo2, RotateCcw, Save } from "lucide-react";

const ActionBar = () => {
  return (
    <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-card">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Undo2 className="w-4 h-4" />
          Undo
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Redo2 className="w-4 h-4" />
          Redo
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
        <Save className="w-4 h-4" />
        Save as Version
      </Button>
    </div>
  );
};

export default ActionBar;
