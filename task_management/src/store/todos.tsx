import { createContext, useContext, useState, type ReactNode } from "react";

export type TodoProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  tasks: Todo[];
  handleAddTodo: (task: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodoProviderProps) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const handleAddTodo = (task: string) => {
    setTasks((prev) => {
      const newTasks: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
      ];

      return newTasks;
    });
  };

  return (
    <todosContext.Provider value={{ tasks, handleAddTodo }}>
      {children}
    </todosContext.Provider>
  );
};

// Consumer
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);

  if (!todosConsumer) {
    throw new Error("useTodos used outside the TodosProvider");
  }

  return todosConsumer;
};
