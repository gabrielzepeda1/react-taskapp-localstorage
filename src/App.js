import { useState, useEffect } from "react";
import "./App.css";
import TaskCreator from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import VisibilityControl from "./components/VisibilityControl";
import Container from "./components/Container";

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    setTaskItems((prevTaskItems) => {
      if (!prevTaskItems.find((task) => task.name === taskName)) {
        return [...prevTaskItems, { name: taskName, done: false }];
      } else {
        return prevTaskItems;
      }
    });
  }

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <main className="bg-dark vh-100 text-white">
      <div className="container p-4 ">
        <Container>
          <TaskCreator createNewTask={createNewTask} />
          <TaskTable tasks={taskItems} toggleTask={toggleTask} />
          <VisibilityControl
            isChecked={showCompleted}
            setShowCompleted={(checked) => setShowCompleted(checked)}
            cleanTasks={cleanTasks}
          />
          {showCompleted === true && (
            <TaskTable
              tasks={taskItems}
              toggleTask={toggleTask}
              showCompleted={showCompleted}
            />
          )}
        </Container>
      </div>
    </main>
  );
}

export default App;
