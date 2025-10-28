import CardHistory from "@/components/history/card-history";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useSketchHistoryQuery } from "@/features/sketch-history/api/get-list.history-api";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";
import { useEditStateStore } from "@/stores/edit-state.store";
import type { CanvasPath } from "react-sketch-canvas";

export function GetListHistory() {
  const { ids: selectedIds, addId, removeId } = useHistoryStore();
  const { isEditing } = useEditStateStore();

  const { canvasRef } = useSketchStore();

  const { data, isLoading } = useSketchHistoryQuery();

  const handleCheck = (id: number, checked: boolean) => {
    if (checked) addId(id);
    else removeId(id);
  };

  const loadCanvasPaths = (paths: CanvasPath[]) => {
    if (!canvasRef) return null;

    return canvasRef.loadPaths(paths);
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
            onClick={() => loadCanvasPaths(item.data)}
            id={item.id}
            timestamp={new Date(item.createdAt)}
            thumbnail={undefined}
          />
        </div>
      ))}
    </>
  );
}
