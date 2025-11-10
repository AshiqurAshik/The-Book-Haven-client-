import React, { useContext } from 'react';
import { IoBook } from 'react-icons/io5';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Auth/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('User signed out successfully!');
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div
      className="navbar shadow-sm px-6 py-4"
      style={{ backgroundColor: '#F8F4E8' }}
    >
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center gap-2">
          <IoBook className="text-3xl text-[#3B2C24]" />
          <p className="text-xl font-semibold text-[#3B2C24]">Book Haven</p>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-[#3B2C24] font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#D17E5E] transition-colors'
                  : 'hover:text-[#D17E5E] transition-colors'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-books"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#D17E5E] transition-colors'
                  : 'hover:text-[#D17E5E] transition-colors'
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#D17E5E] transition-colors'
                  : 'hover:text-[#D17E5E] transition-colors'
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-books"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#D17E5E] transition-colors'
                  : 'hover:text-[#D17E5E] transition-colors'
              }
            >
              My Books
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleSignOut}
            className="
              px-6 py-2 
              rounded-full 
              font-medium 
              text-[#F8F4E8] 
              bg-[#B58B6D] 
              hover:bg-[#D17E5E] 
              hover:scale-105 
              transition 
              duration-300 
              ease-in-out 
              shadow-md
            "
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/login"
            className="
              px-6 py-2 
              rounded-full 
              font-medium 
              text-[#F8F4E8] 
              bg-[#B58B6D] 
              hover:bg-[#D17E5E] 
              hover:scale-105 
              transition 
              duration-300 
              ease-in-out 
              shadow-md
            "
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
