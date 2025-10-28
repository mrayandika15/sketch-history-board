import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";
import { useDeleteSketchHistoryMutation } from "@/features/sketch-history/api/delete-history-api";

const DeleteHistory = () => {
  const ids = useHistoryStore((s) => s.ids);
  const clear = useHistoryStore((s) => s.clear);

  const { mutateAsync, isPending } = useDeleteSketchHistoryMutation({
    onSuccess: () => clear(),
  });

  const handleDelete = async () => {
    if (!ids.length) return;
    await mutateAsync({ ids });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={ids.length === 0 || isPending}
      onClick={handleDelete}
      aria-label="Delete selected history"
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  );
};

export default DeleteHistory;
