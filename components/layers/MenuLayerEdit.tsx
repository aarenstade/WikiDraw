import React, { useEffect, useMemo, useState } from "react";
import styles from "../../styles/layers.module.css";
import SubmitControlArea from "../menu/SubmitControlArea";
import useBaseDrawing from "../../hooks/useBaseDrawing";
import useSubmitHandler from "../../hooks/useSubmitHandler";
import SubmissionFormPopup from "../popups/SubmissionFormPopup";
import SubmissionStatusPopup from "../popups/SubmissionStatusPopup";
import HelpButton from "../menu/HelpButton";
import { AdditionSubmitFormValues } from "../../types/general";
import useDrawing from "../../hooks/useDrawing";
import DrawingControls from "../menu/DrawingControls";

const MenuLayerEdit = () => {
  const baseDrawing = useBaseDrawing();
  const submit = useSubmitHandler();

  const drawing = useDrawing();

  const [submitReady, setSubmitReady] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [formValues, setFormValues] = useState<AdditionSubmitFormValues>({ name: "" });

  // TODO implement undo features

  // useEffect(() => {
  //   let undoready = true;
  //   document.addEventListener(
  //     "keydown",
  //     (e) => {
  //       if ((e.metaKey || e.ctrlKey) && e.key === "z" && undoready && drawing.history.length > 0) {
  //         drawing.undo();
  //         undoready = false;
  //         setTimeout(() => (undoready = true), 200);
  //       }
  //     },
  //     { passive: true }
  //   );
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit.handleSubmission(formValues);
  };

  if (submitReady && !processing) {
    return (
      <SubmissionFormPopup
        values={formValues}
        setFormValues={(v) => setFormValues(v)}
        onClose={() => setSubmitReady(false)}
        onSubmit={(e) => {
          setProcessing(true);
          handleSubmit(e);
        }}
      />
    );
  }

  if (submitReady && processing) {
    return (
      <SubmissionStatusPopup
        status={{
          processing,
          ready: submitReady,
          image: submit.liveImage,
          message: submit.message,
          success: submit.success,
        }}
        topic={baseDrawing.topic?.topic}
      />
    );
  }

  return (
    <div className={styles.menuLayer}>
      <DrawingControls />
      <SubmitControlArea
        timestamp={baseDrawing.addition?.timestamp}
        onClick={() => {
          const validation = submit.validateSubmission();
          setSubmitReady(validation);
        }}
      />
      <HelpButton />
    </div>
  );
};

export default MenuLayerEdit;
