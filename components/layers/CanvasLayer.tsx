import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CANVAS_DIMENSION } from "../../config";
import { DrawContext, DrawingControlParams } from "../../data/atoms";
import eventBus from "../../services/eventBus";
import styles from "../../styles/layers.module.css";
import { NormalButton } from "../Buttons";

const CanvasLayer = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [context, setContext] = useRecoilState<CanvasRenderingContext2D | null | undefined>(DrawContext);

  const incrementSize = 10;
  const [localHistory, setLocalHistory] = useState<ImageData[]>([]);
  const params = useRecoilValue(DrawingControlParams);
  const [isDrawing, setDrawing] = useState(false);
  const [counter, setCounter] = useState(0);

  // initialize context
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.lineWidth = params.strokeWeight;
      setContext(ctx);
    }
  }, []);

  // change medium params
  useEffect(() => {
    if (context) {
      context.strokeStyle = params.color;
      context.lineWidth = params.strokeWeight;
    }
  }, [params]);

  // useEffect(() => {
  //   if (!undoable) setTimeout(() => setUndoable(true), 500);
  // }, [undoable]);

  // useEffect(() => {
  //   let undoable = true;
  //   eventBus.on("canvas-events", (e: any) => {
  //     if (e === "undo" && undoable) {
  //       handleUndo();
  //       undoable = false;
  //     }
  //   });
  //   return () => eventBus.remove("canvas-events", () => null);
  // });

  const handleUndo = () => {
    if (context && localHistory.length > 0) {
      try {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        const newHistory = [...localHistory];
        newHistory.splice(newHistory.length - 1, 1);
        setLocalHistory(newHistory);

        context.putImageData(newHistory[newHistory.length - 1], 0, 0);
      } catch (error) {
        console.log("Unable to undo...");
      }
    }
  };

  const computeMouseXY = (clientX: number, clientY: number) => {
    const { scrollX, scrollY } = window;
    let x = clientX + scrollX;
    let y = clientY + scrollY;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) x = x - rect.left;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (context) {
      setDrawing(true);
      // setCounter(0);

      const { x, y } = computeMouseXY(e.clientX, e.clientY);
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (context) {
      context.closePath();
      setDrawing(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (context && isDrawing) {
      const { x, y } = computeMouseXY(e.clientX, e.clientY);
      context.lineTo(x, y);
      context.stroke();

      setCounter(counter + 1);
      if (counter % incrementSize === 0) {
        const { width, height } = context.canvas;
        setLocalHistory([...localHistory, context.getImageData(0, 0, width, height)]);
      }
    }
  };

  return (
    <div className={styles.canvasLayer}>
      <div style={{ position: "fixed", top: "calc(var(--navbar-offset) + 8px)", left: "70px", zIndex: 10 }}>
        <NormalButton text="Undo" onClick={handleUndo} />
      </div>
      <canvas
        id="canvas-layer-canvas"
        ref={canvasRef}
        width={CANVAS_DIMENSION}
        height={CANVAS_DIMENSION}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ zIndex: 2 }}
      />
    </div>
  );
};

export default CanvasLayer;
