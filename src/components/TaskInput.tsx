import { TaskSetter } from "../common/types";

interface TaskInputProps {
    task: string
    setTask: TaskSetter
    addTask: () => void
}

const TaskInput = ({task, setTask, addTask}: TaskInputProps) => {
    return (
        <div className="input-group">
            <input
                type="text"
                name="task"
                value={task}
                placeholder="What is your task?"
                onChange={e => setTask(e.target.value)}
                className="input input-bordered w-full" />
            <button className="btn btn-primary btn-square" onClick={addTask}>
                Add
            </button>
        </div>
    )
}

export default TaskInput