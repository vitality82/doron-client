import { useState, useEffect } from 'react'
import { TaskAPI } from './apis/task-api'
import { TaskData } from './common/types'
import Task from './components/Task'
import TaskInput from './components/TaskInput'
import './App.css'
import TaskEdit from './components/TaskEdit'


function App() {
  const [task, setTask] = useState<string>("")
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [editMode, setEditMode] = useState<number | null>(null)

  useEffect(() => {
    TaskAPI.getAll().then(data => {
      setTasks(data)
    })
  }, [])

  const addTask = async () => {
    if (task !== "") {
      const newTask = { name: task }
      const response = await TaskAPI.create(newTask)
      const savedTask = await response.json()
      
      setTasks([...tasks, savedTask]); // Update the internal state with the newly created task
      setTask("");
    }
  }

  const editTask = (taskId: number) => {
    setEditMode(taskId)
  }

  const updateTask = async (taskId: number, newName: string) => {
    // update on the server
    const response = await TaskAPI.update(taskId, { name: newName })
    const updatedTask = await response.json()

    // update task in the state
    setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
    setEditMode(null)
  }

  return (
    <>
      <div className='max-w-3xl mx-auto p-10' data-theme="light">
        <h1>My Tasks</h1>
        <div className='mt-10'>
          <TaskInput task={task} setTask={setTask} addTask={addTask} />
          <div className='mt-10'>
              {tasks.map((task: TaskData) => (
                task.id === editMode
                ? <TaskEdit key={task.id} task={task} updateTask={updateTask} />
                : <Task key={task.id} task={task} editTask={() => editTask(task.id)} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
