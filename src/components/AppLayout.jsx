import AppHeader from "./App Components/AppHeader";
import { useState } from "react";
import Sidebar from "./App Components/Sidebar";
import Display from "./App Components/Display";
import AddProject from "../routes/App Routes/Modals/AddProjects";
import AddTask from "../routes/App Routes/Modals/AddTask";

const AppLayout = () => {
  const [sidebar, setSidebar] = useState(true);
  const [addProject, setAddProject] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleAddProject = () => {
    setAddProject(!addProject);
  };

  const toggleAddTask = () => {
    setAddTask(!addTask);
  };

  return (
    <>
      <AppHeader sidebar={sidebar} setSidebar={toggleSidebar} />
      <div className='main flex '>
        <Sidebar
          sidebar={sidebar}
          setSidebar={toggleSidebar}
          toggleAddProject={toggleAddProject}
          toggleAddTask={toggleAddTask}
        />
        <Display sidebar={sidebar} />
      </div>
      <AddProject addProject={addProject} toggleAddProject={toggleAddProject} />
      <AddTask addTask={addTask} toggleAddTask={toggleAddTask} />
    </>
  );
};

export default AppLayout;
