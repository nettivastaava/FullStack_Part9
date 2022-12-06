import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
  return (
    <p>
      {courseParts.map(part => (
        <p>{part.name} {part.exerciseCount}</p>
      ))}
    </p>
  );
};

export default Content;