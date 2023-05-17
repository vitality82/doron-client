interface TaskInputProps {
    task: string
    setTask: React.Dispatch<React.SetStateAction<string>>
    addTask: () => void
}

const TaskInput = ({task, setTask, addTask}: TaskInputProps) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div className="input-group">
            <input
                type="text"
                name="task"
                value={task}
                placeholder="Name your task"
                onChange={e => setTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input input-bordered w-full" />
            <button className="btn btn-secondary btn-square" onClick={addTask}>
                Add
            </button>
        </div>
    )
}

export default TaskInput