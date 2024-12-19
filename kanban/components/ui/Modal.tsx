import { useState } from "react";
import Input from "../Input";
import toast from "react-hot-toast";

const Modal = ({
  closeModal,
  title,
  action,
  value,
  isCreate,
  isEdit,
  isDelete,
  existingTaskName, // Add existingTaskName prop for editing
}: {
  isCreate?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  value: string;
  action: (formData: FormData) => Promise<void>;
  title: string;
  closeModal: () => void;
  existingTaskName?: string; // Optional prop to handle existing task name
}) => {
  const [taskName, setTaskName] = useState<string>(existingTaskName || ""); // Manage the task name
  const [newStatus, setNewStatus] = useState<string>(""); // Manage the status if necessary

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append("taskId", value); // Always append taskId for all actions

    if (isDelete) {
      try {
        await action(formData); // Trigger delete action
        toast.success("Task Has Been Deleted");
      } catch (error) {
        toast.error("Error deleting task");
      }
    } else if (isEdit) {
      formData.append("newTask", taskName); // Updated task name
      formData.append("newStatus", newStatus); // Updated status, if needed

      try {
        await action(formData); // Trigger edit action
        toast.success("Task Has Been Updated");
      } catch (error) {
        toast.error("Error updating task");
      }
    } else if (isCreate) {
      formData.append("task", taskName); // New task name for creation
      try {
        await action(formData); // Trigger create action
        toast.success("New Task Created");
      } catch (error) {
        toast.error("Error creating task");
      }
    }

    closeModal();
  };

  return (
    <div
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-700 rounded-lg p-6 text-white max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <form onSubmit={submitHandler}>
          <Input type="hidden" name="taskId" value={value} />
          {isEdit && existingTaskName && (
            <Input
              type="text"
              name="newTask"
              placeholder="Enter new task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
            />
          )}
          {isCreate && (
            <Input
              type="text"
              name="task"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
            />
          )}

          <div className="mt-5 flex justify-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
