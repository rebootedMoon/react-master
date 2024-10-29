import { useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import { toDoState } from "./components/atom";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1> ToDos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
