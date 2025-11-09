import React from 'react';
import { motion } from 'framer-motion';

import book1 from '../../assets/book1.jpg';
import book2 from '../../assets/book2.jpg';
import book3 from '../../assets/book3.jpg';
import book4 from '../../assets/book4.jpg';
import book5 from '../../assets/book5.jpg';

const Banner = () => {
  const books = [book1, book2, book3, book4, book5];

  return (
    <div className="w-11/12 mx-auto h-[500px] md:h-[600px] relative overflow-hidden rounded-xl my-10">

      <img
        src={book1}
        alt="Background Book"
        className="w-full h-full object-cover filter blur-sm brightness-90 scale-105 rounded-xl"
      />
  
      <div className="absolute inset-0 bg-black/30 rounded-xl"></div>

    
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 text-[#F8F4E8]"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Escape Into a World of Stories
        </h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
          Find your next favorite book at Book Haven.
        </p>
        <button className="px-6 py-2 rounded-full bg-[#D17E5E] text-[#F8F4E8] font-semibold hover:bg-[#B85F3E] transition drop-shadow-md">
          Browse All Books
        </button>
      </motion.div>

  
      {books.map((book, index) => (
        <motion.img
          key={index}
          src={book}
          alt={`Book ${index + 1}`}
          className="absolute w-32 md:w-40 rounded-lg shadow-xl cursor-pointer filter brightness-110"
          style={{
            top: `${20 + index * 12}%`,
            left: `${5 + index * 18}%`,
          }}
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 1, rotate: [-15, 10, -10, 5, 0] }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: index * 0.5,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            boxShadow: '0 15px 25px rgba(0,0,0,0.6)',
          }}
        />
      ))}
    </div>
  );
};

export default Banner;
