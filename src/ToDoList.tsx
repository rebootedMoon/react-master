import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./components/CreateToDo";
import {
  Categories,
  categoryState,
  toDoSelcector,
  toDoState,
} from "./components/atom";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const [toDo, doing, done] = useRecoilValue(toDoSelcector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1> ToDos</h1>

      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
