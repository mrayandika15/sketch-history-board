import CardHistory from "@/components/history/card-history";

interface Version {
  id: number;
  timestamp: Date;
  thumbnail: string;
}

interface HistoryPanelProps {
  versions: Version[];
}

export function GetListHistory({ versions }: HistoryPanelProps) {
  return (
    <>
      {versions.map((v) => (
        <CardHistory
          key={v.id}
          id={v.id}
          timestamp={v.timestamp}
          thumbnail={v.thumbnail}
        />
      ))}
    </>
  );
}
