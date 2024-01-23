import { useRecoilState } from "recoil";
import { categoryState } from "../core/services/atoms";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

export default function CreateCategory() {
  const [categoryList, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    // check duplicate
    if (categoryList.includes(category)) {
      alert("이미 존재하는 카테고리입니다.");
      return;
    }
    setCategory((prev) => [category, ...prev]);
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", { required: "Please write a category" })}
        placeholder="카테고리를 입력하세요"
      />
      <button type="submit">Add</button>
    </form>
  );
}
