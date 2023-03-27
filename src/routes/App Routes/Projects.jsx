import { useTask } from "../../context/TaskContext";
import { CiViewList } from "react-icons/ci";
import painter from "../../assets/painter.webp";
import Tasks from "../../components/App Components/Tasks";
const Projects = () => {
  const { selectedProject } = useTask();
  return (
    <div className='w-full xl:w-3/5 py-4 '>
      <div className='w-full flex justify-between bot_border border-slate-200 py-2'>
        <div>
          <h2 className='font-bold text-2xl'>{selectedProject.title}</h2>
        </div>
        <div className='flex gap-2 text-slate-500  items-center'>
          <CiViewList className='text-xl' />
          <span className='text-xs'>View</span>
        </div>
      </div>
      {selectedProject && selectedProject.tasks.length > 0 ? (
        selectedProject.tasks.map((task) => {
          return (
            <div
              key={task.id}
              className='border border-gray-300 rounded-md my-8 py-2 px-4'
            >
              <Tasks task={task} />
            </div>
          );
        })
      ) : (
        <div className='flex flex-col items-center justify-center mt-8'>
          <span className='my-4'>
            There are no tasks associated with this project.
          </span>
          <img src={painter} className='w-72 h-auto' alt='painter' />
        </div>
      )}
    </div>
  );
};

export default Projects;
