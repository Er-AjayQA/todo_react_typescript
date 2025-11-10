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
  task_title: string;
  task_description: string;
  completed: boolean;
  createdAt: Date;
};

export type FormStatus = boolean;
export type TaskDetailsStatus = boolean;

export type TasksContext = {
  tasks: Task[];
  task: Task | null;
  formStatus: FormStatus;
  taskDetailShow: TaskDetailsStatus;
  handleAddTask: (title: string, description: string) => void;
  toggleTaskAsCompleted: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleToggleForm: () => void;
  handleTaskDetailsSection: (task: Task | null) => void;
};

export const tasksContext = createContext<TasksContext | null>(null);

export const TasksProvider = ({ children }: TaskProviderProps) => {
  const getLocalStorageTasks = (): Task[] => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);

      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }
    return [];
  };

  const [task, setTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(getLocalStorageTasks);
  const [formStatus, setFormStatus] = useState<FormStatus>(false);
  const [taskDetailShow, setTaskDetailShow] =
    useState<TaskDetailsStatus>(false);

  // Handle Add New Task
  const handleAddTask = (title: string, description: string) => {
    setTasks((prev) => {
      const newTasks: Task[] = [
        {
          id: Math.random().toString(),
          task_title: title,
          task_description: description,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      return newTasks;
    });
  };

  // Handle Mark Task As Complete
  const toggleTaskAsCompleted = (id: string) => {
    setTasks((prev) => {
      const updatedTasks: Task[] = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  // Handle Delete Existing Task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => {
      const updatedTasks: Task[] = prev.filter((task) => task.id !== id);
      return updatedTasks;
    });
  };

  // Handle Add New Task Form Visibility
  const handleToggleForm = () => {
    setFormStatus((prev) => !prev);
  };

  // Handle Task Description Visibility Section
  const handleTaskDetailsSection = (selectedTask: Task | null) => {
    setTask(selectedTask);
    setTaskDetailShow(!!selectedTask);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <tasksContext.Provider
      value={{
        task,
        tasks,
        handleAddTask,
        toggleTaskAsCompleted,
        handleDeleteTask,
        formStatus,
        taskDetailShow,
        handleToggleForm,
        handleTaskDetailsSection,
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
