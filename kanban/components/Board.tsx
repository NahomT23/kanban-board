"use client"
import axios from "axios"
import { DropResult, DragDropContext } from "@hello-pangea/dnd"
import Column from "./Column"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Task, BoardTypes} from "@/types/types"
import SyncLoader from "react-spinners/SyncLoader"
import { FaPlus } from "react-icons/fa"
import Modal from "./ui/Modal"
import { createTask } from "@/app/actions/boardActions"
// SERVER ACTIONS FOR MODAL

const Board: React.FC<{ board: BoardTypes | null }> = ({ board }) => {

  const [tasks, setTask] = useState<Task[] | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // SATTE FOR MODAL

  const [isCreate, setIsCreate] = useState(false)

  useEffect(() => {
    if(board){
      setTask(board.tasks)
      setLoading(false)
    }else{
      router.push("/onBoarding")
    }
  }, [board])

  // MODAL CONTROLS

  const openModal = () => {
    setIsCreate(true)
  }

  const closeModal = () => {
    setIsCreate(false)
  }


  const onDragEnd = (result: DropResult) => {
    const {source, destination, draggableId} = result;
    if(!destination) return;
    
    if(source.droppableId === destination.droppableId && source.index === destination.index) return;

    const draggedTask = tasks!.find((task) => task.id === draggableId)

    let updatedStatus: string

    switch(destination.droppableId){
      case "todo":
        updatedStatus = "TODO"
        break;
      case "inProgres":
        updatedStatus = "IN_PROGRESS"
        break;
      case "completed":
        updatedStatus = "DONE"
        break;
        default: updatedStatus = draggedTask!.status
    }

    try{
      axios.post("/api/updateTaskStatus",  {
        taskId: draggableId,
        newStatus: updatedStatus,
      })
    }catch(err){
      console.log(err)
    }

    const updaetdTask = tasks!.map((task) => {
      if(task.id === draggableId){
        return {
          ...task,
          status: updatedStatus
        }
      }
      return task
    })

    setTask(updaetdTask)
  };

  if(loading){
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <SyncLoader color="#fff"/>
      </div>
    )
  }



   return (
    <div className="dark:bg-gray-900 py-10 relative h-screen mt-5">
      <h1 className="font-bold text-center mb-10 text-3xl">
        {board?.name}
      </h1>
      <DragDropContext
      onDragEnd={onDragEnd}
      >
        <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
          {/* CREATE MODAL GOES HERE */}



          <button
          onClick={openModal}
          className="bg-gray-700 rounded-full hover:bg-gray-600 text-gray-50 font-bold p-4 absolute right-10 bottom-10"
          >
            <FaPlus />
            </button>
            {isCreate && 
            ( 
            <Modal
            closeModal={closeModal}
            title="Create New Task"
            isCreate={isCreate}
            action={createTask}
            value={board!.id} 
            /> )}



          <Column
          title="Todo"
          tasks={tasks!.filter((task) => task.status === "TODO")}
          droppableId="todo"
          />
          <Column
          title="inProgres"
          tasks={tasks!.filter((task) => task.status === "IN_PROGRESS")}
          droppableId="inProgres"
          />

          <Column
          title="Completed"
          tasks={tasks!.filter((task) => task.status === "DONE")}
          droppableId="completed"          
          />
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board
