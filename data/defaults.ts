import { BRUSH_SIZES } from "../config";
import { Drawing, DrawingControls } from "../types/drawing";

export const defaultDrawing: Drawing = {
  addition: null,
  topic: null,
  loading: true,
  open: true,
};

export const defaultDrawingParams: DrawingControls = {
  color: "black",
  strokeWeight: BRUSH_SIZES[1],
};
