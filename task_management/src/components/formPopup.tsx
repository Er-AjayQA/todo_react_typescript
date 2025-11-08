import { AddTaskForm } from "./addTaskForm";

export const FormPopup = () => {
  return (
    <div className="absolute top-0 start-0 end-0 bottom-0 w-full h-full bg-[#0000002c] flex justify-center items-center">
      <AddTaskForm />
    </div>
  );
};
