import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atom";
import { useState } from "react";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(
        (toDo) => toDo.id === id
      );
      console.log(targetIndex);
      const oldTodos = oldToDos[targetIndex];
      const newTodo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>

      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
    </li>
  );
}
export default ToDo;
