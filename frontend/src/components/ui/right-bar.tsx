import { Button } from "@/components/ui/button";
import { Clock, Edit } from "lucide-react";
import { useEditStateStore } from "@/stores/edit-state.store";

export function RightBar({
  content,
  footer,
  actions = [],
  title = "",
  icon = <Clock className="w-4 h-4 text-muted-foreground" />,
  desc = "",
}: {
  title?: string;
  icon?: React.ReactNode;
  desc?: string;

  content: React.ReactNode;
  footer: React.ReactNode;
  actions?: React.ReactNode[];
}) {
  const { isEditing, startEditing } = useEditStateStore();

  const EditActions = () => {
    if (isEditing && actions?.length > 0) {
      return actions?.map((action, index) => (
        <p key={`edit-action-${index}`}>{action}</p>
      ));
    }

    return (
      <Button variant="ghost" size="icon" onClick={() => startEditing()}>
        <Edit className="w-4 h-4" />
      </Button>
    );
  };

  return (
    <div className="w-72 border-l border-border bg-card flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-4 py-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <h2 className="font-semibold text-foreground">{title}</h2>
          </div>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
        {actions?.length > 0 && <EditActions />}
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
