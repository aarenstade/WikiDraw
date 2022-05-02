import { NextPage } from "next";
import container from "../styles/containers.module.css";

const AboutPage: NextPage = () => {
  return (
    <div className={container.pageContainer}>
      <div className={container.contentContainer}>
        <h3>About WikiDraw</h3>
        <p>
          WikiDraw is a drawing program for open collaborations on drawings of any topic, like Wikipedia, but cooler. 😎
        </p>
        <p>Anyone can explore topics and add drawings. Each topic starts with an empty 1000 x 1000 pixel canvas.</p>
      </div>
      <div style={{ width: "80%", height: "1px", backgroundColor: "black" }} />
      <div className={container.contentContainer}>
        <p>
          Any bugs or feature requests, PR:{" "}
          <a href="https://github.com/aarenstade/WikiDraw">https://github.com/aarenstade/WikiDraw</a>
        </p>
        <p>
          Built by <a href="https://twitter.com/aaren_carlson">Aaren Stade</a>
        </p>
      </div>
    </div>
  );
};
export default AboutPage;
