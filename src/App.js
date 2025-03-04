import React, { useEffect, useState } from 'react';
import './App.css';
import { updateText, useTestDispatch, useTestState } from './context/context'
import { ReactComponent as Trash } from './assets/icons8-trash.svg'
import { ReactComponent as EDIt } from './assets/icons8-edit.svg'
function App() {

  const [newTask, setNewTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingText, setEditingText] = useState("")



  const addNewTask = () => {
    if (newTask === "") return;
    setTaskList([...taskList,
    {
      id: Date.now(),
      text: newTask, completed: false
    }]);
    setNewTask("")
  }
  const taskState = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task)
    )
  }
  const removeTask = (id) => {
    setTaskList(
      taskList?.filter((item) => item.id !== id)
    )

  }
  const saveEditingText = (id) => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, text: editingText } : item)
    )
    setEditingTaskId(null)
  }
  useEffect(() => {
 
    localStorage.setItem("newtask", JSON.stringify(taskList))

  }, [taskList])


  const startEditing = (id, text) => {
    setEditingTaskId(id)
    setEditingText(text)

  }

  useEffect(() => {
    let preTasks = JSON.parse(localStorage.getItem("newtask"))??[]
    if (preTasks) {
      setTaskList(preTasks)
    }

  }, [])

  return (
    <div className="App">
      <h2>لیست انجام کارها</h2>
      <h3>To Do App</h3>
      <input
        type='text'
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button onClick={addNewTask}>افزودن</button>

      <ul>
        {
          taskList?.map((task) => (
            <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              <input type='checkbox' checked={task.completed}
                onChange={() => taskState(task.id)}
              />
              {
                editingTaskId === task.id ? (
                  <>

                    <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                    <button onClick={() => saveEditingText(task.id)}>ذخیره</button>
                  </>
                )
                  :
                  <>
                    {task.text}

                    <Trash style={{ height: "20px", width: "35px", cursor: "pinter" }} onClick={() => removeTask(task.id)} />
                    <EDIt style={{ height: "20px", width: "35px", cursor: "pinter" }} onClick={() => startEditing(task.id, task.text)} />
                  </>
              }
            </li>


          ))}
      </ul>

    </div>
  );
}

export default App;
