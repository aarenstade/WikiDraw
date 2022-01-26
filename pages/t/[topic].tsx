import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import useBaseDrawing from "../../hooks/useBaseDrawing";

import MainView from "../../views/MainView";

const CollagePage: NextPage = () => {
  const router = useRouter();
  const topicString = router.query.topic?.toString();

  const drawing = useBaseDrawing(topicString);

  return <MainView drawing={drawing} />;
};

export default CollagePage;
