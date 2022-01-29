import { useRecoilState } from "recoil";
import { BRUSH_SIZES, COLORS } from "../../config";
import { DrawingControlParams } from "../../data/atoms";
import eventBus from "../../services/eventBus";
import { NormalButton } from "../Buttons";

import styles from "./menu.module.css";

const DrawingControls = () => {
  const [params, setParams] = useRecoilState(DrawingControlParams);

  const scaleBrushSize = (size: number) => {
    if (size === 2) return 20;
    if (size === 8) return 30;
    if (size === 16) return 40;
    if (size === 64) return 50;
    return 40;
  };

  return (
    <div>
      {/* <div className={styles.drawingControlsArea} style={{ left: "60px", borderBottomRightRadius: "20px" }}>
        <NormalButton text="Clear" onClick={handleCanvasUndo} />
      </div> */}
      <div className={styles.drawingControlsArea} style={{ left: 0, borderBottomRightRadius: "20px" }}>
        {COLORS.map((color: string, i: number) => (
          <div
            key={i}
            className={`${styles.drawingColorItem} ${params.color === color && styles.drawingColorItemSelected}`}
            style={{ backgroundColor: color }}
            onClick={() => setParams({ ...params, color: color })}
          />
        ))}
      </div>
      <div className={styles.drawingControlsArea} style={{ right: 0, borderBottomLeftRadius: "20px" }}>
        {BRUSH_SIZES.map((brush: number, i: number) => {
          const size = scaleBrushSize(brush);
          return (
            <div
              key={i}
              className={`${styles.drawingBrushItem} ${
                params.strokeWeight === brush && styles.drawingBrushItemSelected
              }`}
              style={{ width: size, height: size }}
              onClick={() => setParams({ ...params, strokeWeight: brush })}
            >
              {brush}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrawingControls;
