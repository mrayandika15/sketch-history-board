import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Version {
  id: number;
  timestamp: Date;
  thumbnail: string;
}

interface HistoryPanelProps {
  versions: Version[];
}

export function GetListHistory({ versions }: HistoryPanelProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="w-64 border-l border-border bg-card flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">History</h2>
        </div>
        <p className="text-xs text-muted-foreground">Saved versions</p>
      </div>

      {/* Versions List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {versions.map((version) => (
          <Button
            key={version.id}
            variant="ghost"
            className="w-full h-auto flex flex-col items-start p-2 hover:bg-muted"
          >
            <div className="w-full h-16 bg-muted rounded mb-2 flex items-center justify-center overflow-hidden">
              <img
                src={version.thumbnail || "/placeholder.svg"}
                alt={`Version ${version.id}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full text-left">
              <p className="text-xs font-medium text-foreground">
                Version {version.id}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTime(version.timestamp)}
              </p>
            </div>
          </Button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3">
        <p className="text-xs text-muted-foreground text-center">
          {versions.length} version{versions.length !== 1 ? "s" : ""} saved
        </p>
      </div>
    </div>
  );
}
