import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type TaskProviderProps = {
  children: ReactNode;
};

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type FormStatus = boolean;

export type TasksContext = {
  tasks: Task[];
  formStatus: FormStatus;
  handleAddTask: (task: string) => void;
  toggleTaskAsCompleted: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleToggleForm: () => void;
};

export const tasksContext = createContext<TasksContext | null>(null);

export const TasksProvider = ({ children }: TaskProviderProps) => {
  // Get Tasks from local storage
  const getLocalStorageTasks = () => {
    const storedTasks = localStorage.getItem("tasks");

    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTasks] = useState<Task[]>(getLocalStorageTasks());
  const [formStatus, setFormStatus] = useState<FormStatus>(false);

  // Handle Adding Task
  const handleAddTask = (task: string) => {
    setTasks((prev) => {
      const newTasks: Task[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];

      return newTasks;
    });
  };

  // Handle Complete Task
  const toggleTaskAsCompleted = (id: string) => {
    setTasks((prev) => {
      const updatedTasks: Task[] = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      return updatedTasks;
    });
  };

  // Handle Delete Task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => {
      const updatedTasks: Task[] = prev.filter((task) => task.id !== id);

      return updatedTasks;
    });
  };

  // Handle Form Open
  const handleToggleForm = () => {
    setFormStatus((prev) => !prev);
  };

  // Saving the tasks in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <tasksContext.Provider
      value={{
        tasks,
        handleAddTask,
        toggleTaskAsCompleted,
        handleDeleteTask,
        formStatus,
        handleToggleForm,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
};

// Consumer
export const useTasks = () => {
  const tasksConsumer = useContext(tasksContext);

  if (!tasksConsumer) {
    throw new Error("useTasks used outside the TasksProvider");
  }

  return tasksConsumer;
};
