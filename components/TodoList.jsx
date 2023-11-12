import { useEffect, useState, useId } from "react";
import React from "react";
import checkIcon from "../src/assets/images/icon-check.svg";
import crossIcon from "../src/assets/images/icon-cross.svg";

export default function TodoList(props) {
  let todoList = props.activeTodo || getTodos();
  
  const [todos, setTodos] = useState(todoList);

  // Function to save TODOs to localStorage
  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Function to retrieve TODOs from localStorage
  function getTodos() {
    const todosString = localStorage.getItem("todos");
    let getItems = todosString ? JSON.parse(todosString) : [];
    return getItems;
  }
  const deleteTodo = (key) => {
    const newList = todos.filter(e => e.id !== key.id);
    setTodos(newList);
    saveTodos(newList); // saving in localStorage
  }

  // Toggle the completion status of a TODO
  const toggleCompletion = (key) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === key.id) {
        return { ...todo, completed: !todo.completed }; // Toggle the completed status
      }
      return todo;
    });

    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  }
  // useEffect(() => { setTodos(todoList)}, [])
  useEffect(() => { setTodos(todoList); }, [todoList]);

  return (
    <div className="w-[95%] m-auto rounded-t-md px-4 py-2 bg-white dark:bg-[#25273c] flex flex-col space-y-3  shadow-md">
      {todos.map((e, index) => (
        <div
          className={`flex w-full  border-b py-2 border-neutral-200 slide-in delay-${index+1}00 cursor-pointer`}
          key={index}
        >
          <button className={`w-5 h-5 rounded-full border-2 pl-[2px] ${e.completed? 'bg-gradient-to-r':'' } from-violet-400 to-blue-400 border-neutral-200 m-auto`} onClick={() => toggleCompletion(e)} >
            <img src={e.completed ? checkIcon: ''} alt="" className="cursor-pointer" />
          </button>
          <span onClick={() => toggleCompletion(e)} className={`w-full p-2 outline-none text-[#242868db] dark:text-[#adb0c6] text-sm font-semibold lg:text-base ${e.completed ? 'line-through': ''}`}>
            {e.text}
          </span>
          <button
            onClick={() => deleteTodo(e)}
          >
            <img
              src={crossIcon}
              alt=""
              className="cursor-pointer hover:opacity-50"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
