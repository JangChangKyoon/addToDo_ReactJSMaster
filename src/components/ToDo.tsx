import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(event);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {Object.values(categories).map((availableCategory) => (
        <button
          name={availableCategory}
          disabled={availableCategory === category}
          key={availableCategory}
          onClick={onClick}
        >
          {availableCategory}
        </button>
      ))}
    </li>
  );
}

export default ToDo;
