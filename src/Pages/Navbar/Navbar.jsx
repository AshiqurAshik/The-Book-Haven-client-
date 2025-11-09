import React from 'react';
import { IoBook } from 'react-icons/io5';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div
      className="navbar shadow-sm px-6 py-4"
      style={{ backgroundColor: '#F8F4E8' }}
    >
      <div className="navbar-start">
        <a className="flex items-center gap-2">
          <IoBook className="text-3xl text-[#3B2C24]" />
          <p className="text-xl font-semibold text-[#3B2C24]">Book Haven</p>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-[#3B2C24] font-medium">
          <li>
            <a className="hover:text-[#D17E5E] transition-colors">Home</a>
          </li>
          <li>
            <a className="hover:text-[#D17E5E] transition-colors">All Books</a>
          </li>
          <li>
            <a className="hover:text-[#D17E5E] transition-colors">Add Book</a>
          </li>
          <li>
            <a className="hover:text-[#D17E5E] transition-colors">My Books</a>
          </li>
        </ul>
      </div>

    <div className="navbar-end">
  <Link
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
  </Link>
</div>

    </div>
  );
};

export default Navbar;
