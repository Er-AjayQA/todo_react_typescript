import { useState, type FormEvent } from "react";
import { useTasks } from "../store/tasks";

export const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { handleAddTask, formStatus, handleToggleForm } = useTasks();

  const handleFormSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    handleAddTask(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    handleToggleForm();
  };

  const handleCloseForm = () => {
    handleToggleForm();
    setTitle("");
    setDescription("");
  };

  return (
    <div
      className={`${
        formStatus ? "flex" : "hidden"
      } fixed inset-0 z-50 items-center justify-center`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg w-[500px] p-6 shadow-xl z-50 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Task</h2>
          <button
            type="button"
            onClick={handleCloseForm}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            placeholder="Enter task...."
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Task description"
            value={description}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseForm}
            className="py-2 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
