import { NextPage } from "next";
import MainView from "../views/MainView";
import { HOME_TOPIC_NAME } from "../config";
import useBaseDrawing from "../hooks/useBaseDrawing";

const Home: NextPage = () => {
  const drawing = useBaseDrawing(HOME_TOPIC_NAME);

  return <MainView drawing={drawing} />;
};

export default Home;
