"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const Todos = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputtext] = useState("");

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_URL)
    getData();
  }, []);

  const addTodoHandler = () => {
    const newTodo = {
      id: uuid(),
      todo: inputText,
    };
    axios.post(process.env.NEXT_PUBLIC_URL, newTodo);
  };
  const getData = async () => {
    try {
      const { data: todos } = await axios.get(process.env.NEXT_PUBLIC_URL);
      setTodoList(todos);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(todoList)
  return (
    <div className="flex">
      <h1>Todo List Next 다시 테스트44버전 테스트2</h1>
      <form>
        <input
          type="text"
          placeholder="Enter Todo"
          value={inputText}
          onChange={(e) => setInputtext(e.target.value)}
        ></input>
        <button type="button" onClick={addTodoHandler}>
          Add
        </button>
        <button type="button" onClick={() => setInputtext("")}>
          Clear
        </button>
      </form>
      <div>
        {todoList?.map((todo) => {
          return <p key={todo.id}>{todo.todo}</p>;
        })}
      </div>
    </div>
  );
};

export default Todos;
