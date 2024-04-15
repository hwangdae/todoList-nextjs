"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const Todos = () => {
  const [todoList,setTodoList] = useState([])
  const [inputText, setInputtext] = useState("");

  const addTodoHandler = () => {
    const newTodo = {
      id: uuid(),
      todo: inputText,
    };
    axios.post("http://localhost:4000/todoList", newTodo);
  };
  const getData = async() => {
    const {data : todoList} = await axios.get("http://localhost:4000/todoList");
    setTodoList(todoList)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex">
      <h1>Todo List Next</h1>
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
        {todoList?.map((todo)=>{
          return (<p>
            {todo.todo}
          </p>)
        })}
      </div>
    </div>
  );
};

export default Todos;
