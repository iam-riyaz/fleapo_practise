import { useState } from "react";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = () => {
    setTodoList([...todoList, { title: todoText }]);
    console.log({ todoList });
  };

  const handleDelete = (index) => {
    let arr = [];
    for (let i = 0; i < todoList.length; i++) {
      if (index !== i) {
        arr.push(todoList[i]);
      }
    }
    setTodoList(arr)
  };

  return (
    <>
      <input
        type="text"
        placeholder="Add Todo"
        style={{ height: "50px", fontSize: "30px" }}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todoList.map((e, i) => {
          return (
            <li key={i + 1}>
              {e.title} <button onClick={() => handleDelete(i)}>delete</button>{" "}
            </li>
          );
        })}
      </ul>
    </>
  );
};
