import ActionBar from "@/components/sketch/action-bar";
import ToolBar from "@/components/sketch/toolbar";
import Header from "@/components/ui/header";
import { GetListHistory } from "@/features/sketch-history/components/get-list.history";
import SketchCanvas from "@/features/sketch/components/sketch-canvas";
import SketchClearAction from "@/features/sketch/components/sketch-clear.action";
import SketchEraserAction from "@/features/sketch/components/sketch-eraser-action";
import SketchPenAction from "@/features/sketch/components/sketch-pen-action";
import { useState } from "react";

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
          ]}
        />
        <SketchCanvas />
        <ActionBar />
      </div>

      <GetListHistory versions={versions} />
    </div>
  );
}
