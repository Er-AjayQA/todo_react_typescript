import { useTasks, type Task } from "../store/tasks";

export const TasksList = () => {
  const { tasks, toggleTaskAsCompleted, handleDeleteTask } = useTasks();

  let filterTasks = tasks;

  return (
    <ul>
      {filterTasks.map((task: Task) => {
        return (
          <li key={task.id}>
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => toggleTaskAsCompleted(task.id)}
            />
            <label htmlFor={`task-${task.id}`}> {task.task}</label>

            {task.completed && (
              <button type="button" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};
