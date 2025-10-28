import CardHistory from "@/components/history/card-history";
import { useEditStateStore } from "@/stores/edit-state.store";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";
import { Checkbox } from "@/components/ui/checkbox";
import { useSketchHistoryQuery } from "@/features/sketch-history/api/get-list.history-api";

export function GetListHistory() {
  const isEditing = useEditStateStore((s) => s.isEditing);
  const selectedIds = useHistoryStore((s) => s.ids);
  const addId = useHistoryStore((s) => s.addId);
  const removeId = useHistoryStore((s) => s.removeId);

  const { data, isLoading, isError } = useSketchHistoryQuery();

  const handleCheck = (id: number, checked: boolean) => {
    if (checked) addId(id);
    else removeId(id);
  };

  return (
    <>
      {isLoading && <p className="text-xs text-muted-foreground">Loading...</p>}
      {isError && (
        <p className="text-xs text-destructive">Failed to load history.</p>
      )}
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
            id={item.id}
            timestamp={new Date(item.createdAt)}
            thumbnail={undefined}
          />
        </div>
      ))}
    </>
  );
}
