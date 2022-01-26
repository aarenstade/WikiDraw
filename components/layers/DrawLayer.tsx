import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CANVAS_DIMENSION } from "../../config";
import { DrawContext, DrawHistory, DrawingControlParams } from "../../data/atoms";
import styles from "../../styles/layers.module.css";

const DrawLayer = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [context, setContext] = useRecoilState<CanvasRenderingContext2D | null | undefined>(DrawContext);
  // const [history, setHistory] = useRecoilState(DrawHistory);
  const [localHistory, setLocalHistory] = useState<ImageData[]>([]);
  const [isDrawing, setDrawing] = useState(false);
  const params = useRecoilValue(DrawingControlParams);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.lineWidth = params.strokeWeight;
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = params.color;
      context.lineWidth = params.strokeWeight;
    }
  }, [params]);

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
      setLocalHistory([...localHistory, context.getImageData(0, 0, context.canvas.width, context.canvas.height)]);
    }
  };

  return (
    <div className={styles.drawLayer}>
      <canvas
        id="draw-canvas"
        ref={canvasRef}
        width={CANVAS_DIMENSION}
        height={CANVAS_DIMENSION}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
};

export default DrawLayer;
