import { useState, type FormEvent } from "react";
import { useTasks } from "../store/tasks";

export const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const { handleAddTask } = useTasks();

  const handleFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleAddTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-10 bg-white rounded-lg">
      <input
        type="text"
        value={task}
        placeholder="Enter task...."
        onChange={(e) => setTask(e.target.value)}
        autoFocus={true}
      />

      <textarea name="" id="" />
      <button type="submit">Add Task</button>
    </form>
  );
};
