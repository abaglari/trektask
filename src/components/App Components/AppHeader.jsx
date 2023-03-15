import { NavLink } from "react-router-dom";
import {
  MdOutlineMenu,
  MdSearch,
  MdOutlineSettings,
  MdLogout,
  MdDownload,
} from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AppHeader = ({ sidebar, setSidebar }) => {
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const inputRef = useRef();
  const profileRef = useRef();
  const profileMenuRef = useRef();
  const [focus, setFocus] = useState(false);
  const { signout, user } = useAuth();
  const [profileMenu, setProfileMenu] = useState(false);

  const handleSignout = async () => {
    try {
      await signout();
    } catch {
      alert("Failed to Log out");
    }
  };

  const handleProfile = () => {
    setProfileMenu(!profileMenu);
  };

  //useEffect to focus input when "/" is pressed or blur input when ESC is pressed

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current.focus();
        setFocus(true);
      } else if (event.key === "Escape") {
        event.preventDefault();
        inputRef.current.blur();
        setFocus(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focus]);

  //useEffect to hide the profile menu on click

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <header className='h-10  flex items-center px-8 bg-red-500 text-white gap-4 md:gap-0 w-full'>
      <div className=' md:hidden flex items-center justify-start'>
        <button onClick={toggleSidebar}>
          <MdOutlineMenu className='text-2xl' />
        </button>
      </div>

      <div className='flex justify-between w-full'>
        <div className='flex items-center'>
          <NavLink to='/'>trektask</NavLink>
        </div>
        <div className='flex items-center gap-10'>
          <div
            className={`hidden md:flex items-center bg-white px-2 gap-2 rounded-md `}
          >
            <MdSearch className='text-red-500 text-2xl' />
            <input
              ref={inputRef}
              type='text'
              className='outline-none  border-b-1 px-2 py-1 text-black'
              placeholder='Search....'
            />
            <span className=' bg-red-500 text-white px-2 rounded-md'>/</span>
          </div>
          <div
            ref={profileRef}
            className='flex gap-4 items-center cursor-pointer'
            onClick={handleProfile}
          >
            <div className='bg-white h-8 w-8 rounded-full text-black flex items-center justify-center'>
              A
            </div>
          </div>
        </div>
      </div>
      <div
        ref={profileMenuRef}
        className={`${
          profileMenu ? "flex" : "hidden"
        } profile-menu  w-11/12 sm:w-72 flex-col fixed bg-white text-black  rounded-md top-11 right-2  `}
      >
        <div className='border-b-2 mt-4'>
          <div className='flex items-center justify-start gap-4 px-4 '>
            <div className='bg-white h-14  w-14 rounded-full border-red-500 border-2'></div>
            <div className='text-sm '>
              <div>
                <span>{user.displayName}</span>
              </div>
              <div>
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className='px-4 my-2'>
            <NavLink className='flex gap-3 items-center' to='/app/settings'>
              <MdOutlineSettings className='text-xl' />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
        <div className='px-4 text-sm my-4'>
          <ul>
            <li className='mb-3 flex items-center gap-4'>
              <GrUpgrade className='text-lg ' />
              <span>Upgrade to Pro - Coming Soon </span>
            </li>
            <li className='mb-3 flex items-center gap-4'>
              <MdDownload className='text-lg ' />
              <span>Download for Android - Coming Soon </span>
            </li>
            <li className='mb-3 '>
              <button
                className='flex items-center gap-4'
                onClick={handleSignout}
              >
                <MdLogout className='text-lg text-red-500' />{" "}
                <span>Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
