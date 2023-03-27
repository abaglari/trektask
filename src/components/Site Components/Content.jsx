import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div className=' px-8 md:px-32'>
      <Outlet />
    </div>
  );
};

export default Content;
