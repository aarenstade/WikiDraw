import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DrawContext, DrawHistory } from "../data/atoms";

interface UseDrawingHook {
  history: ImageData[];
  setHistory: (data: ImageData[]) => void;
  context?: CanvasRenderingContext2D | null | undefined;
  undo: () => void;
}

const useDrawing = (): UseDrawingHook => {
  const [history, setHistory] = useRecoilState(DrawHistory);
  const context = useRecoilValue(DrawContext);

  const undo = () => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      const size = 25;
      let newHistory = [...history];
      console.log(`old history length: ${newHistory.length}`);
      newHistory.splice(history.length - size + 1, size);
      console.log(`new history length: ${newHistory.length}`);

      setHistory(newHistory);

      if (newHistory.length >= 1) context.putImageData(newHistory[newHistory.length - 1], 0, 0);
      setHistory(newHistory);
    }
  };

  return { history, setHistory, context, undo };
};

export default useDrawing;
