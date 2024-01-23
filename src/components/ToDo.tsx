import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo } from "../core/models/types";
import { categoryState, toDoState } from "../core/services/atoms";

export default function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;

    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categoryList
        .filter((categoryItem) => categoryItem !== category)
        .map((categoryItem) => (
          <button key={categoryItem} name={categoryItem} onClick={onClick}>
            {categoryItem}
          </button>
        ))}
    </li>
  );
}
