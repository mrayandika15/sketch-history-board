import { create } from "zustand";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";

type ImageType = "png" | "jpeg";

type SketchState = {
  canvasRef: ReactSketchCanvasRef | null;
  setCanvasRef: (ref: ReactSketchCanvasRef | null) => void;
  strokeColor: string;
  strokeWidth: number;
  eraserWidth: number;
  eraserMode: boolean;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setEraserWidth: (width: number) => void;
  setActiveWidth: (width: number) => void;
  setEraserMode: (on: boolean) => void;
};

export const useSketchStore = create<SketchState>((set, get) => ({
  canvasRef: null,
  setCanvasRef: (ref) =>
    set((state) => (state.canvasRef === ref ? state : { canvasRef: ref })),

  // Defaults for light theme
  strokeColor: "#0f172a", // slate-900
  strokeWidth: 4,
  eraserWidth: 12,
  eraserMode: false,

  setStrokeColor: (color) => set({ strokeColor: color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  setEraserWidth: (width) => set({ eraserWidth: width }),
  setActiveWidth: (width) =>
    set((state) =>
      state.eraserMode ? { eraserWidth: width } : { strokeWidth: width }
    ),
  setEraserMode: (on) => {
    set({ eraserMode: on });
  },
}));
