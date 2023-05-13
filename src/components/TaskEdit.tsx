import { TaskData } from "../common/types"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    task: TaskData,
    updateTask: (taskId: number, newName: string) => void
}

const TaskEdit = ({task, updateTask}: Props) => {
    const [newName, setNewName] = useState<string>(task.name)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSave = () => {
        updateTask(task.id, newName)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave()
        }
    }

    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 border-b border-solid border-gray-300 py-3">
            <div className='flex flex-nowrap items-start gap-3 grow'>
                <input type="checkbox" className="checkbox checkbox-md rounded-full" />
                <input
                    ref={inputRef}
                    type="text" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    className="input input-bordered input-primary input-sm text-xl w-full"/>
            </div>
            <div className="task-actions flex flex-nowrap gap-2 items-center">
                <button className="btn btn-primary btn-square btn-sm btn-outline text-gray-400" onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="btn btn-warning btn-square btn-sm btn-outline text-gray-400">
                    <FontAwesomeIcon icon={faXmark} color="inherit" />
                </button>
            </div>
        </div>
    )
}

export default TaskEdit