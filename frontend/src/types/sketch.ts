import type { CanvasPath } from "react-sketch-canvas";

export type SketchJSON = CanvasPath[]; // react-sketch-canvas export JSON shape

export interface SketchHistory {
  id: number;
  name: string;
  data: SketchJSON;
  createdAt: string; // ISO string from backend
  updatedAt: string; // ISO string from backend
}

export type SketchHistoryListResponse = SketchHistory[];
