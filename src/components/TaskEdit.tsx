import { TaskData } from "../common/types"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getCheckboxClass } from "./TaskUtils";

type Props = {
    task: TaskData,
    updateTask: (taskId: number, newName: string) => void,
    cancelEditMode: () => void
}

const TaskEdit = ({task, updateTask, cancelEditMode}: Props) => {
    const [newName, setNewName] = useState<string>(task.name)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSave = () => {
        updateTask(task.id, newName)
    }

    const handleCancel = () => {
        setNewName(task.name)
        cancelEditMode()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave()
        } else if (event.key === 'Escape') {
            handleCancel()
        }
    }

    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 border-b border-solid border-gray-300 py-3">
            <div className='flex flex-nowrap items-start gap-3 grow'>
                <input 
                    type="checkbox" 
                    className={getCheckboxClass(task.date_completed !== null)}
                    checked={task.date_completed !== null} 
                    readOnly />
                <input
                    ref={inputRef}
                    type="text" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    className="input input-bordered input-square input-sm text-xl w-full"/>
            </div>
            <div className="task-actions flex flex-nowrap gap-2 items-center">
                <button 
                    className="btn btn-secondary btn-square btn-sm btn-outline text-gray-400" 
                    onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button 
                    className="btn btn-ghost btn-square btn-sm btn-outline text-gray-400" 
                    onClick={handleCancel}>
                    <FontAwesomeIcon icon={faXmark} color="inherit" />
                </button>
            </div>
        </div>
    )
}

export default TaskEdit