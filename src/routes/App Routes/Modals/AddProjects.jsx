import { useRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useTask } from "../../../context/TaskContext";

const AddProject = ({ addProject, toggleAddProject }) => {
  const { newProject } = useTask();
  const navigate = useNavigate();
  const formRef = useRef();

  const inputRef = useRef();

  // Submit and close

  const handleProject = (e) => {
    e.preventDefault();
    newProject(inputRef.current.value);
    formRef.current.reset();
    navigate("/app/all");
    toggleAddProject();
  };

  // Close the modal

  const handleClose = () => {
    formRef.current.reset();
    navigate("/app/all");
    toggleAddProject();
  };

  // useEffect to focus on the first input field when the addProject button on the sidebar is clicked

  useEffect(() => {
    if (addProject) {
      inputRef.current.focus();
    }
  }, [addProject]);

  return (
    <div
      className={`z-30 fixed w-screen h-screen left-0 top-0 modal_container  ${
        addProject ? "flex items-center justify-center" : "hidden"
      }`}
    >
      <div className='bg-white rounded-md w-11/12 md:w-96 '>
        <div className='flex justify-between items-center px-4 py-2 border-b-2 border-gray-100 '>
          <h2 className='text-lg md:text-xl font-bold text-gray-700'>
            Add Project
          </h2>
          <button onClick={handleClose}>
            <NavLink to='/app/'>
              <MdClose className='text-red-500 text-2xl' />
            </NavLink>
          </button>
        </div>
        <form ref={formRef} onSubmit={handleProject} className=' w-full'>
          <div className='w-full border-b-2 border-gray-100'>
            <div className=' w-full mt-4 mb-8 text-gray-700'>
              <div className='w-full flex flex-col gap-2 px-4'>
                <label htmlFor='title' className='text-sm font-bold'>
                  Title
                </label>
                <input
                  autoComplete='off'
                  ref={inputRef}
                  type='text'
                  name='title'
                  className='px-2 py-2 border text-sm border-gray-200 outline-gray-300 rounded-md'
                />
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
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
