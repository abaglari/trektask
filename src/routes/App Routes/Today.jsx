import { useTask } from "../../context/TaskContext";
import { CiViewList } from "react-icons/ci";
import Tasks from "../../components/App Components/Tasks";
import {
  MdAdd,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdFolderOpen,
} from "react-icons/md";
import { BsFlag } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

const Today = () => {
  const { projectList } = useTask();
  const [addTask, setAddTask] = useState(false);
  const [prioritySelect, setPrioritySelect] = useState(false);
  const [priority, setPriority] = useState("");
  const [projectSelect, setProjectSelect] = useState(false);
  const [currentProject, setCurrentProject] = useState("");
  const [collapseOverdue, setCollapseOverdue] = useState(true);
  const [collapseToday, setCollapseToday] = useState(false);

  // Refs

  const titleRef = useRef();
  const descriptionRef = useRef();

  // Event Handlers

  const handleCollapseOverdue = () => {
    setCollapseOverdue(!collapseOverdue);
  };

  const handleCollapseToday = () => {
    setCollapseToday(!collapseToday);
  };

  const handlePriority = () => {
    setPrioritySelect(!prioritySelect);
  };

  const handleProject = () => {
    setProjectSelect(!projectSelect);
  };

  const currentDate = new Date();

  if (projectList.length === 0) {
    return null;
  }

  // Filter overdue tasks

  const pastDueTasks = projectList.flatMap((project) =>
    project.tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const taskDueDate = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate()
      );
      const currentDueDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return taskDueDate.getTime() < currentDueDate.getTime();
    })
  );

  // Filter today's tasks

  const todayTasks = projectList.flatMap((project) =>
    project.tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const taskDueDate = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate()
      );
      const currentDueDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      return taskDueDate.getTime() === currentDueDate.getTime();
    })
  );

  return (
    <div className='w-full xl:w-3/5 py-4 '>
      <div className='w-full flex justify-between bot_border border-slate-200 py-2'>
        <div>
          <h2 className='font-bold text-2xl'>
            Today,{" "}
            <span className='text-xs font-normal'>
              {currentDate.toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </h2>
        </div>
        <div className='flex gap-2 text-slate-500  items-center'>
          <CiViewList className='text-xl' />
          <span className='text-xs'>View</span>
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <button
          className={`mt-4 flex gap-2 items-center px-4 py-1 hover:text-red-500 ${
            !addTask ? "block" : "hidden"
          }`}
          onClick={() => setAddTask(!addTask)}
        >
          <span className='text-xs font-bold'>Add Task</span>
          <MdAdd className={`rounded-full text-sm border `} />
        </button>
        <div
          className={`  my-4 text-center  w-full ${
            addTask ? "flex flex-col" : "hidden"
          }`}
        >
          <span className='italic text-xs sm:text-sm'>
            Reminder: Tasks added here will be due today.
          </span>
          <div
            className={` rounded-md border border-gray-400 my-4 w-full  p-2
            }`}
          >
            <form className='w-full'>
              <input
                ref={titleRef}
                name='title'
                type='text'
                placeholder='Task Title'
                className='text-gray-700 w-full outline-none bg-inherit mb-2'
              />
              <textarea
                ref={descriptionRef}
                name='description'
                rows='2'
                placeholder='Description'
                className='text-sm w-full outline-none bg-inherit mb-2'
              />

              <div className=' flex gap-4 mb-4 mt-2 justify-center sm:justify-start'>
                <div className=' relative flex flex-col'>
                  <button
                    type='button'
                    onClick={handlePriority}
                    className='border  px-2 py-1 rounded-md text-sm flex gap-2 items-center'
                  >
                    <BsFlag />
                    <span>{priority === "" ? "Priority" : `${priority}`}</span>
                    <MdKeyboardArrowDown />
                  </button>

                  {prioritySelect && (
                    <div className='absolute z-10 rounded-md bg-white flex flex-col items-start top-8 shadow-2xl  w-32'>
                      <div className='flex items-center gap-4 hover:bg-slate-100 w-full p-2 rounded-t-md'>
                        <FcHighPriority />
                        <span className='text-sm'>High</span>
                      </div>
                      <div className='flex items-center gap-4 hover:bg-slate-100 w-full p-2'>
                        <FcMediumPriority />
                        <span className='text-sm'>Medium</span>
                      </div>
                      <div className='flex items-center gap-4 hover:bg-slate-100 w-full p-2 rounded-b-md'>
                        <FcLowPriority />
                        <span className='text-sm'>Low</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='relative flex flex-col'>
                  <button
                    type='button'
                    onClick={handleProject}
                    className='border  px-2 py-1 rounded-md text-sm flex gap-2 items-center'
                  >
                    <MdFolderOpen />
                    <span>
                      {currentProject === "" ? "Project" : `${currentProject}`}
                    </span>
                    <MdKeyboardArrowDown />
                  </button>

                  {projectSelect && (
                    <div className='absolute z-10 rounded-md bg-white flex flex-col items-start top-8 right-0 sm:left-0 shadow-2xl  w-60  '>
                      <div className='w-full'>
                        <input
                          type='text'
                          className='  mt-2 p-2 outline-none text-sm w-full bg-slate-50 '
                          placeholder='Search...'
                        />
                      </div>
                      <div className='h-28 overflow-y-scroll w-full'>
                        {projectList &&
                          projectList
                            .slice()
                            .sort((a, b) => b.dateAdded - a.dateAdded)
                            .map((project) => {
                              return (
                                <div
                                  key={project.id}
                                  className='hover:bg-slate-100 w-full p-2  last:rounded-b-md text-left text-sm'
                                >
                                  <span>{project.title}</span>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='w-full flex justify-center md:justify-end gap-4 border-t pt-2 text-xs font-bold'>
                <button
                  className='bg-gray-100 px-2 py-2 text-gray-700 rounded-md w-20'
                  type='button'
                  onClick={() => setAddTask(!addTask)}
                >
                  Cancel
                </button>
                <button
                  className={`px-2 py-2 text-white rounded-md w-20 bg-red-500`}
                  type='button'
                  onClick={() => setAddTask(!addTask)}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='w-full mt-4 flex flex-col gap-8'>
        <div>
          <div
            className='flex gap-2 items-center mb-4 cursor-pointer select-none'
            onClick={handleCollapseOverdue}
          >
            {collapseOverdue ? (
              <MdKeyboardArrowRight />
            ) : (
              <MdKeyboardArrowDown />
            )}
            <span className='text-red-500 text-sm font-bold'>
              Overdue Tasks
            </span>
          </div>
          {!collapseOverdue && (
            <div>
              {pastDueTasks && pastDueTasks.length === 0 ? (
                <div className='text-center text-xs sm:text-sm border border-gray-300 rounded-md mb-4 py-2 px-4'>
                  <span>Great job! You're all caught up.</span>
                </div>
              ) : (
                pastDueTasks.map((task) => (
                  <div
                    key={task.id}
                    className='border border-gray-300 rounded-md mb-4 py-2 px-4'
                  >
                    <Tasks task={task} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div>
          <div
            className='mb-4 flex gap-2 items-center cursor-pointer select-none'
            onClick={handleCollapseToday}
          >
            {collapseToday ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
            <h3 className='text-gray-800 text-sm  font-bold'>Today</h3>
          </div>
          {!collapseToday && (
            <div>
              {pastDueTasks && todayTasks.length === 0 ? (
                <div className='text-xs sm:text-sm text-center border border-gray-300 rounded-md mb-4 py-2 px-4'>
                  <span>Enjoy your free day. No tasks due today.</span>
                </div>
              ) : (
                todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className='border border-gray-300 rounded-md mb-4 py-2 px-4'
                  >
                    <Tasks task={task} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Today;
