import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";
import { useDeleteSketchHistoryMutation } from "@/features/sketch-history/api/delete-history-api";
import { useSketchHistoryQuery } from "@/features/sketch-history/api/get-list.history-api";
import { deleteFileUpload } from "@/features/sketch-history/api/file-upload-api";
import { useEditStateStore } from "@/stores/edit-state.store";
import { useState } from "react";

const DeleteHistory = () => {
  const ids = useHistoryStore((s) => s.ids);
  const clear = useHistoryStore((s) => s.clear);
  const { setEditing } = useEditStateStore();
  const { data } = useSketchHistoryQuery();

  const { mutateAsync, isPending } = useDeleteSketchHistoryMutation({
    onSuccess: () => {
      clear();
      setEditing(false);
    },
  });

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    if (!ids.length) return;
    // Pre-compute image paths associated with selected IDs before deleting records
    const imagesToDelete = (data || [])
      .filter((item) => ids.includes(item.id) && item.image)
      .map((item) => item.image as string);

    await mutateAsync({ ids });

    if (imagesToDelete.length) {
      await Promise.all(
        imagesToDelete.map((path) => deleteFileUpload({ path }))
      );
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        disabled={ids.length === 0 || isPending}
        onClick={() => setConfirmOpen(true)}
        aria-label="Delete selected history"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {`Delete ${ids.length} selected ${
                ids.length === 1 ? "version" : "versions"
              }?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected{" "}
              {ids.length === 1 ? "version" : "versions"} will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-black!"
              onClick={async () => {
                await handleDelete();
                setConfirmOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteHistory;
