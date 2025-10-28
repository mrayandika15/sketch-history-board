import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";

const DeleteHistory = () => {
  const count = useHistoryStore((s) => s.ids.length);

  return (
    <Button variant="destructive" size="icon" disabled={count === 0}>
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  );
};

export default DeleteHistory;
