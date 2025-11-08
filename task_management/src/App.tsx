import "./App.css";
import { AddTodoForm } from "./components/addTodoForm";

function App() {
  return (
    <>
      <main>
        <h1 className="text-2xl">ToDo (React+Typescript)</h1>
        <AddTodoForm />
      </main>
    </>
  );
}

export default App;
