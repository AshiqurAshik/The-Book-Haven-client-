import React, { useContext } from 'react';
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

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success('User signed out successfully!'))
      .catch((err) => toast.error(err.message));
  };

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
    <div className="navbar bg-[#F8F4E8] shadow-lg px-6 py-4 ">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#3B2C24]"
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
            className="menu menu-compact dropdown-content mt-3 p-4 shadow-lg bg-[#F8F4E8] rounded-xl w-52 space-y-2"
          >
            {menuItems}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 px-4 py-2">
          <IoLibrary className="text-2xl text-[#3B2C24]" />
          <span className="text-xl font-semibold text-[#3B2C24]">
            Book Haven
          </span>
        </NavLink>
      </div>

      {/* Navbar Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{menuItems}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-full font-semibold text-white bg-[#4C3A2F] hover:bg-[#3B2C24] shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <IoLogOut /> Sign Out
          </button>
        ) : (
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
