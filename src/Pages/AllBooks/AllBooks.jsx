import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../../Components/Loading/Loading';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    fetch(`${apiUrl}/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (books.length === 0)
    return (
      <p className="text-center mt-10 text-[#3B2C24] dark:text-[#F8F4E8] font-medium">
        No books found.
      </p>
    );

  return (
    <div className="min-h-screen py-12 bg-[#F8F4E8] dark:bg-[#3B2A23] transition-colors duration-500">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#3B2C24] dark:text-[#F8F4E8] transition-colors duration-500">
          All Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {books.map((book) => (
            <div
              key={book._id}
              className="w-full bg-[#FAF9F6] dark:bg-[#2A221D] text-[#3B2C24] dark:text-[#F8F4E8] rounded-2xl shadow-lg dark:shadow-gray-800 hover:shadow-2xl dark:hover:shadow-gray-700 transition-shadow duration-300 flex flex-col"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-auto max-h-64 object-contain rounded-t-2xl bg-[#FAF9F6] dark:bg-[#2A221D] transition-colors duration-500"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3">{book.title}</h3>
                <p className="text-sm mb-3 font-medium">by {book.author}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#D17E5E] dark:bg-[#B35B3B] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {book.genre}
                  </span>
                  <span className="font-bold text-yellow-500">
                    ⭐ {book.rating}
                  </span>
                </div>

                <Link
                  to={`/books/${book._id}`}
                  className="mt-auto text-center bg-[#4C3A2F] dark:bg-[#D17E5E] dark:text-[#1E1A17] text-white py-2 rounded-xl hover:bg-[#3B2C24] dark:hover:bg-[#B35B3B] transition font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
