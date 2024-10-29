import { IToDo } from "./atom";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>

      <button>Done</button>
      <button>Done</button>
      <button>Doing</button>
    </li>
  );
}
export default ToDo;
