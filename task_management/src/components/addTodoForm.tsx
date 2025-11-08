import { useState, type FormEvent } from "react";
import { useTodos } from "../store/todos";

export const AddTodoForm = () => {
  const [task, setTask] = useState("");
  const { handleAddTodo } = useTodos();

  const handleFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleAddTodo(task);
    setTask("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={task}
        placeholder="Enter task...."
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
