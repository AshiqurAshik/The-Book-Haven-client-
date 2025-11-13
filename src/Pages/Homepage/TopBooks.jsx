import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

const TopBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const res = await axios.get(`${API_URL}/books`);
        const sortedBooks = res.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setBooks(sortedBooks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top books:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, [API_URL]);

  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400 font-medium">
        Failed to load top books. Please try again later.
      </p>
    );

  if (books.length === 0)
    return (
      <p className="text-center mt-10 text-[#3B2C24] dark:text-[#F8F4E8] font-medium">
        No top rated books found.
      </p>
    );

  return (
    <section className="py-16 bg-[#F8F4E8] dark:bg-[#3B2A23] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500">
          Top Rated Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {books.map((book) => (
            <div
              key={book._id}
              className="w-full bg-[#FAF9F6] dark:bg-[#2A1F1B] text-[#3B2C24] dark:text-[#F8F4E8] rounded-2xl shadow-lg dark:shadow-gray-800 hover:shadow-2xl dark:hover:shadow-gray-700 transition-shadow duration-300 flex flex-col"
            >
              <img
                src={
                  book.coverImage ||
                  'https://via.placeholder.com/150x220?text=No+Image'
                }
                alt={book.title}
                className="w-full h-64 object-contain rounded-t-2xl bg-[#FAF9F6] dark:bg-[#2A1F1B] transition-colors duration-500"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-sm mb-2 font-medium">{`by ${book.author}`}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#D17E5E] dark:bg-[#B35B3B] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {book.genre || 'Unknown'}
                  </span>
                  <span className="font-bold text-yellow-500">
                    ⭐ {book.rating || 'N/A'}
                  </span>
                </div>

                <NavLink
                  to={`/books/${book._id}`}
                  className="mt-auto bg-[#4C3A2F] dark:bg-[#D17E5E] dark:text-[#1E1A17] text-white py-2 rounded-xl hover:bg-[#3B2C24] dark:hover:bg-[#B35B3B] transition font-semibold text-center"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBooks;
