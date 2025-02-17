import React, { useState, useEffect } from 'react';
import './todolist.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setTodos(data.slice(0, 10));
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  return (
    <div className="todo-container">
      <h1 className="title">Todo List</h1>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>ID</th>
            <th>User-ID</th>
            
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} className={todo.completed ? 'completed' : 'not-completed'}>
              <td className="todo-title">{todo.title}</td>
              <td className={`status ${todo.completed ? 'completed-status' : 'not-completed-status'}`}>
                {todo.completed ? 'Done' : 'Not Done'}
              </td>
              <td className="todo-Id">{todo.id}</td>
              <td className="todo-userId">{todo.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
