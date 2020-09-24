import React from "react";

const Todo = ({ todo, toggleTodo, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-toggle" onClick={() => toggleTodo(todo)}>
        {todo.done && <span>✓</span>}
      </div>
      <div className={todo.done ? "todo-title -done" : "todo-title"}>
        {todo.title}
      </div>
      <div className="remove-todo" onClick={() => onDelete(todo)}>
        ✗
      </div>
    </div>
  );
};

export default Todo;
