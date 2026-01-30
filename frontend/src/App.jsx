import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch todos on load
  useEffect(() => {
    async function loadTodos() {
      try {
        setIsLoading(true);
        const result = await getTodos();
        setTodos(result.data);
      } catch (error) {
        console.error("Failed to load todos", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  // Add a new todo
  async function handleAddTodo(e) {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const result = await createTodo(newTodoText);
      setTodos([...todos, result.data]);
      setNewTodoText("");
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  }

  // Start editing a todo
  function handleStartEdit(todo) {
    setEditingId(todo._id);
    setEditText(todo.todoText);
  }

  // Save edited todo
  async function handleSaveEdit(todo) {
    if (!editText.trim()) return;

    try {
      await updateTodo(todo._id, editText, todo.completed);
      setTodos(
        todos.map((t) =>
          t._id === todo._id ? { ...t, todoText: editText } : t
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingId(null);
  }

  // Toggle completion status
  async function handleToggleComplete(todo) {
    try {
      await updateTodo(todo._id, todo.todoText, !todo.completed);
      setTodos(
        todos.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  }

  // Delete a todo
  async function handleDeleteTodo(id) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-grow px-3 py-2 border rounded-l focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            Add
          </button>
        </div>
      </form>

      {/* Todo List */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet</p>
      ) : (
        <ul className="divide-y">
          {todos.map((todo) => (
            <li key={todo._id} className="py-3">
              {editingId === todo._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-3 py-1 border rounded mr-2 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(todo)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-1 text-sm hover:bg-green-600">
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-2 py-1 rounded text-sm hover:bg-gray-600">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo)}
                      className="mr-2"
                    />
                    <span
                      className={
                        todo.completed ? "line-through text-gray-500" : ""
                      }>
                      {todo.todoText}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleStartEdit(todo)}
                      className="text-blue-500 hover:text-blue-700 mr-3">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
