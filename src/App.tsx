import { useState, useEffect } from 'react'
import { TaskAPI } from './apis/task-api'
import { TaskData } from './common/types'
import Task from './components/Task'
import TaskInput from './components/TaskInput'
import TaskEdit from './components/TaskEdit'
import './App.css'


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

  const updateTask = async (taskId: number, name: string) => {
    // update on the server
    const response = await TaskAPI.updateName(taskId, name)
    const updatedTask = await response.json()

    // update in the state
    setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
    setEditMode(null)
  }

  const onCompletionChange = async (taskId: number, is_completed: boolean) => {
    const response = await TaskAPI.updateDateCompleted(taskId, is_completed)
    const updatedTask = await response.json()

    setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
    setEditMode(null)
  }

  const deleteTask = async(taskId: number) => {
    const response = await TaskAPI.delete(taskId)
    const jsonResponse = await response.json()

    // setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    setTasks(tasks.filter(task => task.id !== taskId))
    setEditMode(null)
  }

  const cancelEditMode = () => {
    setEditMode(null)
  }

  // Sort the tasks with completed tasks at the bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  });

  return (
    <>
      <div className='max-w-3xl mx-auto h-screen p-10 bg-white shadow-lg' data-theme="light">
        <h1 className='font-bold text-center'>Make it so</h1>
        <div className='mt-10'>
          <TaskInput task={task} setTask={setTask} addTask={addTask} />
          <div className='mt-10'>
              {sortedTasks.map((task: TaskData) => (
                task.id === editMode
                ? <TaskEdit key={task.id} task={task} updateTask={updateTask} cancelEditMode={cancelEditMode} />
                : <Task key={task.id} task={task} editTask={() => editTask(task.id)} onCompletionChange={onCompletionChange} deleteTask={deleteTask} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
