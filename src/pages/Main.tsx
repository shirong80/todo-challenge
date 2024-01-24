import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryState,
  currentCategoryState,
  toDoSelector,
} from "../core/services/atoms";
import CreateCategory from "../components/CreateCategory";
import CreateToDo from "../components/CreateToDo";
import ToDo from "../components/ToDo";
import { useEffect } from "react";

export default function Main() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [currentCategory, setCurrentCategory] =
    useRecoilState(currentCategoryState);
  const onInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.currentTarget.value as any);
  };

  useEffect(() => {
    if (category.length === 0) {
      setCategory(["TO_DO", "DOING", "DONE"]);
    }
  }, [category, setCategory]);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={currentCategory} onChange={onInput}>
        {category.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <CreateCategory />
      <hr />
      <CreateToDo />
      <hr />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
