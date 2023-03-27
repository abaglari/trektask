import { useState, useEffect, useContext, createContext } from "react";

const MenuContext = createContext();

const initialState = {
  show: false,
  x: 0,
  y: 0,
  projectId: null,
};

const initialStateTask = {
  show: false,
  x: 0,
  y: 0,
  projectId: null,
  taskId: null,
};

const MenuContextProvider = ({ children }) => {
  const [projectMenu, setProjectMenu] = useState(initialState);
  const [taskMenu, setTaskMenu] = useState(initialStateTask);

  const handleCustomProjectMenu = (e, projectId) => {
    const { clientX, clientY } = e;
    setProjectMenu({
      show: true,
      x: clientX,
      y: clientY,
      projectId: projectId,
    });
  };

  const handleCustomTaskMenu = (e, taskId) => {
    const { clientX, clientY } = e;
    setTaskMenu({
      show: true,
      x: clientX,
      y: clientY,

      taskId: taskId,
    });
  };

  const closeTaskMenu = () => {
    setTaskMenu(initialStateTask);
  };

  const closeProjectMenu = () => {
    setProjectMenu(initialState);
  };

  return (
    <MenuContext.Provider
      value={{
        handleCustomProjectMenu,
        projectMenu,
        closeProjectMenu,
        closeTaskMenu,
        handleCustomTaskMenu,
        taskMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};

export default MenuContextProvider;
