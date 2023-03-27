//Custom Menu for tasks
import { useMenu } from "../../context/MenuContext";
import CustomTaskMenu from "../../components/App Components/CustomTaskMenu";

// Import Icons

import { MdDelete, MdEdit, MdFileCopy, MdDriveFileMove } from "react-icons/md";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";

const Tasks = ({ task }) => {
  const { taskMenu, handleCustomTaskMenu } = useMenu();
  return (
    <div className='text-sm flex flex-col w-full'>
      <span className='font-bold mb-2'>{task.title}</span>
      <span className='mb-2'>Description: {task.description}</span>
      <div className='flex mb-2 justify-between flex-col gap-4 xl:gap-0 xl:flex-row'>
        <div className='flex gap-2 flex-col md:flex-row md:gap-4 text-xs'>
          <span>
            Date:{" "}
            {new Date(task.dueDate).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>
            Time:{" "}
            {new Date(task.dueDate).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
        <div className='flex gap-4 items-center'>
          <span>
            {task.priority === "high" ? (
              <FcHighPriority className='text-red-500 text-xl' />
            ) : task.priority === "medium" ? (
              <FcMediumPriority className='text-yellow-500 text-xl' />
            ) : task.priority === "low" ? (
              <FcLowPriority className='text-green-500 text-xl' />
            ) : null}
          </span>
          <input type='checkbox' className='h-4 w-4 checkbox cursor-pointer' />
          <BsThreeDots
            className='text-xl text-slate-400 cursor-pointer'
            onClick={(e) => handleCustomTaskMenu(e, task.id)}
          />
          {taskMenu.show && taskMenu.taskId === task.id && (
            <CustomTaskMenu>
              <button className='text-left text-slate-900 flex items-center gap-2 hover:bg-gray-50 px-4 py-2  text-base '>
                <MdEdit className='text-xl' />
                <span>Edit Task</span>
              </button>
              <button className='text-left text-slate-900 flex items-center gap-2 hover:bg-gray-50 px-4 py-2  text-base'>
                <MdFileCopy className='text-xl' />
                <span>Make a copy</span>
              </button>
              <button className='text-left text-slate-900 flex items-center gap-2 hover:bg-gray-50 px-4 py-2  text-base'>
                <MdDriveFileMove className='text-xl' />
                <span>Move Task</span>
              </button>
              <button
                className='text-left text-red-500 flex items-center gap-2 hover:bg-gray-50 px-4 py-2 text-base'
                onClick={console.log(`click, ${task.id}`)}
              >
                <MdDelete className='text-xl' />
                <span>Delete Task</span>
              </button>
            </CustomTaskMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
