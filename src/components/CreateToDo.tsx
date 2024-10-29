import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atom";
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const handleValid = ({ toDo }: IForm) => {
    console.log(toDo);
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write to do" })}
        placeholder="Write user name"
      />
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
