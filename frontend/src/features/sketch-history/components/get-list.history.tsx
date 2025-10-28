import CardHistory from "@/components/history/card-history";
import { useEditStateStore } from "@/stores/edit-state.store";
import { useHistoryStore } from "@/features/sketch-history/stores/history.store";
import { Checkbox } from "@/components/ui/checkbox";

interface Version {
  id: number;
  timestamp: Date;
  thumbnail: string;
}

interface HistoryPanelProps {
  versions: Version[];
}

export function GetListHistory({ versions }: HistoryPanelProps) {
  const isEditing = useEditStateStore((s) => s.isEditing);
  const selectedIds = useHistoryStore((s) => s.ids);
  const addId = useHistoryStore((s) => s.addId);
  const removeId = useHistoryStore((s) => s.removeId);

  const handleCheck = (id: number, checked: boolean) => {
    if (checked) addId(id);
    else removeId(id);
  };

  return (
    <>
      {versions.map((v) => (
        <div key={v.id} className="flex items-center gap-2">
          {isEditing && (
            <Checkbox
              checked={selectedIds.includes(v.id)}
              onCheckedChange={(checked) => handleCheck(v.id, !!checked)}
              aria-label={`Select history ${v.id}`}
            />
          )}
          <CardHistory
            id={v.id}
            timestamp={v.timestamp}
            thumbnail={v.thumbnail}
          />
        </div>
      ))}
    </>
  );
}
