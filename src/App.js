import { useState, useEffect } from "react";
import "./App.css";
import TaskCreator from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";

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
    <div className="App">
      <TaskCreator createNewTask={createNewTask} />
      <TaskTable tasks={taskItems} toggleTask={toggleTask} />
      <div>
        <input
          type="checkbox"
          onChange={(e) => setShowCompleted(!showCompleted)}
        />{" "}
        <label>Show Tasks Done</label>
      </div>

      {showCompleted === true && (
        <TaskTable
          tasks={taskItems}
          toggleTask={toggleTask}
          showCompleted={showCompleted}
        />
      )}
    </div>
  );
}

export default App;
