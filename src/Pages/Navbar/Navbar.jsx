import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Auth/AuthContext';
import {
  IoHome,
  IoBook,
  IoAddCircle,
  IoPerson,
  IoLogIn,
  IoLogOut,
  IoLibrary,
} from 'react-icons/io5';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success('User logged out successfully!'))
      .catch((err) => toast.error(err.message));
  };

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'px-4 py-2 rounded-full bg-[#D17E5E] text-white font-semibold flex items-center gap-2 transition-all'
              : 'px-4 py-2 rounded-full hover:bg-[#D17E5E] hover:text-white flex items-center gap-2 transition-all'
          }
        >
          <IoHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            isActive
              ? 'px-4 py-2 rounded-full bg-[#D17E5E] text-white font-semibold flex items-center gap-2 transition-all'
              : 'px-4 py-2 rounded-full hover:bg-[#D17E5E] hover:text-white flex items-center gap-2 transition-all'
          }
        >
          <IoBook /> All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-book"
          className={({ isActive }) =>
            isActive
              ? 'px-4 py-2 rounded-full bg-[#D17E5E] text-white font-semibold flex items-center gap-2 transition-all'
              : 'px-4 py-2 rounded-full hover:bg-[#D17E5E] hover:text-white flex items-center gap-2 transition-all'
          }
        >
          <IoAddCircle /> Add Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-books"
          className={({ isActive }) =>
            isActive
              ? 'px-4 py-2 rounded-full bg-[#D17E5E] text-white font-semibold flex items-center gap-2 transition-all'
              : 'px-4 py-2 rounded-full hover:bg-[#D17E5E] hover:text-white flex items-center gap-2 transition-all'
          }
        >
          <IoPerson /> My Books
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#f8f4e8b6] dark:bg-[#2A221D] shadow-lg px-6 py-4 relative">
      <div className="navbar-start flex items-center gap-2">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#3B2C24] dark:text-[#F8F4E8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-4 shadow-lg bg-[#F8F4E8] dark:bg-[#2A221D] rounded-xl w-52 space-y-2"
          >
            {menuItems}
          </ul>
        </div>

        <NavLink to="/" className="flex items-center gap-2 px-4 py-2">
          <IoLibrary className="text-2xl text-[#3B2C24] dark:text-[#F8F4E8]" />
          <span className="text-xl font-semibold text-[#3B2C24] dark:text-[#F8F4E8]">
            Book Haven
          </span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{menuItems}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4 relative">
        {user && (
          <div ref={dropdownRef} className="relative flex items-center">
            <img
              src={user.photoURL}
              alt={user.displayName}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#D17E5E] dark:border-[#F8F4E8]"
            />

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#F8F4E8] dark:bg-[#2A221D] rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[200px] z-50">
                <span className="font-semibold text-[#3B2C24] dark:text-[#F8F4E8] truncate">
                  {user.displayName}
                </span>
                <span className="text-gray-600 dark:text-gray-300 truncate">{user.email}</span>

                <label className="swap swap-rotate flex items-center gap-2 mt-1">
                  <span className="text-[#3B2C24] dark:text-[#F8F4E8] text-left text-sm">Theme</span>
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => handleTheme(e.target.checked)}
                  />
                  <svg
                    className="swap-off h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                  <svg
                    className="swap-on h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>

                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 rounded-full font-semibold text-white bg-[#4C3A2F] hover:bg-[#3B2C24] shadow-lg flex items-center gap-1 text-sm w-full mt-2"
                >
                  <IoLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!user && (
          <NavLink
            to="/login"
            className="px-6 py-2 rounded-full font-semibold text-white bg-[#4C3A2F] hover:bg-[#3B2C24] shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <IoLogIn /> Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
