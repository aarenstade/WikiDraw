import { atom, selector } from "recoil";
import { Drawing, DrawingControls } from "../types/drawing";
import { defaultDrawing, defaultDrawingParams } from "./defaults";

export const DrawingState = atom<Drawing>({
  key: "DrawingState",
  default: defaultDrawing,
});

export const DrawingOpenState = selector({
  key: "DrawingOpenState",
  get: ({ get }) => get(DrawingState).open,
});

export const DrawingControlParams = atom<DrawingControls>({
  key: "DrawingControlParams",
  default: defaultDrawingParams,
});

export const DrawHistory = atom<ImageData[]>({
  key: "DrawHistory",
  default: [],
});

export const DrawContext = atom<CanvasRenderingContext2D | null | undefined>({
  key: "DrawContext",
  default: undefined,
});
