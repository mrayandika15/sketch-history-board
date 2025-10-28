import { Button } from "@/components/ui/button";
import { useCreateSketchHistoryMutation } from "@/features/sketch-history/api/create-history";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";

const CreateHistory = () => {
  const { canvasRef } = useSketchStore();

  const { mutateAsync, isPending } = useCreateSketchHistoryMutation({});

  const handleSave = async () => {
    const name = `Version ${new Date().toLocaleString()}`;
    const paths = await canvasRef?.exportPaths();

    // if (paths?.length === 0) return toast.error("Canvas not found");

    const getTime = await canvasRef?.getSketchingTime();

    console.log({ paths, canvas: canvasRef, getTime });

    // await mutateAsync({ name, data: paths });
  };

  return (
    <Button onClick={handleSave} disabled={isPending} aria-label="Save version">
      {isPending ? "Saving..." : "Save Version"}
    </Button>
  );
};

export default CreateHistory;
