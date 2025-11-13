import React from 'react';
import { SiX, SiYoutube, SiFacebook } from 'react-icons/si';
import { IoLibrary } from 'react-icons/io5';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="p-10 rounded bg-[#f8f4e8b6] dark:bg-[#2A221D] text-[#3B2C24] dark:text-[#F8F4E8]">
      <div className="flex justify-center items-center gap-2 mb-6">
        <IoLibrary className="text-3xl text-[#3B2C24] dark:text-[#F8F4E8]" />
        <span className="text-2xl font-semibold text-[#3B2C24] dark:text-[#F8F4E8]">
          Book Haven
        </span>
      </div>

      <nav className="flex justify-center gap-6 flex-wrap">
        <NavLink to="/" className="hover:text-[#D17E5E] transition-colors">Home</NavLink>
        <NavLink to="/all-books" className="hover:text-[#D17E5E] transition-colors">All Book</NavLink>
        <NavLink to="/add-book" className="hover:text-[#D17E5E] transition-colors">Add Book</NavLink>
        <NavLink to="/my-books" className="hover:text-[#D17E5E] transition-colors">My Books</NavLink>

      </nav>

      <nav className="flex justify-center mt-4 gap-6 text-[#3B2C24] dark:text-[#F8F4E8] text-2xl">
        <a className=" hover:text-[#D17E5E] transition-transform transform hover:scale-110">
          <SiX />
        </a>
        <a className=" hover:text-[#D17E5E] transition-transform transform hover:scale-110">
          <SiYoutube />
        </a>
        <a className=" hover:text-[#D17E5E] transition-transform transform hover:scale-110">
          <SiFacebook />
        </a>
      </nav>

      <aside className="mt-6 text-sm text-center text-[#3B2C24] dark:text-[#F8F4E8]">
        <p>© {new Date().getFullYear()} - All rights reserved by Book Haven</p>
      </aside>
    </footer>
  );
};

export default Footer;
