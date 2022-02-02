import { NextPage } from "next";
import container from "../styles/containers.module.css";

const AboutPage: NextPage = () => {
  return (
    <div className={container.pageContainer}>
      <div className={container.contentContainer}>
        <h3>About WikiDraw</h3>
        <p>
          WikiDraw is a drawing program for open collaborations on drawings of any topic, like Wikipedia, but cooler.
        </p>
        <p>Anyone can explore topics and add drawings. Each topic starts with an empty 1000 x 1000 pixel canvas.</p>
      </div>
      <div className={container.contentContainer}>
        <p>
          Created by <a href="https://twitter.com/AarenStade">Aaren Stade</a>
        </p>
        <p>Built with NextJS and MongoDB</p>
        <p>
          Any bugs or feature requests, email: <a href="aarenstade@gmail.com">aarenstade@gmail.com</a>
        </p>
      </div>
    </div>
  );
};
export default AboutPage;
