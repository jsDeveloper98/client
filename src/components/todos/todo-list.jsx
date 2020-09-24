import React from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { useHttp } from "../../hooks/http";
import Todo from "./todo.item";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [filterParam, setFilterParam] = useState("all");

  const createTodo = async (e) => {
    if (e.key === "Enter") {
      try {
        const { todo } = await request(
          "/api/todo/create",
          "POST",
          { title },
          {
            authorization: `Bearer ${token}`,
          }
        );

        setTodos([...todos, todo]);
        setTitle("");
      } catch (e) {}
    }
  };

  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request("/api/todo", "GET", null, {
        authorization: `Bearer ${token}`,
      });

      setTodos(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const toggleTodo = async (todo) => {
    try {
      await request(
        "/api/todo/update",
        "POST",
        { done: !todo.done, id: todo._id },
        {
          authorization: `Bearer ${token}`,
        }
      );

      const newTodos = [...todos];
      const changedTodo = todos.find((i) => i._id === todo._id);
      const index = newTodos.indexOf(changedTodo);

      todo.done = !todo.done;
      newTodos.splice(index, 1, todo);

      setTodos(newTodos);
    } catch (e) {}
  };

  const removeTodo = async (todo) => {
    try {
      await request(
        "/api/todo/remove",
        "POST",
        { id: todo._id },
        {
          authorization: `Bearer ${token}`,
        }
      );

      const newTodos = [...todos];

      const indexOfRemovedTodo = newTodos.indexOf(
        newTodos.find((i) => i._id === todo._id)
      );

      newTodos.splice(indexOfRemovedTodo, 1);

      setTodos(newTodos);
    } catch (e) {}
  };

  const filteredTodos = () => {
    return todos.filter((todo) => {
      if (filterParam === "active") {
        return !todo.done;
      } else if (filterParam === "completed") {
        return todo.done;
      }
      return todos;
    });
  };

  return (
    <div className="container">
      <div className="todo-form">
        <h1 className="todo-header">todos</h1>
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={createTodo}
        />

        <div className="todo-list">
          {filteredTodos().map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              toggleTodo={toggleTodo}
              onDelete={removeTodo}
            />
          ))}
        </div>

        <div className="todo-filters">
          <div
            className={
              filterParam === "all" ? "filter-btn -active" : "filter-btn"
            }
            onClick={() => setFilterParam("all")}
          >
            All
          </div>
          <div
            className={
              filterParam === "active" ? "filter-btn -active" : "filter-btn"
            }
            onClick={() => setFilterParam("active")}
          >
            Active
          </div>
          <div
            className={
              filterParam === "completed" ? "filter-btn -active" : "filter-btn"
            }
            onClick={() => setFilterParam("completed")}
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
