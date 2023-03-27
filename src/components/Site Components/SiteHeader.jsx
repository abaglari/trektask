import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";

const SiteHeader = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <header className='h-12 md:h-16  flex items-center justify-center px-8 md:px-32 md:justify-between  bg-zinc-50 text-gray-800  fixed top-0 w-full'>
      <div className='flex items-center fixed left-0 pl-3 z-10 md:hidden '>
        <button onClick={toggleMenu}>
          <MdOutlineMenu className='text-3xl' />
        </button>
      </div>
      <div>
        <NavLink to='/'>TrekTask</NavLink>
      </div>
      <nav className='hidden md:block'>
        <ul className='flex items-center justify-end gap-6'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/features'>Features</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
          <li>
            <NavLink to='/app/all'>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md'>
                Go to App
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div
        className={`w-11/12 mobile-menu fixed z-50   top-12 left-0 bg-gray-50 text-gray-800 sm:w-80 md:hidden transition-transform ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className='flex items-center justify-center h-full'>
          <ul className='flex flex-col gap-7'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/features'>Features</NavLink>
            </li>
            <li>
              <NavLink to='/contact'>Contact</NavLink>
            </li>
            <li>
              <button className='bg-red-500 shadow-sm text-white px-4 py-2 rounded-md'>
                <NavLink to='/app/all'>Go to App</NavLink>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
