import { useMenu } from "../../context/MenuContext";
import { useRef, useEffect } from "react";

const CustomProjectMenu = ({ children }) => {
  const { projectMenu, closeProjectMenu } = useMenu();
  const menuRef = useRef(null);

  useEffect(() => {
    // Get the size of the menu after it has rendered
    const menuNode = menuRef.current;
    const menuWidth = menuNode.offsetWidth;
    const menuHeight = menuNode.offsetHeight;

    // Calculate the position of the menu
    let menuX = projectMenu.x;
    let menuY = projectMenu.y;

    const clickXPercentage = (projectMenu.x / window.innerWidth) * 100;
    const clickYPercentage = (projectMenu.y / window.innerHeight) * 100;

    if (clickXPercentage > 50) {
      menuX -= menuWidth;
    }
    if (clickYPercentage > 50) {
      menuY -= menuHeight;
    }

    // Update the position of the menu
    menuNode.style.top = `${menuY}px`;
    menuNode.style.left = `${menuX}px`;

    const handleWindowMouseDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeProjectMenu();
      }
    };

    window.addEventListener("mousedown", handleWindowMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleWindowMouseDown);
    };
  }, [projectMenu, menuRef, closeProjectMenu]);

  return (
    <div
      ref={menuRef}
      className='absolute z-10 bg-white shadow-md rounded-md flex flex-col select-none'
    >
      {children}
    </div>
  );
};

export default CustomProjectMenu;
