import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdTask,
  MdToday,
  MdCalendarMonth,
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useTask } from "../../context/TaskContext";

const Sidebar = ({ sidebar, setSidebar, toggleAddProject, toggleAddTask }) => {
  const [collapse, setCollapse] = useState(true);
  const { projectList, setSelectedProject } = useTask();

  //Track window width to set setSidebar to false state to apply appropriate css
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 786) {
        setSidebar(false);
      } else if (window.innerWidth > 787) {
        setSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebar]);

  return (
    <aside
      className={`w-11/12 md:w-80 fixed flex flex-col  left-0 top-10 z-10 bg-zinc-100 transition-transform duration-300 ease-in-out select-none ${
        sidebar ? "translate-x-0 " : " -translate-x-full "
      }`}
    >
      <div className='aside_main '>
        <div className='px-4 py-4 bot_border text-sm'>
          <NavLink
            to='/app/all'
            className='flex items-center gap-2 py-2 rounded-md px-4 nav-link'
          >
            <MdTask className='text-xl all' />
            <span>All Tasks</span>
          </NavLink>
          <NavLink
            to='/app/today'
            className='flex items-center gap-2 py-2 rounded-md px-4 nav-link'
          >
            <MdToday className='text-xl today' />
            <span>Today</span>
          </NavLink>
          <NavLink
            to='/app/upcoming'
            className='flex items-center gap-2 py-2 rounded-md px-4 nav-link'
          >
            <MdCalendarMonth className='text-xl upcoming' />
            <span>Upcoming</span>
          </NavLink>

          <NavLink to='/app/add-task'>
            {" "}
            <button
              className='w-full text-white text-sm py-2 rounded-md font-bold bg-red-500 my-2 mb-4'
              onClick={toggleAddTask}
            >
              Add Task
            </button>
          </NavLink>
        </div>
        <div className='px-4 py-4 h-4/5'>
          <div className='flex items-center justify-between px-4 mb-4'>
            <span className='text-zinc-500 font-bold '>Category</span>

            <div className='flex gap-2 items-center'>
              <button className='flex items-center' onClick={toggleAddProject}>
                <NavLink to='/app/add-project'>
                  <MdAdd className='text-2xl text-zinc-700' />
                </NavLink>
              </button>
              {collapse ? (
                <MdKeyboardArrowLeft
                  className='text-2xl text-zinc-700 cursor-pointer'
                  onClick={() => {
                    setCollapse(false);
                  }}
                />
              ) : (
                <MdKeyboardArrowDown
                  className='text-2xl text-zinc-700 cursor-pointer'
                  onClick={() => {
                    setCollapse(true);
                  }}
                />
              )}
            </div>
          </div>
          <div className='h-4/6 md:max-h-96 overflow-y-scroll pb-8'>
            <div
              className={`transition-transform duration-300 ease-in-out px-4 ${
                collapse ? "-translate-y-full" : " translate-y-0"
              }`}
            >
              {projectList &&
                projectList
                  .slice()
                  .sort((a, b) => b.dateAdded - a.dateAdded)
                  .map((project) => {
                    return (
                      <NavLink
                        key={project.id}
                        to={`/app/${project.id}`}
                        className=' text-zinc-500 text-sm py-2 px-3 rounded-md flex justify-between nav-link'
                        onClick={() => {
                          setSelectedProject(project);
                        }}
                      >
                        <span>{project.title}</span>
                        {project.tasks.length > 0 && (
                          <span>{project.tasks.length}</span>
                        )}
                      </NavLink>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      <div className=' bg-zinc-200 z-20 justify-self-end h-10 text-gray-700 text-xs md:text-sm flex items-center justify-between gap-8 px-8'>
        <span>Copyright&copy; TrekTask</span>
        <a href='https://github.com/abaglari/trektask' target='_blank'>
          GitHub
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
