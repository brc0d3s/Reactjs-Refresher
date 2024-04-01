import { useState, useRef, useEffect } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([...todos, { no: count, text: inputRef.current.value, display: "" }]);
    setCount(count + 1);
    inputRef.current.value = "";
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const storedCount = parseInt(localStorage.getItem("todos_count")) || 0;
    setTodos(storedTodos || []);
    setCount(storedCount);
  },[])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todos_count", count);
  }, [todos, count])

  return (
    <div className='todo'>
      <div className='todo-header'>TO-DO List</div>
      <div className='todo-add'>
        <input ref={inputRef} type="text" placeholder='Add Your task' className='todo-input' />
        <div onClick={add} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list"></div>
      {todos.map((item, index) => (
        <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
      ))}
    </div>
  )
}

export default Todo;