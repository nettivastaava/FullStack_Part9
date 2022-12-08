import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case "normal":
      break;
    case "groupProject":
      break;
    case "submission":
      break;
    case "special":
      break;
    default:
      return assertNever(part);
  }

   return (
    <p>{part.name} {part.exerciseCount}</p>
   );
};

export default Part;