import bgBannerMobile from "./assets/images/bg-mobile-dark.jpg";
import bgBannerDesktop from "./assets/images/bg-desktop-dark.jpg";
import bgBannerMobileLight from "./assets/images/bg-mobile-light.jpg";
import bgBannerDesktopLight from "./assets/images/bg-desktop-light.jpg";
import sunIcon from "./assets/images/icon-sun.svg";
import moonIcon from "./assets/images/icon-moon.svg";
import TodoList from "../components/TodoList.jsx";
import "./App.css";
import { useEffect, useState} from "react";

function App() {
  const [theme, setTheme] = useState("dark");
  const [newTodo , setNewTodo] = useState('');
  const [activeTodo , setActiveTodo] = useState(getTodos());
  const [activeTab, setActiveTab] = useState('all');

  const darkTheme = () =>{
    if(theme == 'light'){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  }
  const handleClick = (e) => {
    if(newTodo == ''){alert('Please Enter something! to add'); return}
    addTodo(newTodo);
    setNewTodo('')
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };
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

  // Add a new TODO
  function addTodo(todoText) {
    const todos = getTodos();
    const newTodo = { text: todoText, completed: false, id: activeTodo.length + 1 };
    todos.push(newTodo);
    saveTodos(todos);
    setActiveTodo([...todos, newTodo]); // Update state with the new todo
  }
  const clearCompletedTodos = () => {
    const activeTodo = getTodos()
    const activeTodos = activeTodo.filter(todo => !todo.completed);
    saveTodos(activeTodos);
    setActiveTodo([]); // Set the state to a different value
    setActiveTodo(activeTodos); // Set the state back to the actual value
  };

  // filters for ALL, active and completed tasks
  const allTodoList = () => {
    setActiveTab('all');
    const activeTodo = getTodos();
    setActiveTodo(activeTodo); // Set the state back to the actual value
  };
  const activeTodoList = () => {
    setActiveTab('active');
    const activeTodo = getTodos()
    const activeTodos = activeTodo.filter(todo => !todo.completed);
    setActiveTodo([]); // Set the state to a different value
    setActiveTodo(activeTodos); // Set the state back to the actual value
  };
  const completeTodoList = () => {
    setActiveTab('complete');
    const activeTodo = getTodos()
    const activeTodos = activeTodo.filter(todo => todo.completed);
    setActiveTodo([]); // Set the state to a different value
    setActiveTodo(activeTodos); // Set the state back to the actual value
  };
  

  // localStorage.clear()

  useEffect(darkTheme, [theme])
  useEffect(() => {
    // Update todos when the state changes
    setActiveTodo(getTodos());
  }, [newTodo, theme]);

  return (
    <>
      <div className={`bg-[#fafafa] dark:bg-[#161722] w-full transition min-h-[100vh]`}>
        <div className="w-full m-auto">
          <picture>
            <source media="(min-width:650px)" srcSet={theme == 'light'?bgBannerDesktop: bgBannerDesktopLight} />
            <img
              className="bg-cover bg-center w-full"
              alt=""
              src={theme == 'light'?bgBannerMobile:bgBannerMobileLight} // Fallback for browsers that don't support srcSet
            />
          </picture>
        </div>
        <div className="w-[94%] lg:w-[36%] md:w-[50%] m-auto relative top-[-9rem] lg:top-[-13rem] md:top-[-7rem]">
          <div className="flex justify-between p-4 mb-8">
            <h1 className="text-white text-4xl font-semibold tracking-[1.2rem]">
              TODO
            </h1>
            <img
              onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
              src={theme == "dark" ? moonIcon:sunIcon}
              alt=""
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="w-[95%] m-auto px-4 py-2 rounded-md bg-white dark:bg-[#25273c] flex items-center ">
            <button className="w-5 h-5 rounded-full border-2 border-neutral-200 m-auto to-fuchsia-400" onClick={handleClick} ></button>
            <input
              value={newTodo}
              onChange={(e) => {setNewTodo(e.target.value)}}
              className="w-full p-2 outline-none bg-transparent text-[#231b54] dark:text-[#adb0c6] font-semibold"
              type="search"
              name=""
              id=""
              placeholder="Create a new todo..."
              onKeyDown={handleKeyPress}
            />
            <button className="px-2 bg-gradient-to-r from-violet-500 to-blue-400 rounded-md text-white font-semibold active:opacity-75" onClick={handleClick}>+</button>
          </div>
          <div className="w-[95%] m-auto  px-4 py-2 bg-transparent inline-flex"></div>
          <TodoList activeTodo ={activeTodo}/>
          <div className="w-[95%] m-auto bg-white dark:bg-[#25273c] px-4 py-3 flex justify-between text-slate-500 font-semibold  rounded-b-md lg:shadow-md">
            <span className="cursor-pointer hover:brightness-125">{activeTodo.length} items left</span>
            <span className="cursor-pointer hover:brightness-125" onClick={clearCompletedTodos}>Clear complete</span>
          </div>

          <div className="w-[95%] m-auto  px-4 py-2 bg-transparent inline-flex "></div>
          <div className="w-[95%] m-auto  px-4 py-3 rounded-md flex bg-[#fefefe] dark:bg-[#25273c] text-[#adb0c6] justify-around font-semibold lg:shadow-md">
            <span className={` hover:cursor-pointer ${activeTab =='all'?'text-sky-500':''}`} onClick={allTodoList}>All</span>
            <span className={`hover:cursor-pointer ${activeTab =='active'?'text-sky-500':''}`} onClick={activeTodoList}>Active</span>
            <span className={`hover:cursor-pointer ${activeTab =='complete'?'text-sky-500':''}`} onClick={completeTodoList}>Compelete</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
