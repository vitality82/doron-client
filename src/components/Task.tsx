import { TaskData } from "../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getCheckboxClass, getNameClass } from "./TaskUtils";

type Props = {
    task: TaskData
    editTask: () => void,
    deleteTask: (taskId: number) => void,
    onCompletionChange: (taskId: number, date_completed: boolean) => void
}

const Task = ({task, editTask, onCompletionChange, deleteTask}: Props) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCompletionChange(task.id, event.target.checked)
    }

    const handleDelete = () => {
        deleteTask(task.id)
    }

    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 border-b border-solid border-gray-300 py-3">
            <div className="flex flex-nowrap items-start gap-4 grow">
                <input 
                    type="checkbox" 
                    className={getCheckboxClass(task.date_completed !== null)}
                    checked={task.date_completed !== null}
                    onChange={handleCheckboxChange}
                />
                <span 
                    className={getNameClass(task.date_completed !== null)}
                    onDoubleClick={editTask}>
                    {task.name}
                </span>
            </div>
            <div className="task-actions flex flex-nowrap gap-2 items-center">
                <button className="btn btn-square btn-outline btn-sm border-none text-gray-400" 
                        onClick={editTask}>
                    <FontAwesomeIcon icon={faPen} color="inherit" />
                </button>
                <button className="btn btn-square btn-outline btn-sm border-none text-gray-400" 
                        onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} color="inherit" />
                </button>
            </div>
        </div>
    )
}

export default Task