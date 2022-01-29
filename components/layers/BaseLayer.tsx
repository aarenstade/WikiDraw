/* eslint-disable @next/next/no-img-element */
import { VFC } from "react";
import { CANVAS_DIMENSION, DEFAULT_CANVAS_BACKGROUND_COLOR } from "../../config";
import styles from "../../styles/layers.module.css";

interface Props {
  image?: string;
}

const BaseLayer: VFC<Props> = ({ image }) => {
  return (
    <div className={styles.baseLayer}>
      {image ? (
        <img src={image} alt="base-drawing" style={{ zIndex: 1, width: `${CANVAS_DIMENSION}px` }} />
      ) : (
        <div
          style={{
            backgroundColor: DEFAULT_CANVAS_BACKGROUND_COLOR,
            width: `${CANVAS_DIMENSION}px`,
            height: `${CANVAS_DIMENSION}px`,
          }}
        />
      )}
    </div>
  );
};

export default BaseLayer;
