import { useTasks } from "../store/tasks";

export const TasksDetail = () => {
  const { task, handleTaskDetailsSection } = useTasks();

  if (!task) {
    return (
      <div className="flex flex-col gap-5 border p-5 rounded shadow-lg h-[80%]">
        <div>No task selected</div>
        <button
          onClick={() => handleTaskDetailsSection(null)}
          className="bg-blue-900 py-2 px-8 rounded-lg text-white font-medium hover:bg-blue-800"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 border p-5 rounded shadow-lg h-[80%]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{task.task_title}</h1>
        <button
          onClick={() => handleTaskDetailsSection(null)}
          className="bg-blue-900 py-2 px-8 rounded-lg text-white font-medium hover:bg-blue-800"
        >
          Back to Tasks
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Description:</h3>
        <p className="text-gray-700">{task.task_description}</p>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Created: {task.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
};
