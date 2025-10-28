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
import { Clock } from "lucide-react";
import CreateHistory from "@/features/sketch-history/components/create-history";

export function App() {
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
        <ActionBar actions={[<CreateHistory />]} />
      </div>

      <RightBar
        title="History"
        desc="Saved versions"
        icon={<Clock className="w-4 h-4 text-muted-foreground" />}
        actions={[<DeleteHistory />]}
        footer={<GetHistoryMetaData />}
        content={<GetListHistory />}
      />
    </div>
  );
}
