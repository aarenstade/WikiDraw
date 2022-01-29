import { convertBase64ToBytes, uploadImage } from "../utils/image-utils";
import { insertNewAddition, mergeNewAddition } from "../upload";
import { useState } from "react";
import { AdditionSubmitFormValues } from "../types/general";
import { AdditionItem } from "../types/mongodb/schemas";
import useAuth from "./useAuth";
import useDrawing from "./useBaseDrawing";
import { getDownloadURL } from "firebase/storage";
import { STORAGE_REF } from "../client/firebase";
import { v4 } from "uuid";

interface SubmitHandlerHook {
  message: string;
  liveImage: string;
  success?: boolean;
  validateSubmission: () => boolean;
  handleSubmission: (data: AdditionSubmitFormValues) => Promise<void>;
}

const useSubmitHandler = (): SubmitHandlerHook => {
  const auth = useAuth();
  const drawing = useDrawing();

  const [message, setMessage] = useState<string>("");
  const [liveImage, setLiveImage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>();

  const validateSubmission = (): boolean => {
    // TODO better validation, check if any drawing was added

    return true;
  };

  const handleSubmission = async (form: AdditionSubmitFormValues) => {
    try {
      if (auth?.firebase?.token) {
        const canvas = document.getElementById("canvas-layer-canvas") as HTMLCanvasElement | null;
        if (canvas) {
          setMessage("Preparing Drawing...");

          const addition = canvas.toDataURL("image/png");
          const additionUrl = await uploadImage(convertBase64ToBytes(addition), `/tmp/${v4()}.jpg`);
          if (!additionUrl) throw new Error("Additions failed to upload...");

          setMessage("Merging Drawing...");
          const merge = await mergeNewAddition(auth.firebase.token, additionUrl, drawing.addition?.url);
          if (!merge?.storagePath) throw new Error("Error merging additions...");

          setMessage("Finalizing...");
          const newBase = await getDownloadURL(STORAGE_REF(merge.storagePath));
          let newAddition: AdditionItem = {
            topic_id: drawing.topic?._id,
            url: newBase,
            name: form.name,
            email: form.email,
            description: form.description,
            address: auth.eth.account || undefined,
            timestamp: new Date(),
          };
          const additionInsert = await insertNewAddition(auth.firebase.token, newAddition, drawing.topic);
          if (!additionInsert._id) throw new Error("Addition failed to insert...");

          setLiveImage(newBase);
          setSuccess(true);
          setMessage("Success!");
        }
      }
    } catch (error) {
      if (typeof error === "string") setMessage(error);
      console.error({ error });
      setSuccess(false);
    }
  };

  return { message, liveImage, success, validateSubmission, handleSubmission };
};

export default useSubmitHandler;
