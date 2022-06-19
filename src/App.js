import './App.css';
import { useState, useEffect } from 'react';

import TaskCreator from './components/TaskCreator';
import TaskTable from './components/TaskTable';
import VisibilityControl from './components/VisibilityControl';
import Container from './components/Container';

function App() {
  const [taskItems, setTaskItems] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)

  const createNewTask = taskName => {
    if (!taskItems.find(task => task.name === taskName || taskName === '')) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  const toggleTask = task => {
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)))
  }

  const cleanTask = () => {
    setTaskItems(taskItems.filter(task => !task.done))
    setShowCompleted(false)
  }

  // Execute what it is in the localstorage firstly
  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data) {
      setTaskItems(JSON.parse(data))
    }
  }, [])

  // Whenever the tasks array changes, the localstorage does too
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  return (
    <div className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask}></TaskCreator>
        <TaskTable tasks={taskItems} toggleTask={toggleTask}></TaskTable>
        <VisibilityControl isChecked={showCompleted} setShowCompleted={checked => setShowCompleted(checked)} cleanTasks={cleanTask} ></VisibilityControl>
        {
          showCompleted === true && (
            <TaskTable tasks={taskItems} toggleTask={toggleTask} showCompleted={showCompleted}></TaskTable>
          )
        }
      </Container>
    </div>

  );
}

export default App;
