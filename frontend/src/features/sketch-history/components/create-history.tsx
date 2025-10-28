import { Button } from "@/components/ui/button";
import { useCreateSketchHistoryMutation } from "@/features/sketch-history/api/create-history-api";
import { uploadFile } from "@/features/sketch-history/api/file-upload-api";
import { useSketchStore } from "@/features/sketch/stores/sketch.store";
import { toast } from "sonner";

const CreateHistory = () => {
  const { canvasRef, image } = useSketchStore();

  const { mutateAsync, isPending } = useCreateSketchHistoryMutation({});

  const handleSave = async () => {
    const name = `Version ${new Date().toLocaleString()}`;
    const paths = (await canvasRef?.exportPaths()) || [];

    if (paths?.length === 0) return toast.error("Canvas not found");

    if (!canvasRef) return toast.error("Canvas not found");

    // If we have a base64 data URL image in the store, upload it first
    let imagePath: string | undefined;
    if (image && image.startsWith("data:")) {
      try {
        const res = await fetch(image);
        const blob = await res.blob();
        const mime =
          image.match(/^data:(.*?);base64,/)?.[1] || blob.type || "image/png";
        const ext =
          mime === "image/png"
            ? "png"
            : mime === "image/jpeg"
            ? "jpeg"
            : mime === "image/jpg"
            ? "jpg"
            : mime === "image/svg+xml"
            ? "svg"
            : mime === "image/webp"
            ? "webp"
            : mime === "image/gif"
            ? "gif"
            : "bin";
        const filename = `sketch-${Date.now()}.${ext}`;
        imagePath = await uploadFile({ file: blob, filename });
      } catch (e) {
        console.warn("Image upload failed", e);
      }
    }

    return await mutateAsync({ name, data: paths, image: imagePath });
  };

  return (
    <Button onClick={handleSave} disabled={isPending} aria-label="Save version">
      {isPending ? "Saving..." : "Save Version"}
    </Button>
  );
};

export default CreateHistory;
