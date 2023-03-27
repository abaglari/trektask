import { CiViewList } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";

import { useTask } from "../../context/TaskContext";
import { useMenu } from "../../context/MenuContext";
import CustomProjectMenu from "../../components/App Components/CustomProjectMenu";

import Tasks from "../../components/App Components/Tasks";

const AllTasks = () => {
  const { projectList } = useTask();
  const { projectMenu, handleCustomProjectMenu } = useMenu();

  let hasTask = projectList.some((project) => project.tasks.length > 0);

  return (
    <div className='w-full xl:w-3/5 py-4 '>
      <div className='w-full flex justify-between bot_border border-slate-200 py-2'>
        <div>
          <h2 className='font-bold text-2xl'>All</h2>
        </div>
        <div className='flex gap-2 text-slate-500  items-center'>
          <CiViewList className='text-xl' />
          <span className='text-xs'>View</span>
        </div>
      </div>
      <div className='w-full mt-8'>
        {projectList.length === 0 ? (
          <div className='text-center'>
            <span>No projects found. Add a new project to get started!</span>
          </div>
        ) : (
          <>
            {hasTask ? (
              <>
                {projectList.map((project) => {
                  if (project.tasks.length > 0) {
                    return (
                      <div key={project.id} className='mb-8'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-lg font-bold mb-4'>
                            {project.title}
                          </h3>
                          <BsThreeDots
                            className='text-xl text-slate-500 cursor-pointer'
                            onClick={(e) =>
                              handleCustomProjectMenu(e, project.id)
                            }
                          />
                        </div>
                        {projectMenu.show &&
                          projectMenu.projectId === project.id && (
                            <CustomProjectMenu>
                              <button className='text-left text-slate-800 flex items-center gap-2 px-4 py-2 hover:bg-gray-50  '>
                                <MdEdit className='text-xl' />
                                <span>Edit Project</span>
                              </button>
                              <button
                                className='text-left text-red-500 flex items-center gap-2 px-4 py-2 hover:bg-gray-50 '
                                onClick={console.log(`click, ${project.id}`)}
                              >
                                <MdDelete className='text-xl' />
                                <span>Delete Project</span>
                              </button>
                            </CustomProjectMenu>
                          )}
                        {project.tasks.map((task) => (
                          <div
                            key={task.id}
                            className='border border-gray-300 rounded-md mb-4 py-2 px-4'
                          >
                            <Tasks task={task} />
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            ) : (
              <div className='flex justify-center'>
                <span>
                  No tasks found. Add a new task to a project to get started!
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
