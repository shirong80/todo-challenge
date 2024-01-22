import { atom, selector } from "recoil";
import { IToDo } from "../models/types";

export const currentCategoryState = atom<string>({
  key: "currentCategory",
  default: "TO_DO",
});

export const categoryState = atom<string[]>({
  key: "category",
  default: ["TO_DO", "DOING", "DONE"],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(currentCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
