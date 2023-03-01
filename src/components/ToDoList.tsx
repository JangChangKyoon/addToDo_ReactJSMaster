import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoriesState,
  categoryState,
  toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onInput = (category: string) => {
    setCategory(category);
  };

  const addCategory = () => {
    const newCategory = prompt("새로운 카테고리의 이름이 무엇인가요?", "");

    if (newCategory) {
      if (categories.includes(newCategory)) {
        alert("같은 이름의 카테고리가 이미 있어서 추가할 수 없습니다.");
        return;
      }

      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <div>
        {categories.map((availableCategory) => (
          <div key={availableCategory}>
            <button
              onClick={() => onInput(availableCategory)}
              disabled={availableCategory === category}
            >
              {availableCategory}
            </button>
          </div>
        ))}
        <div>
          <button onClick={addCategory}>카테고리 추가</button>
        </div>
      </div>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
