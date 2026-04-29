import React, { useState, useEffect } from "react";
import "./index.css"; 

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  setList(saved);
}, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

 const addTask = () => {
  if (!task.trim()) return;

  // 👇 duplicate check
  const isDuplicate = list.some(
    (t) => t.text.toLowerCase() === task.toLowerCase()
  );

  if (isDuplicate) return;

  const newTask = { id: Date.now(), text: task };
  setList([...list, newTask]);
  setTask("");
};
  const deleteTask = (id) => {
    setList(list.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h2 className="title">📝 Simple To-Do List</h2>

      <div className="form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()} 
          placeholder="Enter your task..."
          className="input"
        />
        <button onClick={addTask} className="button">
          Add
        </button>
      </div>

      <ul className="list">
        {list.length === 0 && <p>No tasks yet 😄</p>}
        {list.map((item) => (
          <li key={item.id} className="listItem">
            {item.text}
            <button onClick={() => deleteTask(item.id)} className="deleteBtn">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
