import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { DrawingState } from "../data/atoms";
import { fetchAdditions, fetchTopic } from "../services/fetch";
import { Drawing } from "../types/drawing";
import { AdditionItem, TopicItem } from "../types/mongodb/schemas";
import { encodeTopicUrlParam, isTopicOpen } from "../utils/utils";
import useAuth from "./useAuth";

interface useBaseDrawingHook extends Drawing {
  setLoading: (v: boolean) => void;
}

const fetchTopicAndAdditions = async (
  token: string,
  topicString: string,
  page: number = 0,
  limit: number = 1
): Promise<{ topic: TopicItem | null; addition: AdditionItem | null }> => {
  let topic;
  let addition;

  try {
    if (token) {
      const topicRes = await fetchTopic(token, topicString);
      topic = topicRes && topicRes.data;

      const additionRes = await fetchAdditions(token, topic._id, page, limit);
      addition = additionRes && additionRes.data;
    }
  } catch (error) {
    console.error({ error });
  }

  return { topic, addition };
};

const useBaseDrawing = (topicString?: string, page?: number, limit?: number): useBaseDrawingHook => {
  const auth = useAuth();
  const [drawing, setDrawing] = useRecoilState(DrawingState);

  const setLoading = (v: boolean) => setDrawing({ ...drawing, loading: v });

  useEffect(() => {
    if (auth?.firebase?.token && topicString) {
      setDrawing({ ...drawing, loading: true });
      fetchTopicAndAdditions(auth.firebase.token, topicString, page, limit)
        .then((res) => {
          const topic: TopicItem = res.topic
            ? { ...res.topic, topic: topicString }
            : {
                topic: topicString.toLowerCase(),
                slug: encodeTopicUrlParam(topicString),
                created_at: new Date(),
                updated_at: new Date(),
              };
          const { isOpen } = isTopicOpen(res.addition?.timestamp && new Date(res.addition.timestamp).getTime());
          setDrawing({ topic, addition: res.addition, open: isOpen, loading: false });
        })
        .catch((err) => {
          console.log({ err });
          setDrawing({ ...drawing, loading: false });
        });
    }
  }, [auth?.firebase, topicString]);

  return {
    topic: drawing.topic,
    addition: drawing.addition,
    open: drawing.open,
    loading: drawing.loading,
    setLoading,
  };
};

export default useBaseDrawing;
