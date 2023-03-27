import { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useTask } from "../../../context/TaskContext";

const AddTask = ({ addTask, toggleAddTask }) => {
  const { projectList, newTask } = useTask();
  const navigate = useNavigate();
  const titleRef = useRef();
  const formRef = useRef();
  const projectRef = useRef();
  const priorityRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const [taskDetails, setTaskDetails] = useState("");

  // Add task

  const handleTask = (e) => {
    e.preventDefault();
    const newTaskDetails = {
      projectId: projectRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
      priority: priorityRef.current.value,
    };

    setTaskDetails(newTaskDetails);
    newTask(newTaskDetails);
    formRef.current.reset();
    navigate("/app/all");
    toggleAddTask();
  };

  // Close Modal

  const handleClose = () => {
    formRef.current.reset();
    navigate("/app/all");
    toggleAddTask();
  };

  useEffect(() => {
    if (addTask) {
      titleRef.current.focus();
    }
  }, [addTask]);

  return (
    <div
      className={`z-30 fixed w-screen h-screen left-0 top-0 modal_container  ${
        addTask ? "flex items-center justify-center" : "hidden"
      }`}
    >
      <div className='bg-white rounded-md w-11/12 md:w-96 '>
        <div className='flex justify-between items-center px-4 py-2 border-b-2 border-gray-200 '>
          <h2 className='text-lg md:text-xl font-bold text-gray-700'>
            Add Task
          </h2>
          <button onClick={handleClose}>
            <NavLink to='/app'>
              <MdClose className='text-red-500 text-2xl' />
            </NavLink>
          </button>
        </div>
        <form ref={formRef} onSubmit={handleTask} className=' w-full'>
          <div className='h-90 w-full border-b-2 border-gray-200'>
            <div className='overflow-y-scroll w-full my-4 max-h-80 text-gray-700'>
              <div className='w-full flex flex-col gap-2 mb-4 px-4'>
                <label htmlFor='title' className='text-sm font-bold'>
                  Title
                </label>
                <input
                  autoComplete='off'
                  ref={titleRef}
                  type='text'
                  name='title'
                  className='px-2 py-1 border text-sm border-gray-200 outline-gray-300 rounded-md'
                  required
                />
              </div>
              <div className='w-full flex flex-col gap-2 mb-4 px-4'>
                <label htmlFor='description' className='text-sm font-bold'>
                  Description
                </label>
                <textarea
                  autoComplete='off'
                  ref={descriptionRef}
                  type='text'
                  name='title'
                  className='px-2 py-1 border text-sm border-gray-200 outline-gray-300 rounded-md'
                />
              </div>
              <div className='w-full flex flex-col gap-2 mb-4 px-4'>
                <label htmlFor='selectProject' className='text-sm font-bold'>
                  Select a project
                </label>
                <select
                  ref={projectRef}
                  name='selectProject'
                  className='px-2 py-1 border text-sm border-gray-200 outline-gray-300 rounded-md'
                >
                  {projectList &&
                    projectList
                      .slice()
                      .sort((a, b) => b.dateAdded - a.dateAdded)
                      .map((projects) => {
                        return (
                          <option key={projects.id} value={projects.id}>
                            {projects.title}
                          </option>
                        );
                      })}
                </select>
              </div>
              <div className='w-full flex flex-col gap-2 mb-4 px-4'>
                <label htmlFor='date' className='text-sm font-bold'>
                  Due Date
                </label>
                <input
                  required
                  ref={dateRef}
                  type='datetime-local'
                  name='date'
                  className='px-2 py-1 border text-sm border-gray-200 outline-gray-300 rounded-md '
                />
              </div>
              <div className='w-full flex flex-col gap-2 mb-4 px-4'>
                <label htmlFor='priority' className='text-sm font-bold'>
                  Priority
                </label>
                <select
                  ref={priorityRef}
                  name='priority'
                  className='px-2 py-1 border text-sm border-gray-200 outline-gray-300 rounded-md'
                >
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className='px-4 flex justify-end gap-2 flex-grow'>
            <button
              type='button'
              className='bg-gray-500 rounded-md p-2 text-white my-4 text-xs font-bold flex-grow'
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-red-500 rounded-md p-2 text-white my-4 text-xs font-bold flex-grow'
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
