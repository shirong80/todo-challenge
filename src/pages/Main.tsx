import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryState,
  currentCategoryState,
  toDoSelector,
} from "../core/services/atoms";

export default function Main() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryState);
  const [currentCategory, setCurrentCategory] =
    useRecoilState(currentCategoryState);
  const onInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={currentCategory} onChange={onInput}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
