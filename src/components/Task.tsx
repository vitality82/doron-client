import { TaskData } from "../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type Props = {
    task: TaskData
    editTask: () => void
}

const Task = ({ task, editTask }: Props) => {
    return (
        <div className="flex flex-nowrap justify-between items-center gap-2 border-b border-solid border-gray-300 py-3">
            <div className="flex flex-nowrap items-start gap-3 grow" onDoubleClick={editTask}>
                <input type="checkbox" className="checkbox checkbox-md rounded-full" />
                <span className="text-xl font-normal w-full">{task.name}</span>
            </div>
            <div className="task-actions">
                <button className="btn btn-square btn-outline btn-sm border-none text-gray-400" 
                        onClick={editTask}>
                    <FontAwesomeIcon icon={faPen} color="inherit" />
                </button>
            </div>
        </div>
    )
}

export default Task