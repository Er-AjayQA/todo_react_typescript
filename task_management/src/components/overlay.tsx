import { useTasks } from "../store/tasks";

export const Overlay = () => {
  const { handleToggleForm } = useTasks();

  return (
    <div
      onClick={handleToggleForm}
      className="fixed top-0 left-0 w-full h-full bg-[#00000080] z-40"
    ></div>
  );
};
