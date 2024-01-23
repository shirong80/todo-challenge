import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentCategoryState, toDoState } from "../core/services/atoms";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const currentCategory = useRecoilValue(currentCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    setToDos((prev) => [
      { text: data.toDo, category: currentCategory, id: Date.now() },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">Add</button>
    </form>
  );
}
