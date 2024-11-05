import { useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import { toDoSelcector, toDoState } from "./components/atom";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const [toDo, doing, done] = useRecoilValue(toDoSelcector);
  return (
    <div>
      <h1> ToDos</h1>
      <hr />
      <CreateToDo />
      <h2> To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2> Doing</h2>
      <ul>
        {doing.map((doing) => (
          <ToDo key={doing.id} {...doing} />
        ))}
      </ul>
      <h2> Done</h2>
      <ul>
        {done.map((done) => (
          <ToDo key={done.id} {...done} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
