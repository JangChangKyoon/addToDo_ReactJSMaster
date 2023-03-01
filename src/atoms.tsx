import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export let defaultCategories: string[] = ["TO_DO", "DOING", "DONE"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: [...defaultCategories],
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  // 아래 default value type을 정해줌
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
