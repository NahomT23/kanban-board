import { Droppable, Draggable } from "@hello-pangea/dnd"
import { useState } from "react"
import Modal from "./ui/Modal"
import { deleteTask, editTask } from "@/app/actions/boardActions"
import { Task } from "@/types/types"

interface ColumnProps {
  title: string
  tasks: Task[]
  droppableId: string
}

const Column: React.FC<ColumnProps> = ({ title, tasks, droppableId }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const openDeleteModal = (taskId: string) => {
    setIsDelete(true)
    setTaskId(taskId)
  }

  const closeDeleteModal = () => {
    setIsDelete(false)
    setTaskId(null)
  }

  const openEditModal = (taskId: string) => {
    setIsEdit(true)
    setTaskId(taskId)
  }

  const closeEditModal = () => {
    setIsEdit(false)
    setTaskId(null)
  }

  const getStatusColor = (status: string) => {
    console.log("Status received:", status); // Debugging line
    switch (status) {
      case "TODO":
        return "bg-red-500";
      case "IN_PROGRESS":
        return "bg-yellow-500";
      case "DONE":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex-1">
      <div className="flex gap-1 dark:text-white">
        <h2 className="text-sm font-semibold mb-4 uppercase">{title}</h2>
        <div className={`w-4 h-4 rounded-full ${getStatusColor(tasks[0]?.status || "")}`} />
      </div>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className="bg-gray-700 rounded p-2 mb-2 text-white flex justify-between"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {task.name}
                    {hoverIndex === index && (
                      <div className="flex gap-5">
                        <span className="text-xs text-gray-400 mt-1 cursor-pointer" onClick={() => openEditModal(task.id)}>
                          Edit
                        </span>
                        <span className="text-xs text-gray-400 mt-1 cursor-pointer" onClick={() => openDeleteModal(task.id)}>
                          Delete
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* {isEdit && (
        <Modal closeModal={closeEditModal} isEdit={isEdit} value={taskId!} action={editTask} title="Edit Task" />
      )} */}
      {isEdit && (
  <Modal
    closeModal={closeEditModal}
    isEdit={isEdit}
    value={taskId!}
    action={editTask}
    title="Edit Task"
    existingTaskName={tasks.find(task => task.id === taskId)?.name} // Pass task name for editing
  />
)}



       {isDelete && (
        <Modal closeModal={closeDeleteModal} title="Are you sure you want to delete this task?" value={taskId!} action={deleteTask} isDelete={isDelete} />
      )}
 
    </div>
  );
};

export default Column;
