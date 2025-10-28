import { Clock } from "lucide-react";

export function HistoryBarSide({
  content,
  footer,
}: {
  content: React.ReactNode;
  footer: React.ReactNode;
}) {
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
        {content}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3">{footer}</div>
    </div>
  );
}
