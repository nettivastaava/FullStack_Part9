import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
  return (
    <p>
      {courseParts.map(part => (
        <Part part={part} />
      ))}
    </p>
  );
};

export default Content;