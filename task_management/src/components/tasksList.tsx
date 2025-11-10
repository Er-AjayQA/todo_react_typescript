import { useTasks, type Task } from "../store/tasks";

export const TasksList = () => {
  const {
    tasks,
    toggleTaskAsCompleted,
    handleDeleteTask,
    handleTaskDetailsSection,
  } = useTasks();

  let filterTasks = tasks;

  return (
    <ul className="space-y-3 overflow-y-auto">
      {filterTasks.map((task: Task) => {
        return (
          <li
            key={task.id}
            className="w-full flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50"
          >
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => toggleTaskAsCompleted(task.id)}
              className="w-5 h-5"
            />

            <label
              htmlFor={`task-${task.id}`}
              className={`flex-1 ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.task_title}
            </label>

            <button
              onClick={() => handleTaskDetailsSection(task)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              View
            </button>

            {task.completed && (
              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};
