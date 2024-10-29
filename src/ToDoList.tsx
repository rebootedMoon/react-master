import { useState } from "react";
import { useForm } from "react-hook-form";
interface IForm {
  username: string;
  email: string;
  password: string;
  password1: string;
  extraError?: string;
}
function ToDoList() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    console.log(data);
    if (data.password !== data.password1) {
      setError("password1", {
        message: "password가 일치하지 않는다.",
      });
    }
    setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("username", {
            required: true,
            // minLength: {
            //   value: 5,
            //   message:
            //     "Username 의 길이가 너무 짧다. 5글자 이상으로 해줘",
            // },
            validate: (value) =>
              value.includes("nico") ? "nico 포함 안돼" : true,
          })}
          placeholder="Wite username"
        />
        <span>{errors?.username?.message as string}</span>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "naver 주소만 허용됩니다.",
            },
          })}
          placeholder="Wite email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 5,
              message: "5글자 이상 넣어줘요",
            },
          })}
          placeholder="Wite password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: true,
            minLength: {
              value: 5,
              message: "5글자 이상 넣어줘요",
            },
          })}
          placeholder="Wite possword confirm"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;
