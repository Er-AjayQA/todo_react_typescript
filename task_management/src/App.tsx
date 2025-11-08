import "./App.css";
import { FormPopup } from "./components/formPopup";
import { TasksList } from "./components/tasksList";
import { useTasks } from "./store/tasks";

function App() {
  const { formStatus, handleToggleForm } = useTasks();

  return (
    <>
      <main className="relative">
        <div className="w-[1200px] h-screen mx-auto">
          <div className="p-10 flex items-center justify-center">
            <h1 className="text-2xl">ToDo (React+Typescript)</h1>
          </div>

          <div className="flex flex-col gap-5 border p-5 rounded shadow-lg h-[80%]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tasks Listing</h3>
              <button
                onClick={handleToggleForm}
                className="bg-blue-900 py-2 px-8 rounded-lg text-white font-medium"
              >
                Create New Task
              </button>
            </div>

            <TasksList />
          </div>
        </div>
      </main>
      {formStatus && <FormPopup />}
    </>
  );
}

export default App;
