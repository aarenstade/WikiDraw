import { CALL_CLOUD_FUNCTION } from "./client/firebase";
import { authPostRequest } from "./client/requests";
import { BASE_URL } from "./config";
import { AdditionItem, TopicItem } from "./types/mongodb/schemas";

// export const mergeNewAddition = async (
//   additionUrl: string,
//   baseUrl?: string
// ): Promise<{ id: string; storagePath: string } | undefined> => {
//   const res = await CALL_CLOUD_FUNCTION("mergeAddition", { additionUrl, baseUrl }, { timeout: 120 * 1000 });
//   if (res.data.success) {
//     const { id, storagePath } = res.data;
//     return { id, storagePath };
//   }
// };

export const mergeNewAddition = async (
  token: string,
  additionUrl: string,
  baseUrl?: string
): Promise<{ storagePath: string } | undefined> => {
  try {
    const res = await authPostRequest(token, `${BASE_URL}/api/merge-addition`, { additionUrl, baseUrl });
    if (res.data) return { storagePath: res.data };
  } catch (error) {
    console.error({ error });
  }
};

export const insertNewAddition = async (token: string, addition: AdditionItem, topic: TopicItem | null) => {
  try {
    const response = await authPostRequest(token, `${BASE_URL}/api/db/additions`, { addition, topic });
    if (response && response.data) return response.data;
  } catch (error) {
    console.error({ error });
  }
};
