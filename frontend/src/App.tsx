import { RightBar } from "@/components/ui/right-bar";
import ActionBar from "@/components/sketch/action-bar";
import ToolBar from "@/components/sketch/toolbar";
import Header from "@/components/ui/header";
import DeleteHistory from "@/features/sketch-history/components/delete-history";
import { GetListHistory } from "@/features/sketch-history/components/get-list.history";
import GetHistoryMetaData from "@/features/sketch-history/components/get-meta-history";
import SketchCanvas from "@/features/sketch/components/sketch-canvas";
import SketchClearAction from "@/features/sketch/components/sketch-clear.action";
import SketchEraserAction from "@/features/sketch/components/sketch-eraser-action";
import SketchPenAction from "@/features/sketch/components/sketch-pen-action";
import SketchPenSizeAction from "@/features/sketch/components/sketch-pen-size-action";
import { useState } from "react";
import { Clock } from "lucide-react";

export function App() {
  const [versions, setVersions] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000),
      thumbnail: "/sketch-thumbnail-1.jpg",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1800000),
      thumbnail: "/sketch-thumbnail-2.jpg",
    },
    {
      id: 3,
      timestamp: new Date(),
      thumbnail: "/sketch-thumbnail-3.jpg",
    },
  ]);

  return (
    <div className="flex w-screen h-screen bg-background">
      <div className="flex-1 w-full flex flex-col">
        <Header />
        <ToolBar
          actions={[
            <SketchPenAction />,
            <SketchEraserAction />,
            <SketchClearAction />,
            <SketchPenSizeAction />,
          ]}
        />
        <SketchCanvas />
        <ActionBar />
      </div>

      <RightBar
        title="History"
        desc="Saved versions"
        icon={<Clock className="w-4 h-4 text-muted-foreground" />}
        actions={[<DeleteHistory />]}
        footer={<GetHistoryMetaData />}
        content={<GetListHistory versions={versions} />}
      />
    </div>
  );
}
