import React from 'react';
import { SiX, SiYoutube, SiFacebook } from 'react-icons/si';

const Footer = () => {
  return (
    <footer
      className="p-10 rounded bg-[#F8F4E8] dark:bg-[#2A221D] text-[#3B2C24] dark:text-[#F8F4E8]"
      
    >
      {/* Navigation Links */}
      <nav className="flex justify-center gap-6 flex-wrap">
        <a className="hover:text-[#D17E5E] transition-colors">Home</a>
        <a className="hover:text-[#D17E5E] transition-colors">All Books</a>
        <a className="hover:text-[#D17E5E] transition-colors">Add Book</a>
        <a className="hover:text-[#D17E5E] transition-colors">My Books</a>
    
      </nav>

      {/* Social Icons */}
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

      {/* Footer Note */}
      <aside className="mt-6 text-sm text-center text-[#3B2C24] dark:text-[#F8F4E8]"
      >
        <p>© {new Date().getFullYear()} - All rights reserved by Book Haven</p>
      </aside>
    </footer>
  );
};

export default Footer;
