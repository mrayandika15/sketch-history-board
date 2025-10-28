import { Card, CardContent } from "@/components/ui/card";
import { cn, formatTime } from "@/lib/utils";

export interface CardHistoryProps {
  id: number | string;
  timestamp: Date;
  thumbnail?: string;
  className?: string;
  onClick?: () => void;
}

const CardHistory = ({
  id,
  timestamp,
  thumbnail,
  className,
  onClick,
}: CardHistoryProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn("w-full cursor-pointer hover:bg-muted", className)}
    >
      <CardContent className="p-2">
        <div className="w-full h-16 bg-muted rounded mb-2 flex items-center justify-center overflow-hidden">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={`Version ${id}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          <div className="w-full text-left">
            <p className="text-xs font-medium text-foreground">Version {id}</p>
            <p className="text-xs text-muted-foreground">
              {formatTime(timestamp)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardHistory;
