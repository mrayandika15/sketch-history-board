import CardHistory from "@/components/history/card-history";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useSketchHistoryQuery } from "@/features/sketch-history/api/get-list.history-api";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";
import { useEditStateStore } from "@/stores/edit-state.store";
import { useState } from "react";
import type { CanvasPath } from "react-sketch-canvas";

export function GetListHistory() {
  const { ids: selectedIds, addId, removeId } = useHistoryStore();
  const { isEditing } = useEditStateStore();

  const { canvasRef } = useSketchStore();

  const { data, isLoading } = useSketchHistoryQuery();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPaths, setPendingPaths] = useState<CanvasPath[] | null>(null);

  const handleCheck = (id: number, checked: boolean) => {
    if (checked) addId(id);
    else removeId(id);
  };

  const loadCanvasPaths = async (paths: CanvasPath[]) => {
    if (!canvasRef) return null;

    canvasRef?.clearCanvas();

    return canvasRef?.loadPaths(paths);
  };

  return (
    <>
      {isLoading && <Skeleton className="w-full h-12" />}

      {(data || []).map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          {isEditing && (
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onCheckedChange={(checked) => handleCheck(item.id, !!checked)}
              aria-label={`Select history ${item.id}`}
            />
          )}
          <CardHistory
            isEditing={isEditing}
            onClick={() => {
              setPendingPaths(item.data);
              setConfirmOpen(true);
            }}
            id={item.id}
            timestamp={new Date(item.createdAt)}
            thumbnail={undefined}
          />
        </div>
      ))}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace current design?</AlertDialogTitle>
            <AlertDialogDescription>
              Loading this version will replace your current drawing. Do you
              want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <AlertDialogCancel
              onClick={() => {
                setConfirmOpen(false);
                setPendingPaths(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-black!"
              onClick={async () => {
                if (pendingPaths) {
                  await loadCanvasPaths(pendingPaths);
                }
                setConfirmOpen(false);
                setPendingPaths(null);
              }}
            >
              Replace
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
