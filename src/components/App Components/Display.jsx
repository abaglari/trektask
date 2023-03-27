import { Outlet } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";

const Display = ({ sidebar }) => {
  const { closeProjectMenu, closeTaskMenu } = useMenu();
  return (
    <main
      onScroll={() => {
        closeProjectMenu();
        closeTaskMenu();
      }}
      className={`w-screen h-5/6 transition-all duration-300 ease-in-out flex self-center  justify-center px-2 sm:px-8 overflow-y-scroll ${
        sidebar ? "md:ml-80 " : "ml-0"
      }`}
    >
      <Outlet />
    </main>
  );
};

export default Display;
